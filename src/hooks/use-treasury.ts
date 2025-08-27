import { create } from 'zustand';
import { 
  TreasurySupply, 
  PETConfig, 
  PETSimulationInput, 
  PETSimulationResult, 
  PerformanceScenario,
  KidJerrConfig,
  KidJerrSimulationInput,
  KidJerrSimulationResult,
  KidJerrExchangeRecord
} from '@/types/treasury';

interface TreasuryStore {
  // State
  treasuryData: TreasurySupply | null;
  petConfig: PETConfig | null;
  kidJerrConfig: KidJerrConfig | null;
  kidJerrExchanges: KidJerrExchangeRecord[];
  isLoading: boolean;
  activeTab: string;
  lastSimulation: PETSimulationResult | null;
  lastKidJerrSimulation: KidJerrSimulationResult | null;
  
  // Actions
  setActiveTab: (tab: string) => void;
  loadTreasuryData: () => Promise<void>;
  loadPETConfig: () => Promise<void>;
  loadKidJerrConfig: () => Promise<void>;
  simulatePET: (input: PETSimulationInput) => Promise<PETSimulationResult>;
  simulateKidJerrExchange: (input: KidJerrSimulationInput) => Promise<KidJerrSimulationResult>;
  allocateToPET: (input: PETSimulationInput) => Promise<{ success: boolean; txId?: string }>;
  processKidJerrExchange: (input: KidJerrSimulationInput) => Promise<{ success: boolean; txId?: string }>;
}

// Données mockées pour développement
const MOCK_TREASURY_DATA: TreasurySupply = {
  totalSupply: 500000000000000n,
  forSaleCitizens: {
    amount: 150000000000000n,
    priceEUR: 0.01,
  },
  vaults: {
    activityBonus: 50000000000000n,
    txBonus: 50000000000000n,
    negativeLoans: 100000000000000n, // Réduit de 20T
    insurance: 100000000000000n, // Réduit de 20T
    team: 10000000000000n,
    kidJerr: 40000000000000n, // Nouveau coffre de 40T
  },
};

const MOCK_KIDJERR_CONFIG: KidJerrConfig = {
  totalAllocation: 40000000000000n, // 40T JERR
  exchangeRatio: 1, // 1:1 ratio
  projectsSupported: [
    'École numérique décentralisée',
    'Plateforme d\'apprentissage blockchain',
    'Programme de bourse d\'études',
    'Incubateur projets jeunes',
    'Formation professionnelle digitale'
  ],
  currentlyAllocated: 2500000000000n, // 2.5T déjà alloués (exemple)
  availableBalance: 37500000000000n, // 37.5T restants
};

const MOCK_PET_CONFIG: PETConfig = {
  tradablePartPercent: 20,
  minAllocationPercent: 0,
  maxAllocationPercent: 5,
  nationCutPercent: 20,
  residentCutPercent: 80,
  traderCutPercent: 10,
  traderBonusMaxPercent: 5,
};

export const PERFORMANCE_SCENARIOS: PerformanceScenario[] = [
  {
    name: 'Conservateur',
    returnPercent: 3,
    description: 'Stratégie prudente avec risque minimal',
    type: 'conservative',
  },
  {
    name: 'Équilibré',
    returnPercent: 7,
    description: 'Mix équilibré risque/rendement',
    type: 'balanced',
  },
  {
    name: 'Dynamique',
    returnPercent: 12,
    description: 'Stratégie offensive pour rendement élevé',
    type: 'dynamic',
  },
];

