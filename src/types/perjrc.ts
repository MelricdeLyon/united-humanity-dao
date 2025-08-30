// Types pour le module PER-JRC (Plan d'Épargne Retraite JerrCoin)

export type PERJRTier = 'bronze' | 'argent' | 'or';

export type PERJRStatus = 'quoted' | 'committed' | 'settled' | 'expired';

export interface PERJRRules {
  id: boolean;
  base_rate_eur_per_jrc: number;
  bronze_min_eur: number;
  bronze_rate_eur_per_jrc: number;
  silver_min_eur: number;
  silver_rate_eur_per_jrc: number;
  gold_min_eur: number;
  gold_rate_eur_per_jrc: number;
  eligibility_birthyear_max: number;
  quote_lock_minutes: number;
  created_at: string;
  updated_at: string;
}

export interface PERJRChange {
  id: string;
  user_id: string;
  created_at: string;
  amount_eur: number;
  tier: PERJRTier;
  rate_eur_per_jrc: number;
  jrc_credited: number;
  status: PERJRStatus;
  quote_id?: string;
  quote_expires_at?: string;
  payment_intent_id?: string;
  updated_at: string;
}

export interface PERJRQuote {
  eligible: boolean;
  reason_if_not?: string;
  tier?: PERJRTier;
  rate_eur_per_jrc?: number;
  multiplier_vs_base?: number;
  jrc_preview?: number;
  quote_id?: string;
  quote_expires_at?: string;
  amount_eur?: number;
}

export interface PERJREligibility {
  eligible: boolean;
  age?: number;
  birth_year?: number;
  reason?: string;
}

export interface PERJRSimulationInput {
  amount_eur: number;
  birth_date: string;
}

export interface PERJRSimulationResult {
  tier: PERJRTier;
  rate_eur_per_jrc: number;
  jrc_amount: number;
  multiplier_vs_base: number;
  bonus_jrc: number; // JRC gagnés en plus vs taux de base
}

export interface PERJRCommitRequest {
  quote_id: string;
  payment_intent_id?: string;
}

export interface PERJRCommitResponse {
  change_id: string;
  status: PERJRStatus;
  jrc_credited: number;
}

export interface PERJRUserStatus {
  used: boolean;
  last_change?: PERJRChange;
}

export interface PERJRTierInfo {
  name: string;
  color: string;
  icon: string;
  min_amount: number;
  rate: number;
  multiplier: number;
  jrc_per_eur: number;
}