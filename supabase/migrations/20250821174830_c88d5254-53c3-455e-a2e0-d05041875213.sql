-- Renommer les colonnes USD vers EUR dans les tables existantes
ALTER TABLE council_members RENAME COLUMN salary_usd_annual TO salary_eur_annual;

-- Renommer la colonne dans ohs_proposals
ALTER TABLE ohs_proposals RENAME COLUMN estimated_budget_usd TO estimated_budget_eur;

-- Si d'autres tables contiennent des colonnes USD, les renommer aussi
-- Vérification s'il y a d'autres colonnes à renommer
ALTER TABLE ohs_council_members RENAME COLUMN salary_usd_annual TO salary_eur_annual;