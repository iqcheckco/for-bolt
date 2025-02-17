/*
  # Add personality profiles to quiz results

  1. Changes
    - Add personality_profile column to quiz_results table
    - Add personality_description column to quiz_results table

  2. Security
    - Maintains existing RLS policies
*/

-- Add new columns to quiz_results table
ALTER TABLE quiz_results 
ADD COLUMN IF NOT EXISTS personality_profile text NOT NULL DEFAULT 'The Adventurous Free Spirit',
ADD COLUMN IF NOT EXISTS personality_description text NOT NULL DEFAULT 'Loves traveling, exploring new cultures, and spontaneous road trips. Always seeking the next thrill, from skydiving to hiking remote trails. Open-minded, passionate, and never afraid to try something new. Prefers deep, philosophical conversations over small talk.';