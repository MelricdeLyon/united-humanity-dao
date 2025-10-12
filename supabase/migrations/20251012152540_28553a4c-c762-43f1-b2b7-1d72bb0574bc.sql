-- Fix SECURITY DEFINER issue by removing it from functions that don't need it

-- Check and fix get_my_full_profile function
CREATE OR REPLACE FUNCTION public.get_my_full_profile()
RETURNS TABLE(
  id uuid,
  username text,
  full_name text,
  avatar_url text,
  bio text,
  location text,
  website_url text,
  cover_image_url text,
  birth_date date,
  current_badge text,
  privacy_level text,
  is_verified boolean,
  followers_count integer,
  following_count integer,
  posts_count integer,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  badge_earned_at timestamp with time zone
)
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT 
    p.id,
    p.username,
    p.full_name,
    p.avatar_url,
    p.bio,
    p.location,
    p.website_url,
    p.cover_image_url,
    p.birth_date,
    p.current_badge,
    p.privacy_level,
    p.is_verified,
    p.followers_count,
    p.following_count,
    p.posts_count,
    p.created_at,
    p.updated_at,
    p.badge_earned_at
  FROM public.profiles p
  WHERE p.id = auth.uid();
$$;

-- Fix get_public_profile function
CREATE OR REPLACE FUNCTION public.get_public_profile(target_user_id uuid)
RETURNS TABLE(
  id uuid,
  username text,
  avatar_url text,
  cover_image_url text,
  bio text,
  current_badge text,
  is_verified boolean,
  followers_count integer,
  following_count integer,
  posts_count integer,
  privacy_level text
)
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT 
    p.id,
    p.username,
    p.avatar_url,
    p.cover_image_url,
    p.bio,
    p.current_badge,
    p.is_verified,
    p.followers_count,
    p.following_count,
    p.posts_count,
    p.privacy_level
  FROM public.profiles p
  WHERE p.id = target_user_id
    AND (
      p.privacy_level = 'public'
      OR p.id = auth.uid()
      OR (
        p.privacy_level = 'friends'
        AND EXISTS (
          SELECT 1 FROM user_follows f1
          WHERE f1.follower_id = auth.uid() AND f1.following_id = p.id
        )
        AND EXISTS (
          SELECT 1 FROM user_follows f2
          WHERE f2.follower_id = p.id AND f2.following_id = auth.uid()
        )
      )
    );
$$;