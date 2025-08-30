-- Update silver tier rate to achieve exactly 165 JRC/€
UPDATE perjr_rules 
SET silver_rate_eur_per_jrc = 0.006060606,
    updated_at = now()
WHERE id = true;