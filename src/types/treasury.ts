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
    negativeLoans: bigint; // 100T (réduit de 20T)
    insurance: bigint; // 100T (réduit de 20T)
    team: bigint; // 10T
    kidJerr: bigint; // 40T (nouveau coffre)
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
  type: 'activity_bonus' | 'tx_bonus' | 'negative_loans' | 'insurance' | 'team' | 'kid_jerr';
  allocation: bigint;
  description: string;
  rules: string[];
  examples?: string[];
}

export interface KidJerrConfig {
  totalAllocation: bigint; // 40T JERR
  exchangeRatio: number; // 1:1 ratio (1 JERR échangé = 1 JERR débloqué)
  projectsSupported: string[];
  currentlyAllocated: bigint; // JERR déjà débloqués
  availableBalance: bigint; // JERR restants disponibles
}

export interface KidJerrExchangeRecord {
  id: string;
  userId?: string;
  exchangeAmountEUR: number;
  exchangeAmountJERR: bigint;
  releasedAmountJERR: bigint; // Montant débloqué pour KidJERR (égal à exchangeAmountJERR)
  timestamp: Date;
  transactionHash?: string;
}

export interface KidJerrSimulationInput {
  exchangeAmountEUR: number; // Montant en € à échanger
}

export interface KidJerrSimulationResult {
  exchangeAmountJERR: bigint; // JERR reçus par l'utilisateur
  releasedForProjects: bigint; // JERR débloqués pour les projets KidJERR
  impactPercentage: number; // % du coffre KidJERR utilisé
  projectsImpact: string[]; // Liste des projets qui bénéficieront
}