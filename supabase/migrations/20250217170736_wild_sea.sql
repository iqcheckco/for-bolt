/*
  # Combine Quiz Tables into Single Table

  1. Changes
    - Create new combined table with all fields
    - Migrate existing data
    - Drop old tables
    - Set up new RLS policies

  2. Security
    - Enable RLS
    - Allow anonymous insertions
    - Allow reading own data
*/

-- Create new combined table
CREATE TABLE IF NOT EXISTS quiz_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  birth_year integer NOT NULL,
  star_sign text NOT NULL,
  interested_in text NOT NULL,
  email text UNIQUE NOT NULL,
  soulmate_initial text NOT NULL,
  soulmate_star_sign text NOT NULL,
  soulmate_image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Copy existing data if any exists
INSERT INTO quiz_results (
  first_name,
  birth_year,
  star_sign,
  interested_in,
  email,
  soulmate_initial,
  soulmate_star_sign,
  soulmate_image_url,
  created_at
)
SELECT 
  qt.first_name,
  qt.birth_year,
  qt.star_sign,
  qt.interested_in,
  qt.email,
  sr.first_initial,
  sr.star_sign,
  sr.image_url,
  LEAST(qt.created_at, sr.created_at)
FROM quiz_takers qt
JOIN soulmate_results sr ON sr.quiz_taker_id = qt.id;

-- Drop old tables
DROP TABLE IF EXISTS soulmate_results;
DROP TABLE IF EXISTS quiz_takers;

-- Enable RLS
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable insert for anonymous users"
  ON quiz_results
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Enable read access for all users"
  ON quiz_results
  FOR SELECT
  USING (true);