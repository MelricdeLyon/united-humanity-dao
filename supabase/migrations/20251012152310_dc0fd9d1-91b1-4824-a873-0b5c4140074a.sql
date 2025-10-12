-- Fix security issues - drop existing policies first

-- Drop all existing profiles policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Public profiles viewable by authenticated users" ON profiles;
DROP POLICY IF EXISTS "Friends profiles viewable by authenticated users" ON profiles;

-- Create correct policies for profiles table
CREATE POLICY "Users can view own profile"
ON profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Public profiles viewable by authenticated users"
ON profiles
FOR SELECT
TO authenticated
USING (privacy_level = 'public');

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

-- Fix eligible_pool with a safe view
DROP VIEW IF EXISTS eligible_pool_safe CASCADE;

CREATE VIEW eligible_pool_safe AS
SELECT 
  id,
  person_name,
  CASE 
    WHEN COALESCE(email_protected, true) = true THEN NULL
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

GRANT SELECT ON eligible_pool_safe TO authenticated;
GRANT SELECT ON eligible_pool_safe TO anon;