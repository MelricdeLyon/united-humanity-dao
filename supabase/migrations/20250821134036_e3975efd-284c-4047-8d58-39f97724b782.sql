-- Create DAO Treasury and Governance System

-- Treasury main table
CREATE TABLE public.dao_treasury (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  total_supply NUMERIC NOT NULL DEFAULT 500000000000000, -- 500 trillion JerrCoins
  distributed_amount NUMERIC NOT NULL DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Treasury vaults for different sectors
CREATE TABLE public.treasury_vaults (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  allocation_amount NUMERIC NOT NULL,
  spent_amount NUMERIC NOT NULL DEFAULT 0,
  vault_type TEXT NOT NULL, -- 'sales', 'activity_bonus', 'transaction_bonus', 'negative_loans', 'insurance', 'team'
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- DAO Proposals
CREATE TABLE public.dao_proposals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  status TEXT NOT NULL DEFAULT 'active', -- 'active', 'passed', 'rejected', 'executed'
  voting_starts_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  voting_ends_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + INTERVAL '7 days'),
  votes_for INTEGER NOT NULL DEFAULT 0,
  votes_against INTEGER NOT NULL DEFAULT 0,
  quorum_required INTEGER NOT NULL DEFAULT 50, -- percentage
  execution_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- DAO Votes
CREATE TABLE public.dao_votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  proposal_id UUID REFERENCES public.dao_proposals(id) ON DELETE CASCADE,
  voter_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  vote_choice BOOLEAN NOT NULL, -- true for 'for', false for 'against'
  voting_power INTEGER NOT NULL DEFAULT 1,
  transaction_signature TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(proposal_id, voter_id)
);

-- DAO Members (Citizens)
CREATE TABLE public.dao_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  citizenship_nft_address TEXT UNIQUE,
  voting_power INTEGER NOT NULL DEFAULT 1,
  reputation_score INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_activity_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Council Members
CREATE TABLE public.council_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  position TEXT NOT NULL, -- 'president', 'vice_president', 'world_council', 'director'
  department TEXT, -- for directors: 'peace_security', 'sustainable_development', 'human_development', 'tech_culture'
  term_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  term_end TIMESTAMP WITH TIME ZONE,
  salary_usd_annual NUMERIC,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.dao_treasury ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.treasury_vaults ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dao_proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dao_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dao_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.council_members ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view treasury" ON public.dao_treasury FOR SELECT USING (true);
CREATE POLICY "Anyone can view treasury vaults" ON public.treasury_vaults FOR SELECT USING (true);
CREATE POLICY "Anyone can view proposals" ON public.dao_proposals FOR SELECT USING (true);
CREATE POLICY "Members can create proposals" ON public.dao_proposals FOR INSERT WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "Creators can update their proposals" ON public.dao_proposals FOR UPDATE USING (auth.uid() = creator_id);

CREATE POLICY "Anyone can view votes" ON public.dao_votes FOR SELECT USING (true);
CREATE POLICY "Members can vote" ON public.dao_votes FOR INSERT WITH CHECK (auth.uid() = voter_id);

CREATE POLICY "Anyone can view DAO members" ON public.dao_members FOR SELECT USING (true);
CREATE POLICY "Users can create their membership" ON public.dao_members FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their membership" ON public.dao_members FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view council members" ON public.council_members FOR SELECT USING (true);

-- Insert initial treasury data
INSERT INTO public.dao_treasury (total_supply) VALUES (500000000000000);

-- Insert initial vault allocations
INSERT INTO public.treasury_vaults (name, description, allocation_amount, vault_type) VALUES
('Vente aux Citoyens', 'JerrCoins destinés à la vente publique aux citoyens au prix de 0,01€', 150000000000000, 'sales'),
('Bonus d''Activité', 'Récompenses pour les interactions des résidents dans la Nation', 50000000000000, 'activity_bonus'),
('Bonus de Transactions', 'Bonus pour les transactions particuliers-professionnels', 50000000000000, 'transaction_bonus'),
('Prêts Négatifs', 'Financement du système de prêts à taux négatifs', 120000000000000, 'negative_loans'),
('Assurance', 'Financement du système d''assurance biens et personnes', 120000000000000, 'insurance'),
('Équipe CydJerr', 'Allocation pour l''équipe de développement', 10000000000000, 'team');

-- Functions
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER update_treasury_vaults_updated_at
  BEFORE UPDATE ON public.treasury_vaults
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_dao_proposals_updated_at
  BEFORE UPDATE ON public.dao_proposals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();