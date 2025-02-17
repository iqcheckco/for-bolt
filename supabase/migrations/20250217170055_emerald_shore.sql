/*
  # Quiz Database Schema

  1. New Tables
    - `quiz_takers`
      - `id` (uuid, primary key)
      - `first_name` (text)
      - `birth_year` (integer)
      - `star_sign` (text)
      - `interested_in` (text)
      - `email` (text, unique)
      - `created_at` (timestamp)
    
    - `soulmate_results`
      - `id` (uuid, primary key)
      - `quiz_taker_id` (uuid, foreign key)
      - `first_initial` (text)
      - `star_sign` (text)
      - `image_url` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to read their own data
    - Add policies for anon users to insert data
*/

-- Create quiz_takers table
CREATE TABLE IF NOT EXISTS quiz_takers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  birth_year integer NOT NULL,
  star_sign text NOT NULL,
  interested_in text NOT NULL,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create soulmate_results table
CREATE TABLE IF NOT EXISTS soulmate_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_taker_id uuid REFERENCES quiz_takers(id) NOT NULL,
  first_initial text NOT NULL,
  star_sign text NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE quiz_takers ENABLE ROW LEVEL SECURITY;
ALTER TABLE soulmate_results ENABLE ROW LEVEL SECURITY;

-- Policies for quiz_takers
CREATE POLICY "Anyone can insert quiz takers"
  ON quiz_takers
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Users can read own quiz taker data"
  ON quiz_takers
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

-- Policies for soulmate_results
CREATE POLICY "Anyone can insert soulmate results"
  ON soulmate_results
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Users can read own soulmate results"
  ON soulmate_results
  FOR SELECT
  TO authenticated
  USING (
    quiz_taker_id IN (
      SELECT id FROM quiz_takers 
      WHERE auth.uid()::text = id::text
    )
  );