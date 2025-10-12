-- Fix remaining security issues (corrected)

-- 1. Fix profiles table - restrict access based on privacy settings
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
ON profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Users can view public profiles
CREATE POLICY "Public profiles viewable by authenticated users"
ON profiles
FOR SELECT
TO authenticated
USING (privacy_level = 'public');

-- Users can view friends profiles (mutual follow)
CREATE POLICY "Friends profiles viewable by authenticated users"
ON profiles
FOR SELECT
TO authenticated
USING (
  privacy_level = 'friends' AND (
    id = auth.uid() OR
    (EXISTS (
      SELECT 1 FROM user_follows f1
      WHERE f1.follower_id = auth.uid() AND f1.following_id = profiles.id
    ) AND EXISTS (
      SELECT 1 FROM user_follows f2
      WHERE f2.follower_id = profiles.id AND f2.following_id = auth.uid()
    ))
  )
);

-- 2. Fix eligible_pool - drop and recreate view with email masking
DROP VIEW IF EXISTS eligible_pool_safe CASCADE;

CREATE VIEW eligible_pool_safe AS
SELECT 
  id,
  person_name,
  CASE 
    WHEN email_protected = true OR email_protected IS NULL THEN NULL
    ELSE person_email
  END as person_email,
  person_bio,
  organization_type,
  position_type,
  nomination_count,
  validation_score,
  is_eligible,
  email_protected,
  created_at,
  updated_at
FROM eligible_pool;

-- Grant access to the safe view
GRANT SELECT ON eligible_pool_safe TO authenticated;
GRANT SELECT ON eligible_pool_safe TO anon;