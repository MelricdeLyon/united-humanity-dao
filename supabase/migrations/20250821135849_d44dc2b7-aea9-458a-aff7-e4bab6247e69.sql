-- Insert example proposals for better UX demonstration
INSERT INTO dao_proposals (
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
    'Augmentation du budget du département Paix & Sécurité',
    'Proposition d''augmenter le budget du département Paix & Sécurité de 30% pour renforcer les missions de médiation internationale et développer de nouveaux programmes de résolution de conflits. Cette augmentation permettrait de recruter 5 médiateurs supplémentaires et de créer un fonds d''urgence pour les interventions rapides.',
    'governance',
    'active',
    2847,
    892,
    (NOW() + INTERVAL '5 days'),
    gen_random_uuid(),
    NOW() - INTERVAL '2 days'
  ),
  (
    'Mise en place d''un système de vote électronique sécurisé',
    'Développement et déploiement d''une plateforme de vote électronique utilisant la technologie blockchain pour garantir la transparence et la sécurité des élections au sein de la DAO. Le système inclurait une vérification d''identité décentralisée et un audit trail complet.',
    'development',
    'passed',
    4521,
    678,
    NOW() - INTERVAL '1 day',
    gen_random_uuid(),
    NOW() - INTERVAL '7 days'
  ),
  (
    'Allocation de fonds pour la recherche sur l''IA éthique',
    'Attribution de 2 millions d''euros du trésor de la DAO pour financer un programme de recherche de 3 ans sur le développement d''intelligence artificielle éthique et responsable. Ce programme sera mené en partenariat avec des universités internationales.',
    'treasury',
    'active',
    1923,
    1456,
    (NOW() + INTERVAL '3 days'),
    gen_random_uuid(),
    NOW() - INTERVAL '1 day'
  ),
  (
    'Création d''un programme d''éducation numérique globale',
    'Lancement d''une initiative éducative mondiale pour enseigner les technologies décentralisées, la gouvernance démocratique et les droits numériques. Le programme toucherait initialement 100,000 étudiants dans 50 pays.',
    'general',
    'rejected',
    987,
    3456,
    NOW() - INTERVAL '3 days',
    gen_random_uuid(),
    NOW() - INTERVAL '10 days'
  );