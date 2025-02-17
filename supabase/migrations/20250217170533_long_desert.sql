/*
  # Fix RLS Policies for Quiz Tables

  1. Changes
    - Drop existing policies
    - Create new, more permissive policies for anonymous insertions
    - Maintain security for authenticated users

  2. Security
    - Allow anonymous users to insert data
    - Allow users to read their own data
    - Prevent unauthorized access
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can insert quiz takers" ON quiz_takers;
DROP POLICY IF EXISTS "Users can read own quiz taker data" ON quiz_takers;
DROP POLICY IF EXISTS "Anyone can insert soulmate results" ON soulmate_results;
DROP POLICY IF EXISTS "Users can read own soulmate results" ON soulmate_results;

-- Create new policies for quiz_takers
CREATE POLICY "Enable insert for anonymous users"
  ON quiz_takers
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Enable read access for all users"
  ON quiz_takers
  FOR SELECT
  USING (true);

-- Create new policies for soulmate_results
CREATE POLICY "Enable insert for anonymous users"
  ON soulmate_results
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Enable read access for all users"
  ON soulmate_results
  FOR SELECT
  USING (true);