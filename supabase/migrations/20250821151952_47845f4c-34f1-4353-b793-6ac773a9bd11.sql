-- Créer les tables pour le système de nomination en entonnoir

-- Table des élections (cycles électoraux)
CREATE TABLE public.elections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  position TEXT NOT NULL, -- 'president', 'conseil_member', 'secretary_general'
  department TEXT, -- Pour les directeurs de département
  current_round INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'upcoming', -- 'upcoming', 'active', 'completed'
  round_1_start_date TIMESTAMP WITH TIME ZONE,
  round_1_end_date TIMESTAMP WITH TIME ZONE,
  round_2_start_date TIMESTAMP WITH TIME ZONE,
  round_2_end_date TIMESTAMP WITH TIME ZONE,
  round_3_start_date TIMESTAMP WITH TIME ZONE,
  round_3_end_date TIMESTAMP WITH TIME ZONE,
  min_nominations_for_round_2 INTEGER DEFAULT 10,
  max_candidates_round_2 INTEGER DEFAULT 20,
  max_finalists_round_3 INTEGER DEFAULT 3,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table des nominations (Tour 1)
CREATE TABLE public.nominations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  election_id UUID NOT NULL REFERENCES public.elections(id) ON DELETE CASCADE,
  nominator_id UUID NOT NULL, -- Citoyen qui nomme
  nominated_person_name TEXT NOT NULL,
  nominated_person_email TEXT,
  nominated_person_bio TEXT,
  justification TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active', -- 'active', 'withdrawn'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table des candidats présélectionnés (Tours 2 et 3)
CREATE TABLE public.candidates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  election_id UUID NOT NULL REFERENCES public.elections(id) ON DELETE CASCADE,
  person_name TEXT NOT NULL,
  person_email TEXT,
  person_bio TEXT,
  nomination_count INTEGER NOT NULL DEFAULT 0, -- Nombre de nominations reçues
  round_qualified INTEGER NOT NULL, -- 2 ou 3 (tour pour lequel qualifié)
  acceptance_status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'accepted', 'declined'
  presentation_text TEXT, -- Présentation du candidat
  vision_statement TEXT, -- Vision/programme
  experience_summary TEXT, -- Résumé expérience
  profile_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table des votes citoyens (Tours 2 et 3)
CREATE TABLE public.citizen_votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  election_id UUID NOT NULL REFERENCES public.elections(id) ON DELETE CASCADE,
  voter_id UUID NOT NULL, -- Citoyen qui vote
  candidate_id UUID NOT NULL REFERENCES public.candidates(id) ON DELETE CASCADE,
  round_number INTEGER NOT NULL, -- 2 ou 3
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  UNIQUE(election_id, voter_id, round_number) -- Un vote par tour par citoyen
);

-- Table des pétitions pour candidats supplémentaires (Tour 2)
CREATE TABLE public.candidate_petitions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  election_id UUID NOT NULL REFERENCES public.elections(id) ON DELETE CASCADE,
  petitioner_id UUID NOT NULL, -- Citoyen qui lance la pétition
  candidate_name TEXT NOT NULL,
  candidate_email TEXT,
  candidate_bio TEXT,
  petition_reason TEXT NOT NULL,
  required_signatures INTEGER NOT NULL DEFAULT 100,
  current_signatures INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active', -- 'active', 'successful', 'failed'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table des signatures de pétitions
CREATE TABLE public.petition_signatures (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  petition_id UUID NOT NULL REFERENCES public.candidate_petitions(id) ON DELETE CASCADE,
  signer_id UUID NOT NULL, -- Citoyen qui signe
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  UNIQUE(petition_id, signer_id) -- Une signature par citoyen par pétition
);

