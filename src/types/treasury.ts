// Types pour le système Treasury et PET de CydJerr

export interface TreasurySupply {
  totalSupply: bigint; // 500_000_000_000_000n
  forSaleCitizens: {
    amount: bigint; // 150_000_000_000_000n
    priceEUR: number; // 0.01
  };
  vaults: {
    activityBonus: bigint; // 50T
    txBonus: bigint; // 50T
    negativeLoans: bigint; // 120T
    insurance: bigint; // 120T
    team: bigint; // 10T
  };
}

export interface PETConfig {
  tradablePartPercent: number; // ex: 20 (configurable)
  minAllocationPercent: number; // 1
  maxAllocationPercent: number; // 5
  nationCutPercent: number; // 20
  residentCutPercent: number; // 80
  traderCutPercent: number; // 10 (sur bénéfice total)
  traderBonusMaxPercent: number; // 5 (sur bénéfice total)
}

export interface PETSimulationInput {
  userHoldingsJERR: bigint; // JERR détenus
  tradablePartPercent: number; // dérivé de config
  petAllocationPercent: number; // 1–5
  expectedPoolReturnPercent: number; // scénario, ex 7
}

export interface PETSimulationResult {
  allocatedJERR: bigint;
  profitTotal: number; // en JERR ou € selon modalité d'affichage
  residentProfit: number; // 80%
  nationProfit: number; // 20%
  traderProfit: number; // 10%
  traderBonus: number; // 0–5%
  nationNet: number; // >= 5%
}

export interface PerformanceScenario {
  name: string;
  returnPercent: number;
  description: string;
  type: 'conservative' | 'balanced' | 'dynamic';
}

export interface VaultDetails {
  id: string;
  name: string;
  type: 'activity_bonus' | 'tx_bonus' | 'negative_loans' | 'insurance' | 'team';
  allocation: bigint;
  description: string;
  rules: string[];
  examples?: string[];
}