-- Créer la table de configuration PER-JRC (singleton)
CREATE TABLE public.perjr_rules (
  id boolean PRIMARY KEY DEFAULT true,
  base_rate_eur_per_jrc numeric(10,6) NOT NULL DEFAULT 0.010000,
  bronze_min_eur numeric(12,2) NOT NULL DEFAULT 1500.00,
  bronze_rate_eur_per_jrc numeric(10,6) NOT NULL DEFAULT 0.008000,
  silver_min_eur numeric(12,2) NOT NULL DEFAULT 3000.00,
  silver_rate_eur_per_jrc numeric(10,6) NOT NULL DEFAULT 0.006000,
  gold_min_eur numeric(12,2) NOT NULL DEFAULT 5000.00,
  gold_rate_eur_per_jrc numeric(10,6) NOT NULL DEFAULT 0.004000,
  eligibility_birthyear_max integer NOT NULL DEFAULT 1985,
  quote_lock_minutes integer NOT NULL DEFAULT 15,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT single_config CHECK (id = true)
);

-- Créer la table des changes PER-JRC
CREATE TABLE public.perjr_changes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  amount_eur numeric(12,2) NOT NULL,
  tier text NOT NULL CHECK (tier IN ('bronze','argent','or')),
  rate_eur_per_jrc numeric(10,6) NOT NULL,
  jrc_credited numeric(20,0) NOT NULL,
  status text NOT NULL CHECK (status IN ('quoted','committed','settled','expired')),
  quote_id text,
  quote_expires_at timestamp with time zone,
  payment_intent_id text,
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Index unique partiel pour garantir le one-shot (un seul change committed/settled par utilisateur)
CREATE UNIQUE INDEX perjr_one_shot_committed ON public.perjr_changes(user_id)
WHERE status IN ('committed','settled');

-- Index pour les requêtes fréquentes
CREATE INDEX idx_perjr_changes_user_status ON public.perjr_changes(user_id, status);
CREATE INDEX idx_perjr_changes_quote_id ON public.perjr_changes(quote_id) WHERE quote_id IS NOT NULL;

-- Activer RLS
ALTER TABLE public.perjr_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.perjr_changes ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour perjr_rules (lecture publique)
CREATE POLICY "Anyone can view PER-JRC rules" ON public.perjr_rules
  FOR SELECT USING (true);

-- Politiques RLS pour perjr_changes (utilisateurs peuvent voir leurs propres changes)
CREATE POLICY "Users can view their own PER-JRC changes" ON public.perjr_changes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own PER-JRC changes" ON public.perjr_changes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own PER-JRC changes" ON public.perjr_changes
  FOR UPDATE USING (auth.uid() = user_id);

-- Trigger pour updated_at
CREATE OR REPLACE FUNCTION public.update_perjr_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_perjr_rules_updated_at
  BEFORE UPDATE ON public.perjr_rules
  FOR EACH ROW
  EXECUTE FUNCTION public.update_perjr_updated_at();

CREATE TRIGGER update_perjr_changes_updated_at
  BEFORE UPDATE ON public.perjr_changes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_perjr_updated_at();

-- Insérer la configuration par défaut
INSERT INTO public.perjr_rules DEFAULT VALUES;