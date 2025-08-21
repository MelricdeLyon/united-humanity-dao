-- Create tables for Organisation Humaine de la Santé (OHS)

-- Table pour les élections OHS
CREATE TABLE public.ohs_elections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  position TEXT NOT NULL, -- 'directeur_general', 'conseil_mondial', 'directeur_regional'
  region TEXT, -- Pour les directeurs régionaux: 'afrique', 'ameriques', 'asie_sud_est', 'europe', 'mediterranee_orientale', 'pacifique_occidental'
  current_round INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'active', -- 'active', 'completed', 'cancelled'
  round_1_start_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  round_1_end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  round_2_start_date TIMESTAMP WITH TIME ZONE,
  round_2_end_date TIMESTAMP WITH TIME ZONE,
  round_3_start_date TIMESTAMP WITH TIME ZONE,
  round_3_end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les membres du Conseil Mondial de la Santé OHS
CREATE TABLE public.ohs_council_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  name TEXT NOT NULL,
  position TEXT NOT NULL, -- 'directeur_general', 'membre_conseil', 'directeur_regional'
  department TEXT, -- 'surveillance_epidemiologique', 'intervention_urgence', 'recherche_medicale', 'sante_preventive', 'one_health'
  region TEXT, -- Pour les directeurs régionaux
  term_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  term_end TIMESTAMP WITH TIME ZONE,
  salary_usd_annual NUMERIC,
  expertise_areas TEXT[], -- domaines d'expertise médicale
  qualifications TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  election_id UUID, -- référence vers l'élection qui l'a élu
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les candidats OHS
CREATE TABLE public.ohs_candidates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  election_id UUID NOT NULL REFERENCES public.ohs_elections(id),
  person_name TEXT NOT NULL,
  person_email TEXT,
  person_bio TEXT,
  medical_credentials TEXT, -- diplômes et certifications médicales
  experience_summary TEXT,
  vision_statement TEXT,
  health_specialization TEXT[], -- spécialisations en santé publique
  nomination_count INTEGER NOT NULL DEFAULT 0,
  round_qualified INTEGER NOT NULL,
  acceptance_status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'accepted', 'declined'
  profile_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les nominations OHS
CREATE TABLE public.ohs_nominations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  election_id UUID NOT NULL REFERENCES public.ohs_elections(id),
  nominator_id UUID NOT NULL, -- celui qui nomme
  nominated_person_name TEXT NOT NULL,
  nominated_person_email TEXT,
  nominated_person_bio TEXT,
  medical_credentials TEXT,
  justification_text TEXT, -- pourquoi cette personne est qualifiée
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(election_id, nominator_id) -- une nomination par utilisateur par élection
);

-- Table pour les votes OHS
CREATE TABLE public.ohs_votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  election_id UUID NOT NULL REFERENCES public.ohs_elections(id),
  voter_id UUID NOT NULL,
  candidate_id UUID NOT NULL REFERENCES public.ohs_candidates(id),
  round_number INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(election_id, voter_id, candidate_id, round_number)
);

-- Table pour les propositions de politiques de santé OHS
CREATE TABLE public.ohs_proposals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL, -- 'surveillance_epidemiologique', 'intervention_urgence', 'recherche_medicale', 'sante_preventive', 'financement_sante', 'partenariats'
  health_priority_level TEXT NOT NULL DEFAULT 'medium', -- 'low', 'medium', 'high', 'critical'
  proposed_by UUID NOT NULL, -- utilisateur qui propose
  target_regions TEXT[], -- régions concernées
  estimated_budget_usd NUMERIC,
  implementation_timeline TEXT,
  expected_health_impact TEXT,
  supporting_evidence TEXT, -- références scientifiques
  votes_for INTEGER DEFAULT 0,
  votes_against INTEGER DEFAULT 0,
  votes_abstain INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft', -- 'draft', 'voting', 'approved', 'rejected', 'implemented'
  voting_start_date TIMESTAMP WITH TIME ZONE,
  voting_end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les votes sur les propositions OHS