-- Table des débats et échanges
CREATE TABLE public.candidate_debates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  election_id UUID NOT NULL REFERENCES public.elections(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  scheduled_date TIMESTAMP WITH TIME ZONE,
  debate_type TEXT NOT NULL, -- 'written', 'video', 'live'
  participants TEXT[], -- IDs des candidats participants
  status TEXT NOT NULL DEFAULT 'scheduled', -- 'scheduled', 'active', 'completed'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Activer RLS sur toutes les tables
ALTER TABLE public.elections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nominations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.citizen_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_petitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.petition_signatures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_debates ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour elections (publique en lecture, admin en écriture)
CREATE POLICY "Elections are viewable by everyone" 
ON public.elections 
FOR SELECT 
USING (true);

-- Politiques RLS pour nominations (création par utilisateurs authentifiés)
CREATE POLICY "Users can create nominations" 
ON public.nominations 
FOR INSERT 
WITH CHECK (auth.uid() = nominator_id);

CREATE POLICY "Nominations are viewable by everyone" 
ON public.nominations 
FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own nominations" 
ON public.nominations 
FOR UPDATE 
USING (auth.uid() = nominator_id);

-- Politiques RLS pour candidates (publique en lecture)
CREATE POLICY "Candidates are viewable by everyone" 
ON public.candidates 
FOR SELECT 
USING (true);

-- Politiques RLS pour votes citoyens
CREATE POLICY "Users can create their own votes" 
ON public.citizen_votes 
FOR INSERT 
WITH CHECK (auth.uid() = voter_id);

CREATE POLICY "Users can view all votes for transparency" 
ON public.citizen_votes 
FOR SELECT 
USING (true);

-- Politiques RLS pour pétitions
CREATE POLICY "Users can create petitions" 
ON public.candidate_petitions 
FOR INSERT 
WITH CHECK (auth.uid() = petitioner_id);

CREATE POLICY "Petitions are viewable by everyone" 
ON public.candidate_petitions 
FOR SELECT 
USING (true);

-- Politiques RLS pour signatures de pétitions
CREATE POLICY "Users can sign petitions" 
ON public.petition_signatures 
FOR INSERT 
WITH CHECK (auth.uid() = signer_id);

CREATE POLICY "Petition signatures are viewable by everyone" 
ON public.petition_signatures 
FOR SELECT 
USING (true);

-- Politiques RLS pour débats (publique en lecture)
CREATE POLICY "Debates are viewable by everyone" 
ON public.candidate_debates 
FOR SELECT 
USING (true);

-- Fonction pour calculer le nombre de nominations par candidat
CREATE OR REPLACE FUNCTION update_candidate_nomination_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Mettre à jour ou créer le candidat
    INSERT INTO candidates (election_id, person_name, person_email, person_bio, nomination_count, round_qualified)
    VALUES (NEW.election_id, NEW.nominated_person_name, NEW.nominated_person_email, NEW.nominated_person_bio, 1, 2)
    ON CONFLICT (election_id, person_name) 
    DO UPDATE SET nomination_count = candidates.nomination_count + 1;
    
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour automatiquement les comptes de nominations
CREATE TRIGGER update_nomination_count_trigger
  AFTER INSERT ON nominations
  FOR EACH ROW
  EXECUTE FUNCTION update_candidate_nomination_count();

-- Fonction pour gérer les transitions automatiques entre tours
CREATE OR REPLACE FUNCTION check_election_round_transitions()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql;

-- Trigger pour les transitions automatiques
CREATE TRIGGER election_round_transition_trigger
  BEFORE UPDATE ON elections
  FOR EACH ROW
  EXECUTE FUNCTION check_election_round_transitions();

-- Insérer quelques élections d'exemple
INSERT INTO public.elections (title, description, position, current_round, status, round_1_start_date, round_1_end_date, round_2_start_date, round_2_end_date, round_3_start_date, round_3_end_date) VALUES
('Élection du Président de l''Humanité Unie', 'Première élection présidentielle de l''Organisation de l''Humanité Unie selon le système de nomination en entonnoir à 3 tours', 'president', 1, 'active', now(), now() + interval '14 days', now() + interval '15 days', now() + interval '28 days', now() + interval '29 days', now() + interval '42 days'),
('Élection du Secrétaire Général', 'Élection du Secrétaire Général de l''OHU par nomination populaire', 'secretary_general', 1, 'upcoming', now() + interval '7 days', now() + interval '21 days', now() + interval '22 days', now() + interval '35 days', now() + interval '36 days', now() + interval '49 days'),
('Conseil de Sécurité Humaine - Membre 1', 'Élection d''un membre du Conseil de Sécurité Humaine sans veto permanent', 'conseil_member', 1, 'upcoming', now() + interval '14 days', now() + interval '28 days', now() + interval '29 days', now() + interval '42 days', now() + interval '43 days', now() + interval '56 days');