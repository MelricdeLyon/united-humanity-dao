-- Système de nomination d'habitants et tirage au sort

-- Table des nominations d'habitants
CREATE TABLE public.resident_nominations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nominator_id UUID NOT NULL,
  nominated_person_name TEXT NOT NULL,
  nominated_person_email TEXT,
  nominated_person_bio TEXT,
  organization_type TEXT NOT NULL, -- 'osp', 'ohu', 'ohs'
  position_type TEXT NOT NULL, -- 'council', 'director', 'specialist'
  nomination_reason TEXT NOT NULL,
  supporting_evidence TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'pending' -- 'pending', 'validated', 'rejected'
);

-- Table du pool d'éligibles
CREATE TABLE public.eligible_pool (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  person_name TEXT NOT NULL,
  person_email TEXT,
  person_bio TEXT,
  organization_type TEXT NOT NULL,
  position_type TEXT NOT NULL,
  nomination_count INTEGER NOT NULL DEFAULT 1,
  validation_score NUMERIC NOT NULL DEFAULT 0,
  skills JSONB DEFAULT '[]'::jsonb,
  reputation_score NUMERIC NOT NULL DEFAULT 0,
  is_eligible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(person_name, person_email, organization_type, position_type)
);

-- Table des tirages au sort
CREATE TABLE public.random_selections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_type TEXT NOT NULL,
  position_type TEXT NOT NULL,
  selected_person_id UUID REFERENCES public.eligible_pool(id),
  selection_method TEXT NOT NULL DEFAULT 'random',
  selection_criteria JSONB DEFAULT '{}'::jsonb,
  blockchain_hash TEXT,
  performed_by UUID,
  performed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Table des critères de nomination
CREATE TABLE public.nomination_criteria (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_type TEXT NOT NULL,
  position_type TEXT NOT NULL,
  required_skills JSONB DEFAULT '[]'::jsonb,
  minimum_nominations INTEGER NOT NULL DEFAULT 3,
  validation_threshold NUMERIC NOT NULL DEFAULT 0.7,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Activer RLS
ALTER TABLE public.resident_nominations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eligible_pool ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.random_selections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nomination_criteria ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour resident_nominations
CREATE POLICY "Users can create nominations"
ON public.resident_nominations 
FOR INSERT 
WITH CHECK (auth.uid() = nominator_id);

CREATE POLICY "Nominations are viewable by everyone"
ON public.resident_nominations 
FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own nominations"
ON public.resident_nominations 
FOR UPDATE 
USING (auth.uid() = nominator_id);

-- Politiques RLS pour eligible_pool
CREATE POLICY "Eligible pool is viewable by everyone"
ON public.eligible_pool 
FOR SELECT 
USING (true);

-- Politiques RLS pour random_selections
CREATE POLICY "Random selections are viewable by everyone"
ON public.random_selections 
FOR SELECT 
USING (true);

-- Politiques RLS pour nomination_criteria
CREATE POLICY "Nomination criteria are viewable by everyone"
ON public.nomination_criteria 
FOR SELECT 
USING (true);

-- Fonction pour mettre à jour le pool d'éligibles
CREATE OR REPLACE FUNCTION public.update_eligible_pool()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Mettre à jour ou créer l'entrée dans le pool d'éligibles
    INSERT INTO eligible_pool (
      person_name, person_email, person_bio, organization_type, position_type, nomination_count, validation_score
    )
    VALUES (
      NEW.nominated_person_name, 
      NEW.nominated_person_email, 
      NEW.nominated_person_bio, 
      NEW.organization_type, 
      NEW.position_type, 
      1, 
      0.1
    )
    ON CONFLICT (person_name, person_email, organization_type, position_type) 
    DO UPDATE SET 
      nomination_count = eligible_pool.nomination_count + 1,
      validation_score = eligible_pool.validation_score + 0.1,
      updated_at = now();
    
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour automatiquement le pool
CREATE TRIGGER update_eligible_pool_trigger
  AFTER INSERT ON public.resident_nominations
  FOR EACH ROW EXECUTE FUNCTION public.update_eligible_pool();

-- Fonction pour mise à jour automatique des timestamps
CREATE TRIGGER update_resident_nominations_updated_at
  BEFORE UPDATE ON public.resident_nominations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_eligible_pool_updated_at
  BEFORE UPDATE ON public.eligible_pool
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insérer des critères de base
INSERT INTO nomination_criteria (organization_type, position_type, required_skills, minimum_nominations, validation_threshold) VALUES
('osp', 'council', '["Écologie", "Gouvernance", "Science climatique"]', 5, 0.8),
('osp', 'director', '["Leadership", "Symbiose planétaire", "Vision globale"]', 10, 0.85),
('ohu', 'council', '["Droits humains", "Gouvernance", "Justice sociale"]', 5, 0.8),
('ohu', 'director', '["Leadership humanitaire", "Diplomatie", "Éthique"]', 10, 0.85),
('ohs', 'council', '["Médecine", "Santé publique", "Recherche"]', 5, 0.8),
('ohs', 'director', '["Leadership médical", "Innovation santé", "Bioéthique"]', 10, 0.85);