import { create } from 'zustand';
import { TreasurySupply, PETConfig, PETSimulationInput, PETSimulationResult, PerformanceScenario } from '@/types/treasury';

interface TreasuryStore {
  // State
  treasuryData: TreasurySupply | null;
  petConfig: PETConfig | null;
  isLoading: boolean;
  isOpen: boolean;
  activeTab: string;
  lastSimulation: PETSimulationResult | null;
  
  // Actions
  setOpen: (open: boolean) => void;
  setActiveTab: (tab: string) => void;
  loadTreasuryData: () => Promise<void>;
  loadPETConfig: () => Promise<void>;
  simulatePET: (input: PETSimulationInput) => Promise<PETSimulationResult>;
  allocateToPET: (input: PETSimulationInput) => Promise<{ success: boolean; txId?: string }>;
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
    negativeLoans: 120000000000000n,
    insurance: 120000000000000n,
    team: 10000000000000n,
  },
};

const MOCK_PET_CONFIG: PETConfig = {
  tradablePartPercent: 20,
  minAllocationPercent: 1,
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
  isLoading: false,
  isOpen: false,
  activeTab: 'overview',
  lastSimulation: null,

  setOpen: (open) => {
    set({ isOpen: open });
    if (open && !get().treasuryData) {
      get().loadTreasuryData();
    }
    if (open && !get().petConfig) {
      get().loadPETConfig();
    }
  },

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

  allocateToPET: async (input: PETSimulationInput) => {
    // Simuler l'allocation PET
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      txId: `pet_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
  },
}));