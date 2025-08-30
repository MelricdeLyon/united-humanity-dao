import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import type { 
  PERJRRules, 
  PERJRQuote, 
  PERJRChange, 
  PERJRSimulationInput,
  PERJRSimulationResult,
  PERJRTier,
  PERJRCommitRequest,
  PERJRCommitResponse,
  PERJREligibility,
  PERJRTierInfo,
  PERJRUserStatus
} from '@/types/perjrc';

interface PERJRStore {
  // État
  rules: PERJRRules | null;
  currentQuote: PERJRQuote | null;
  userStatus: PERJRUserStatus | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  loadRules: () => Promise<void>;
  generateQuote: (input: PERJRSimulationInput) => Promise<PERJRQuote>;
  commitQuote: (request: PERJRCommitRequest) => Promise<PERJRCommitResponse>;
  getUserStatus: () => Promise<void>;
  simulate: (input: PERJRSimulationInput) => PERJRSimulationResult | null;
  checkEligibility: (birth_date: string) => PERJREligibility;
  getTierInfo: (tier: PERJRTier) => PERJRTierInfo;
  clearError: () => void;
  clearQuote: () => void;
}

// Configuration des paliers
const TIER_CONFIG: Record<PERJRTier, Omit<PERJRTierInfo, 'min_amount' | 'rate' | 'multiplier' | 'jrc_per_eur'>> = {
  bronze: {
    name: 'Bronze',
    color: 'bg-gradient-to-r from-amber-600 to-amber-800',
    icon: 'Medal'
  },
  argent: {
    name: 'Argent',
    color: 'bg-gradient-to-r from-slate-400 to-slate-600',
    icon: 'Award'
  },
  or: {
    name: 'Or',
    color: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
    icon: 'Crown'
  }
};

export const usePERJRC = create<PERJRStore>((set, get) => ({
  // État initial
  rules: null,
  currentQuote: null,
  userStatus: null,
  isLoading: false,
  error: null,

  // Charger les règles PER-JRC
  loadRules: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const { data, error } = await supabase
        .from('perjr_rules')
        .select('*')
        .single();

      if (error) throw error;
      
      set({ rules: data, isLoading: false });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to load rules', isLoading: false });
    }
  },

  // Générer un devis
  generateQuote: async (input: PERJRSimulationInput) => {
    try {
      set({ isLoading: true, error: null });

      const { data, error } = await supabase.functions.invoke('perjr-quote', {
        body: {
          birth_date: input.birth_date,
          amount_eur: input.amount_eur
        }
      });

      if (error) throw error;

      const quote: PERJRQuote = data;
      set({ currentQuote: quote, isLoading: false });
      
      return quote;
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to generate quote';
      set({ error, isLoading: false });
      throw err;
    }
  },

  // Confirmer un devis
  commitQuote: async (request: PERJRCommitRequest) => {
    try {
      set({ isLoading: true, error: null });

      const { data, error } = await supabase.functions.invoke('perjr-commit', {
        body: request
      });

      if (error) throw error;

      const response: PERJRCommitResponse = data;
      
      // Mettre à jour le statut utilisateur après un commit réussi
      await get().getUserStatus();
      
      set({ isLoading: false, currentQuote: null });
      
      return response;
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to commit quote';
      set({ error, isLoading: false });
      throw err;
    }
  },

  // Obtenir le statut utilisateur
  getUserStatus: async () => {
    try {
      set({ isLoading: true, error: null });

      const { data, error } = await supabase.functions.invoke('perjr-status');

      if (error) throw error;

      set({ 
        userStatus: { 
          used: data.used, 
          last_change: data.last_change 
        }, 
        isLoading: false 
      });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to get user status', isLoading: false });
    }
  },

  // Simuler un change (calculs locaux)
  simulate: (input: PERJRSimulationInput) => {
    const { rules } = get();
    if (!rules) return null;

    // Vérifier l'éligibilité
    const eligibility = get().checkEligibility(input.birth_date);
    if (!eligibility.eligible) return null;

    // Vérifier le montant minimum
    if (input.amount_eur < rules.bronze_min_eur) return null;

    // Déterminer le palier
    let tier: PERJRTier;
    let rate: number;

    if (input.amount_eur >= rules.gold_min_eur) {
      tier = 'or';
      rate = rules.gold_rate_eur_per_jrc;
    } else if (input.amount_eur >= rules.silver_min_eur) {
      tier = 'argent';
      rate = rules.silver_rate_eur_per_jrc;
    } else {
      tier = 'bronze';
      rate = rules.bronze_rate_eur_per_jrc;
    }

    // Calculer les résultats
    const jrc_amount = Math.floor(input.amount_eur / rate);
    const multiplier_vs_base = rules.base_rate_eur_per_jrc / rate;
    const base_jrc = Math.floor(input.amount_eur / rules.base_rate_eur_per_jrc);
    const bonus_jrc = jrc_amount - base_jrc;

    return {
      tier,
      rate_eur_per_jrc: rate,
      jrc_amount,
      multiplier_vs_base,
      bonus_jrc
    };
  },

  // Vérifier l'éligibilité
  checkEligibility: (birth_date: string): PERJREligibility => {
    const { rules } = get();
    if (!rules) {
      return { eligible: false, reason: 'Configuration non chargée' };
    }

    const birthYear = new Date(birth_date).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    
    const eligible = birthYear <= rules.eligibility_birthyear_max;
    
    if (!eligible) {
      return {
        eligible: false,
        age,
        birth_year: birthYear,
        reason: `Vous devez être né(e) en ${rules.eligibility_birthyear_max} ou avant (vous êtes né(e) en ${birthYear})`
      };
    }

    return {
      eligible: true,
      age,
      birth_year: birthYear
    };
  },

  // Obtenir les informations d'un palier
  getTierInfo: (tier: PERJRTier): PERJRTierInfo => {
    const { rules } = get();
    if (!rules) {
      throw new Error('Rules not loaded');
    }

    const config = TIER_CONFIG[tier];
    let min_amount: number;
    let rate: number;

    switch (tier) {
      case 'bronze':
        min_amount = rules.bronze_min_eur;
        rate = rules.bronze_rate_eur_per_jrc;
        break;
      case 'argent':
        min_amount = rules.silver_min_eur;
        rate = rules.silver_rate_eur_per_jrc;
        break;
      case 'or':
        min_amount = rules.gold_min_eur;
        rate = rules.gold_rate_eur_per_jrc;
        break;
    }

    const multiplier = rules.base_rate_eur_per_jrc / rate;
    const jrc_per_eur = 1 / rate;

    return {
      ...config,
      min_amount,
      rate,
      multiplier,
      jrc_per_eur
    };
  },

  // Nettoyer l'erreur
  clearError: () => {
    set({ error: null });
  },

  // Nettoyer le devis
  clearQuote: () => {
    set({ currentQuote: null });
  }
}));