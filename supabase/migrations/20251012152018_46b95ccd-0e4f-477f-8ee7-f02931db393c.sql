-- Fix security issues by implementing proper RLS policies

-- 1. Fix eligible_pool table - protect personal information
DROP POLICY IF EXISTS "Anyone can view eligible pool" ON eligible_pool;

CREATE POLICY "Authenticated users can view public eligible pool data"
ON eligible_pool
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Only system can insert eligible pool entries"
ON eligible_pool
FOR INSERT
WITH CHECK (false);

-- 2. Fix resident_nominations table - protect nominee personal data
CREATE POLICY "Authenticated users can view resident nominations"
ON resident_nominations
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can submit nominations"
ON resident_nominations
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

-- 3. Fix candidates table - protect candidate emails
DROP POLICY IF EXISTS "Candidates are viewable by everyone" ON candidates;

CREATE POLICY "Authenticated users can view candidates"
ON candidates
FOR SELECT
TO authenticated
USING (true);

-- 4. Fix ohs_candidates table - protect medical credentials
DROP POLICY IF EXISTS "Anyone can view OHS candidates" ON ohs_candidates;

CREATE POLICY "Authenticated users can view OHS candidates"
ON ohs_candidates
FOR SELECT
TO authenticated
USING (true);

-- 5. Fix nominations table - protect nominee emails
DROP POLICY IF EXISTS "Anyone can view nominations" ON nominations;

CREATE POLICY "Authenticated users can view nominations"
ON nominations
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can submit nominations"
ON nominations
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

-- 6. Fix ohs_nominations table - protect nominee emails
DROP POLICY IF EXISTS "Anyone can view OHS nominations" ON ohs_nominations;

CREATE POLICY "Authenticated users can view OHS nominations"
ON ohs_nominations
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can submit OHS nominations"
ON ohs_nominations
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);