export const useTreasury = create<TreasuryStore>((set, get) => ({
  treasuryData: null,
  petConfig: null,
  kidJerrConfig: null,
  kidJerrExchanges: [],
  isLoading: false,
  activeTab: 'overview',
  lastSimulation: null,
  lastKidJerrSimulation: null,

  setActiveTab: (tab) => set({ activeTab: tab }),

  loadTreasuryData: async () => {
    set({ isLoading: true });
    try {
      // Simuler l'appel API
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ treasuryData: MOCK_TREASURY_DATA });
    } catch (error) {
      console.error('Error loading treasury data:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  loadPETConfig: async () => {
    try {
      // Simuler l'appel API
      await new Promise(resolve => setTimeout(resolve, 300));
      set({ petConfig: MOCK_PET_CONFIG });
    } catch (error) {
      console.error('Error loading PET config:', error);
    }
  },

  loadKidJerrConfig: async () => {
    try {
      // Simuler l'appel API
      await new Promise(resolve => setTimeout(resolve, 300));
      set({ kidJerrConfig: MOCK_KIDJERR_CONFIG });
    } catch (error) {
      console.error('Error loading KidJERR config:', error);
    }
  },

  simulatePET: async (input: PETSimulationInput) => {
    const config = get().petConfig!;
    
    // Calculs selon les formules définies
    const tradable = Number(input.userHoldingsJERR) * (input.tradablePartPercent / 100);
    const allocated = tradable * (input.petAllocationPercent / 100);
    const profitTotal = allocated * (input.expectedPoolReturnPercent / 100);
    
    const residentProfit = profitTotal * (config.residentCutPercent / 100);
    const traderProfit = profitTotal * (config.traderCutPercent / 100);
    
    // Bonus trader variable (entre 0 et 5% du profit total)
    const traderBonus = Math.min(profitTotal * 0.03, profitTotal * (config.traderBonusMaxPercent / 100));
    
    // Nation garde au minimum 5% du profit total
    const nationNet = profitTotal * (config.nationCutPercent / 100) - traderProfit - traderBonus;
    
    const result: PETSimulationResult = {
      allocatedJERR: BigInt(Math.round(allocated)),
      profitTotal,
      residentProfit,
      nationProfit: profitTotal * (config.nationCutPercent / 100),
      traderProfit,
      traderBonus,
      nationNet,
    };

    set({ lastSimulation: result });
    return result;
  },

  simulateKidJerrExchange: async (input: KidJerrSimulationInput) => {
    const config = get().kidJerrConfig!;
    
    // Calcul 1:1 - 100€ = 10,000 JERR échangés = 10,000 JERR débloqués
    const exchangeAmountJERR = BigInt(input.exchangeAmountEUR * 100); // 1€ = 100 JERR
    const releasedForProjects = exchangeAmountJERR; // Ratio 1:1
    
    const impactPercentage = (Number(releasedForProjects) / Number(config.totalAllocation)) * 100;
    
    const result: KidJerrSimulationResult = {
      exchangeAmountJERR,
      releasedForProjects,
      impactPercentage,
      projectsImpact: config.projectsSupported.slice(0, Math.min(3, config.projectsSupported.length)),
    };

    set({ lastKidJerrSimulation: result });
    return result;
  },

  allocateToPET: async (input: PETSimulationInput) => {
    // Simuler l'allocation PET
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      txId: `pet_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
  },

  processKidJerrExchange: async (input: KidJerrSimulationInput) => {
    // Simuler l'échange KidJERR
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const simulation = await get().simulateKidJerrExchange(input);
    
    // Ajouter l'enregistrement d'échange
    const newExchange: KidJerrExchangeRecord = {
      id: `kidjerr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      exchangeAmountEUR: input.exchangeAmountEUR,
      exchangeAmountJERR: simulation.exchangeAmountJERR,
      releasedAmountJERR: simulation.releasedForProjects,
      timestamp: new Date(),
      transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
    };
    
    const currentExchanges = get().kidJerrExchanges;
    set({ kidJerrExchanges: [...currentExchanges, newExchange] });
    
    // Mettre à jour la configuration KidJERR
    const currentConfig = get().kidJerrConfig!;
    const updatedConfig: KidJerrConfig = {
      ...currentConfig,
      currentlyAllocated: currentConfig.currentlyAllocated + simulation.releasedForProjects,
      availableBalance: currentConfig.availableBalance - simulation.releasedForProjects,
    };
    set({ kidJerrConfig: updatedConfig });
    
    return {
      success: true,
      txId: newExchange.transactionHash,
    };
  },
}));