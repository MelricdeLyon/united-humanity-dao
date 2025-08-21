-- Insert example proposals for better UX demonstration
INSERT INTO dao_proposals (
  id,
  title,
  description,
  category,
  status,
  votes_for,
  votes_against,
  voting_ends_at,
  creator_id,
  created_at
) VALUES
  (
    'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
    'Augmentation du budget du département Paix & Sécurité',
    'Proposition d''augmenter le budget du département Paix & Sécurité de 30% pour renforcer les missions de médiation internationale et développer de nouveaux programmes de résolution de conflits. Cette augmentation permettrait de recruter 5 médiateurs supplémentaires et de créer un fonds d''urgence pour les interventions rapides.',
    'governance',
    'active',
    2847,
    892,
    (NOW() + INTERVAL '5 days'),
    'system-user-id',
    NOW() - INTERVAL '2 days'
  ),
  (
    'b2c3d4e5-f6g7-8h9i-0j1k-l2m3n4o5p6q7',
    'Mise en place d''un système de vote électronique sécurisé',
    'Développement et déploiement d''une plateforme de vote électronique utilisant la technologie blockchain pour garantir la transparence et la sécurité des élections au sein de la DAO. Le système inclurait une vérification d''identité décentralisée et un audit trail complet.',
    'development',
    'passed',
    4521,
    678,
    NOW() - INTERVAL '1 day',
    'system-user-id',
    NOW() - INTERVAL '7 days'
  ),
  (
    'c3d4e5f6-g7h8-9i0j-1k2l-m3n4o5p6q7r8',
    'Allocation de fonds pour la recherche sur l''IA éthique',
    'Attribution de 2 millions d''euros du trésor de la DAO pour financer un programme de recherche de 3 ans sur le développement d''intelligence artificielle éthique et responsable. Ce programme sera mené en partenariat avec des universités internationales.',
    'treasury',
    'active',
    1923,
    1456,
    (NOW() + INTERVAL '3 days'),
    'system-user-id',
    NOW() - INTERVAL '1 day'
  ),
  (
    'd4e5f6g7-h8i9-0j1k-2l3m-n4o5p6q7r8s9',
    'Création d''un programme d''éducation numérique globale',
    'Lancement d''une initiative éducative mondiale pour enseigner les technologies décentralisées, la gouvernance démocratique et les droits numériques. Le programme toucherait initialement 100,000 étudiants dans 50 pays.',
    'general',
    'rejected',
    987,
    3456,
    NOW() - INTERVAL '3 days',
    'system-user-id',
    NOW() - INTERVAL '10 days'
  );

-- Update proposal voting ends dates to be more realistic
UPDATE dao_proposals 
SET voting_ends_at = CASE 
  WHEN status = 'active' THEN (created_at + INTERVAL '7 days')
  WHEN status = 'passed' OR status = 'rejected' THEN (created_at + INTERVAL '7 days')
  ELSE voting_ends_at
END
WHERE id IN (
  'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
  'b2c3d4e5-f6g7-8h9i-0j1k-l2m3n4o5p6q7',
  'c3d4e5f6-g7h8-9i0j-1k2l-m3n4o5p6q7r8',
  'd4e5f6g7-h8i9-0j1k-2l3m-n4o5p6q7r8s9'
);