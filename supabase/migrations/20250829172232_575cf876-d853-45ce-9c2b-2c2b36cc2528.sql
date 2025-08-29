-- Create territorial governance tables

-- 1. Territorial levels enum
CREATE TYPE territorial_level AS ENUM ('commune', 'interco', 'region');

-- 2. Organizational organs enum  
CREATE TYPE organ_type AS ENUM (
  'executive',
  'council', 
  'mediation_arbitrage',
  'administration',
  'treasury_finances',
  'compliance_security',
  'digital_data',
  'thematic_services',
  'participation',
  'audit_ethics'
);

-- 3. Position types enum
CREATE TYPE position_type AS ENUM (
  'maire_jerr',
  'adjoint_finances',
  'adjoint_numerique',
  'adjoint_sante_ohs',
  'adjoint_environnement_osp',
  'adjoint_economie_opa',
  'adjoint_culture_education',
  'adjoint_urbanisme_mobilite',
  'adjoint_inclusion_social',
  'adjoint_conformite_securite',
  'adjoint_crise_resilience',
  'conseiller',
  'agent',
  'mediateur',
  'arbitre'
);

-- 4. Territorial entities table
CREATE TABLE territorial_entities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  level territorial_level NOT NULL,
  parent_id UUID REFERENCES territorial_entities(id),
  population INTEGER,
  budget_annual NUMERIC,
  coordinates JSONB,
  address TEXT,
  postal_code TEXT,
  region TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  UNIQUE(name, level)
);

-- 5. Organizational organs table
CREATE TABLE organizational_organs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  territorial_entity_id UUID NOT NULL REFERENCES territorial_entities(id) ON DELETE CASCADE,
  organ_type organ_type NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  smart_contract_address TEXT,
  multisig_threshold INTEGER,
  multisig_signers INTEGER,
  spend_limits JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  UNIQUE(territorial_entity_id, organ_type)
);

-- 6. Positions table
CREATE TABLE territorial_positions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organ_id UUID NOT NULL REFERENCES organizational_organs(id) ON DELETE CASCADE,
  user_id UUID,
  position_type position_type NOT NULL,
  title TEXT NOT NULL,
  mandate_start TIMESTAMP WITH TIME ZONE,
  mandate_end TIMESTAMP WITH TIME ZONE,
  salary_annual_eur NUMERIC,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_revocable BOOLEAN NOT NULL DEFAULT false,
  portfolio_areas TEXT[],
  kpis JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 7. Smart contracts registry
CREATE TABLE smart_contracts_registry (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  territorial_entity_id UUID NOT NULL REFERENCES territorial_entities(id) ON DELETE CASCADE,
  contract_type TEXT NOT NULL,
  contract_address TEXT NOT NULL,
  contract_abi JSONB,
  deployment_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true,
  version TEXT DEFAULT '1.0',
  description TEXT,
  
  UNIQUE(territorial_entity_id, contract_type)
);

-- 8. Territorial KPIs table
CREATE TABLE territorial_kpis (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  territorial_entity_id UUID NOT NULL REFERENCES territorial_entities(id) ON DELETE CASCADE,
  organ_id UUID REFERENCES organizational_organs(id) ON DELETE CASCADE,
  kpi_category TEXT NOT NULL,
  kpi_name TEXT NOT NULL,
  kpi_value NUMERIC,
  kpi_target NUMERIC,
  measurement_date DATE NOT NULL DEFAULT CURRENT_DATE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 9. Territorial budgets table
CREATE TABLE territorial_budgets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  territorial_entity_id UUID NOT NULL REFERENCES territorial_entities(id) ON DELETE CASCADE,
  budget_year INTEGER NOT NULL,
  organ_type organ_type NOT NULL,
  allocated_amount NUMERIC NOT NULL,
  spent_amount NUMERIC DEFAULT 0,
  committed_amount NUMERIC DEFAULT 0,
  budget_category TEXT,
  is_participatory BOOLEAN DEFAULT false,
  smart_contract_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  UNIQUE(territorial_entity_id, budget_year, organ_type, budget_category)
);

