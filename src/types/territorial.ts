export type TerritorialLevel = 'commune' | 'interco' | 'region';

export type OrganType = 
  | 'executive'
  | 'council'
  | 'mediation_arbitrage'
  | 'administration'
  | 'treasury_finances'
  | 'compliance_security'
  | 'digital_data'
  | 'thematic_services'
  | 'participation'
  | 'audit_ethics';

export type PositionType = 
  | 'maire_jerr'
  | 'adjoint_finances'
  | 'adjoint_numerique'
  | 'adjoint_sante_ohs'
  | 'adjoint_environnement_osp'
  | 'adjoint_economie_opa'
  | 'adjoint_culture_education'
  | 'adjoint_urbanisme_mobilite'
  | 'adjoint_inclusion_social'
  | 'adjoint_conformite_securite'
  | 'adjoint_crise_resilience'
  | 'conseiller'
  | 'agent'
  | 'mediateur'
  | 'arbitre';

export interface TerritorialEntity {
  id: string;
  name: string;
  level: TerritorialLevel;
  parent_id?: string;
  population?: number;
  budget_annual?: number;
  coordinates?: any;
  address?: string;
  postal_code?: string;
  region?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface OrganizationalOrgan {
  id: string;
  territorial_entity_id: string;
  organ_type: OrganType;
  name: string;
  description?: string;
  is_active: boolean;
  smart_contract_address?: string;
  multisig_threshold?: number;
  multisig_signers?: number;
  spend_limits?: any;
  created_at: string;
  updated_at: string;
}

export interface TerritorialPosition {
  id: string;
  organ_id: string;
  user_id?: string;
  position_type: PositionType;
  title: string;
  mandate_start?: string;
  mandate_end?: string;
  salary_annual_eur?: number;
  is_active: boolean;
  is_revocable: boolean;
  portfolio_areas?: string[];
  kpis?: any[];
  created_at: string;
  updated_at: string;
}

export interface TerritorialKPI {
  id: string;
  territorial_entity_id: string;
  organ_id?: string;
  kpi_category: string;
  kpi_name: string;
  kpi_value?: number;
  kpi_target?: number;
  measurement_date: string;
  metadata?: any;
  created_at: string;
}

export interface TerritorialBudget {
  id: string;
  territorial_entity_id: string;
  budget_year: number;
  organ_type: OrganType;
  allocated_amount: number;
  spent_amount: number;
  committed_amount: number;
  budget_category?: string;
  is_participatory: boolean;
  smart_contract_address?: string;
  created_at: string;
  updated_at: string;
}

export interface CitizenParticipation {
  id: string;
  territorial_entity_id: string;
  citizen_id?: string;
  participation_type: string;
  proposal_title?: string;
  proposal_description?: string;
  votes_for: number;
  votes_against: number;
  votes_abstain: number;
  budget_requested?: number;
  status: string;
  voting_start_date?: string;
  voting_end_date?: string;
  execution_date?: string;
  created_at: string;
  updated_at: string;
}

export interface SmartContract {
  id: string;
  territorial_entity_id: string;
  contract_type: string;
  contract_address: string;
  contract_abi?: any;
  deployment_date: string;
  is_active: boolean;
  version: string;
  description?: string;
}