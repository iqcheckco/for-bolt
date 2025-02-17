import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, User, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Logo } from './Logo';

interface QuizResult {
  first_name: string;
  soulmate_initial: string;
  soulmate_star_sign: string;
  soulmate_image_url: string;
  personality_profile: string;
  personality_description: string;
}

export const ResultsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const { data, error } = await supabase
          .from('quiz_results')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        if (!data) throw new Error('No results found');

        setResult(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load results');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#ff6b6b] to-[#7f4ca5] flex items-center justify-center">
        <div className="text-white text-center">
          <Heart className="w-12 h-12 mx-auto mb-4 animate-pulse" />
          <p>Loading your soulmate results...</p>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#ff6b6b] to-[#7f4ca5] flex items-center justify-center">
        <div className="text-white text-center max-w-md mx-auto px-4">
          <Heart className="w-12 h-12 mx-auto mb-4 text-pink-300" />
          <h2 className="text-2xl font-bold mb-4">Results Not Found</h2>
          <p>We couldn't find the soulmate results you're looking for.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ff6b6b] to-[#7f4ca5]">
      <header className="bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <Logo />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-white mb-4">
              {result.first_name}'s Soulmate Reading
            </h1>
            <p className="text-white/90 text-lg">
              Here's what the universe has revealed about your perfect match
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="aspect-square rounded-xl overflow-hidden mb-6">
                <img 
                  src={result.soulmate_image_url} 
                  alt="Your Soulmate" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <User className="w-6 h-6 text-pink-300 mx-auto mb-2" />
                  <p className="text-white/80 text-sm mb-1">First Initial</p>
                  <p className="text-white text-2xl font-bold">{result.soulmate_initial}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <Star className="w-6 h-6 text-yellow-300 mx-auto mb-2" />
                  <p className="text-white/80 text-sm mb-1">Star Sign</p>
                  <p className="text-white text-2xl font-bold">{result.soulmate_star_sign}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-yellow-300" />
                <h2 className="text-xl font-semibold text-white">Personality Profile</h2>
              </div>
              <h3 className="text-lg font-medium text-white mb-4">
                {result.personality_profile}
              </h3>
              <p className="text-white/90 leading-relaxed text-justify">
                {result.personality_description}
              </p>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};