-- 10. Citizen participation table
CREATE TABLE citizen_participation (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  territorial_entity_id UUID NOT NULL REFERENCES territorial_entities(id) ON DELETE CASCADE,
  citizen_id UUID,
  participation_type TEXT NOT NULL,
  proposal_title TEXT,
  proposal_description TEXT,
  votes_for INTEGER DEFAULT 0,
  votes_against INTEGER DEFAULT 0,
  votes_abstain INTEGER DEFAULT 0,
  budget_requested NUMERIC,
  status TEXT DEFAULT 'draft',
  voting_start_date TIMESTAMP WITH TIME ZONE,
  voting_end_date TIMESTAMP WITH TIME ZONE,
  execution_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE territorial_entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizational_organs ENABLE ROW LEVEL SECURITY;
ALTER TABLE territorial_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE smart_contracts_registry ENABLE ROW LEVEL SECURITY;
ALTER TABLE territorial_kpis ENABLE ROW LEVEL SECURITY;
ALTER TABLE territorial_budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE citizen_participation ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public viewing of territorial structure
CREATE POLICY "Territorial entities are viewable by everyone"
ON territorial_entities FOR SELECT
USING (is_active = true);

CREATE POLICY "Organizational organs are viewable by everyone"
ON organizational_organs FOR SELECT
USING (is_active = true);

CREATE POLICY "Active positions are viewable by everyone"
ON territorial_positions FOR SELECT
USING (is_active = true);

CREATE POLICY "KPIs are viewable by everyone"
ON territorial_kpis FOR SELECT
USING (true);

CREATE POLICY "Budget info is viewable by everyone"
ON territorial_budgets FOR SELECT
USING (true);

CREATE POLICY "Participation proposals are viewable by everyone"
ON citizen_participation FOR SELECT
USING (true);

-- Citizens can create participation proposals
CREATE POLICY "Citizens can create participation proposals"
ON citizen_participation FOR INSERT
WITH CHECK (auth.uid() = citizen_id);

CREATE POLICY "Citizens can update their own proposals"
ON citizen_participation FOR UPDATE
USING (auth.uid() = citizen_id);

-- Insert sample data for demonstration
INSERT INTO territorial_entities (name, level, population, budget_annual, address, region) VALUES
('Paris', 'commune', 2161000, 9800000000, 'Place de l''Hôtel de Ville, 75004 Paris', 'Île-de-France'),
('Métropole du Grand Paris', 'interco', 7000000, 15000000000, 'Paris', 'Île-de-France'),
('Île-de-France', 'region', 12000000, 25000000000, 'Paris', 'Île-de-France');

-- Create organs for Paris commune
INSERT INTO organizational_organs (territorial_entity_id, organ_type, name, description, multisig_threshold, multisig_signers) 
SELECT 
  te.id,
  organ::organ_type,
  CASE organ
    WHEN 'executive' THEN 'Exécutif Municipal'
    WHEN 'council' THEN 'Conseil des Habitants'
    WHEN 'mediation_arbitrage' THEN 'Chambre de Médiation/Arbitrage'
    WHEN 'administration' THEN 'Administration Générale'
    WHEN 'treasury_finances' THEN 'Trésor & Finances'
    WHEN 'compliance_security' THEN 'Conformité & Sûreté'
    WHEN 'digital_data' THEN 'Numérique & Data'
    WHEN 'thematic_services' THEN 'Services Thématiques'
    WHEN 'participation' THEN 'Participation Citoyenne'
    WHEN 'audit_ethics' THEN 'Audit & Éthique'
  END,
  CASE organ
    WHEN 'executive' THEN 'Direction exécutive de la commune avec Maire-Jerr et adjoints'
    WHEN 'council' THEN 'Assemblée délibérante des habitants élus'
    WHEN 'mediation_arbitrage' THEN 'Résolution des conflits et litiges'
    WHEN 'administration' THEN 'Services administratifs et RH'
    WHEN 'treasury_finances' THEN 'Gestion financière multi-sig'
    WHEN 'compliance_security' THEN 'Conformité réglementaire et sécurité'
    WHEN 'digital_data' THEN 'Infrastructure numérique et données'
    WHEN 'thematic_services' THEN 'Services OHS, OSP, OPA et autres'
    WHEN 'participation' THEN 'Budgets participatifs et consultation'
    WHEN 'audit_ethics' THEN 'Contrôle interne et éthique'
  END,
  CASE organ WHEN 'treasury_finances' THEN 3 ELSE 1 END,
  CASE organ WHEN 'treasury_finances' THEN 5 ELSE 1 END
FROM territorial_entities te, 
     unnest(ARRAY['executive', 'council', 'mediation_arbitrage', 'administration', 'treasury_finances', 'compliance_security', 'digital_data', 'thematic_services', 'participation', 'audit_ethics']) AS organ
WHERE te.name = 'Paris' AND te.level = 'commune';

-- Insert sample positions
INSERT INTO territorial_positions (organ_id, position_type, title, mandate_start, mandate_end, salary_annual_eur, is_revocable, portfolio_areas)
SELECT 
  oo.id,
  'maire_jerr'::position_type,
  'Maire-Jerr de Paris',
  now(),
  now() + interval '24 months',
  120000,
  true,
  ARRAY['Direction générale', 'Représentation', 'Sécurité juridique']
FROM organizational_organs oo
JOIN territorial_entities te ON te.id = oo.territorial_entity_id
WHERE te.name = 'Paris' AND oo.organ_type = 'executive';

-- Create update trigger
CREATE OR REPLACE FUNCTION update_territorial_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_territorial_entities_updated_at
  BEFORE UPDATE ON territorial_entities
  FOR EACH ROW EXECUTE FUNCTION update_territorial_updated_at();

CREATE TRIGGER update_organizational_organs_updated_at
  BEFORE UPDATE ON organizational_organs
  FOR EACH ROW EXECUTE FUNCTION update_territorial_updated_at();

CREATE TRIGGER update_territorial_positions_updated_at
  BEFORE UPDATE ON territorial_positions
  FOR EACH ROW EXECUTE FUNCTION update_territorial_updated_at();

CREATE TRIGGER update_territorial_budgets_updated_at
  BEFORE UPDATE ON territorial_budgets
  FOR EACH ROW EXECUTE FUNCTION update_territorial_updated_at();

CREATE TRIGGER update_citizen_participation_updated_at
  BEFORE UPDATE ON citizen_participation
  FOR EACH ROW EXECUTE FUNCTION update_territorial_updated_at();