CREATE TABLE public.ohs_proposal_votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  proposal_id UUID NOT NULL REFERENCES public.ohs_proposals(id),
  voter_id UUID NOT NULL,
  vote_type TEXT NOT NULL, -- 'for', 'against', 'abstain'
  expertise_weight NUMERIC DEFAULT 1, -- poids du vote selon expertise médicale
  justification TEXT, -- explication du vote
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(proposal_id, voter_id)
);

-- Table pour la Force d'intervention sanitaire OHS
CREATE TABLE public.ohs_intervention_force (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  member_name TEXT NOT NULL,
  member_email TEXT NOT NULL,
  specialization TEXT NOT NULL, -- 'medecin', 'infirmier', 'epidemiologiste', 'logisticien', 'coordinateur'
  medical_credentials TEXT NOT NULL,
  languages TEXT[], -- langues parlées
  availability_regions TEXT[], -- régions où la personne peut intervenir
  current_status TEXT NOT NULL DEFAULT 'available', -- 'available', 'deployed', 'training', 'inactive'
  deployment_history JSONB DEFAULT '[]', -- historique des déploiements
  emergency_contact TEXT,
  security_clearance_level TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les missions d'urgence sanitaire
CREATE TABLE public.ohs_emergency_missions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mission_name TEXT NOT NULL,
  crisis_type TEXT NOT NULL, -- 'pandemie', 'epidemie', 'catastrophe_naturelle', 'conflit_arme'
  affected_region TEXT NOT NULL,
  severity_level TEXT NOT NULL, -- 'low', 'medium', 'high', 'critical'
  deployed_personnel UUID[], -- IDs des membres de la force déployés
  mission_leader_id UUID,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  estimated_end_date TIMESTAMP WITH TIME ZONE,
  actual_end_date TIMESTAMP WITH TIME ZONE,
  budget_allocated_usd NUMERIC,
  mission_status TEXT NOT NULL DEFAULT 'planning', -- 'planning', 'active', 'completed', 'suspended'
  daily_reports JSONB DEFAULT '[]',
  success_metrics JSONB DEFAULT '{}',
  lessons_learned TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les consultations citoyennes mondiales OHS
CREATE TABLE public.ohs_citizen_consultations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  consultation_title TEXT NOT NULL,
  consultation_question TEXT NOT NULL,
  background_information TEXT,
  consultation_type TEXT NOT NULL, -- 'referendum', 'survey', 'deliberation'
  target_audience TEXT NOT NULL DEFAULT 'global', -- 'global', 'regional', 'experts'
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  total_participants INTEGER DEFAULT 0,
  results_summary JSONB DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft', -- 'draft', 'active', 'completed', 'cancelled'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les réponses aux consultations citoyennes
CREATE TABLE public.ohs_consultation_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  consultation_id UUID NOT NULL REFERENCES public.ohs_citizen_consultations(id),
  participant_id UUID NOT NULL,
  response_data JSONB NOT NULL, -- réponses flexibles selon le type de consultation
  participant_location TEXT, -- pays/région du participant
  participant_expertise_level TEXT, -- 'citizen', 'health_professional', 'researcher', 'policy_maker'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(consultation_id, participant_id)
);

-- Enable Row Level Security
ALTER TABLE public.ohs_elections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ohs_council_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ohs_candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ohs_nominations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ohs_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ohs_proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ohs_proposal_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ohs_intervention_force ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ohs_emergency_missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ohs_citizen_consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ohs_consultation_responses ENABLE ROW LEVEL SECURITY;

-- Policies pour les élections OHS (lisibles par tous)
CREATE POLICY "OHS elections are viewable by everyone" ON public.ohs_elections FOR SELECT USING (true);
CREATE POLICY "OHS council members are viewable by everyone" ON public.ohs_council_members FOR SELECT USING (true);
CREATE POLICY "OHS candidates are viewable by everyone" ON public.ohs_candidates FOR SELECT USING (true);

-- Policies pour les nominations (utilisateurs peuvent créer leurs propres nominations)
CREATE POLICY "Users can create their own OHS nominations" ON public.ohs_nominations 
  FOR INSERT WITH CHECK (auth.uid() = nominator_id);
CREATE POLICY "OHS nominations are viewable by everyone" ON public.ohs_nominations FOR SELECT USING (true);

-- Policies pour les votes (utilisateurs peuvent voter)
CREATE POLICY "Users can create their own OHS votes" ON public.ohs_votes 
  FOR INSERT WITH CHECK (auth.uid() = voter_id);
CREATE POLICY "Users can view their own OHS votes" ON public.ohs_votes 
  FOR SELECT USING (auth.uid() = voter_id);

-- Policies pour les propositions (lisibles par tous, modifiables par l'auteur)
CREATE POLICY "OHS proposals are viewable by everyone" ON public.ohs_proposals FOR SELECT USING (true);
CREATE POLICY "Users can create their own OHS proposals" ON public.ohs_proposals 
  FOR INSERT WITH CHECK (auth.uid() = proposed_by);
CREATE POLICY "Users can update their own OHS proposals" ON public.ohs_proposals 
  FOR UPDATE USING (auth.uid() = proposed_by);

-- Policies pour les votes sur propositions
CREATE POLICY "Users can create their own OHS proposal votes" ON public.ohs_proposal_votes 
  FOR INSERT WITH CHECK (auth.uid() = voter_id);
CREATE POLICY "OHS proposal votes are viewable by everyone" ON public.ohs_proposal_votes FOR SELECT USING (true);

-- Policies pour la force d'intervention (lecture publique)
CREATE POLICY "OHS intervention force is viewable by everyone" ON public.ohs_intervention_force FOR SELECT USING (true);
CREATE POLICY "OHS emergency missions are viewable by everyone" ON public.ohs_emergency_missions FOR SELECT USING (true);

-- Policies pour les consultations citoyennes
CREATE POLICY "OHS consultations are viewable by everyone" ON public.ohs_citizen_consultations FOR SELECT USING (true);
CREATE POLICY "Users can participate in OHS consultations" ON public.ohs_consultation_responses 
  FOR INSERT WITH CHECK (auth.uid() = participant_id);
CREATE POLICY "Users can view their own OHS consultation responses" ON public.ohs_consultation_responses 
  FOR SELECT USING (auth.uid() = participant_id);

-- Triggers pour mise à jour automatique des candidats lors des nominations
CREATE OR REPLACE FUNCTION public.update_ohs_candidate_nomination_count()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Mettre à jour ou créer le candidat OHS
    INSERT INTO ohs_candidates (election_id, person_name, person_email, person_bio, medical_credentials, nomination_count, round_qualified)
    VALUES (NEW.election_id, NEW.nominated_person_name, NEW.nominated_person_email, NEW.nominated_person_bio, NEW.medical_credentials, 1, 2)
    ON CONFLICT (election_id, person_name) 
    DO UPDATE SET nomination_count = ohs_candidates.nomination_count + 1;
    
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$;

CREATE TRIGGER ohs_nomination_candidate_update
  AFTER INSERT ON public.ohs_nominations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_ohs_candidate_nomination_count();

-- Trigger pour gérer les transitions de rounds automatiquement
CREATE OR REPLACE FUNCTION public.check_ohs_election_round_transitions()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  -- Si on dépasse la date de fin du tour 1, passer au tour 2
  IF NEW.round_1_end_date <= now() AND NEW.current_round = 1 THEN
    NEW.current_round = 2;
  END IF;
  
  -- Si on dépasse la date de fin du tour 2, passer au tour 3
  IF NEW.round_2_end_date <= now() AND NEW.current_round = 2 THEN
    NEW.current_round = 3;
  END IF;
  
  -- Si on dépasse la date de fin du tour 3, marquer comme complété
  IF NEW.round_3_end_date <= now() AND NEW.current_round = 3 THEN
    NEW.status = 'completed';
  END IF;
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER ohs_election_round_transitions
  BEFORE UPDATE ON public.ohs_elections
  FOR EACH ROW
  EXECUTE FUNCTION public.check_ohs_election_round_transitions();