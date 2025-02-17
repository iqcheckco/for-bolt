import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Lock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';

export const Results: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/loading-results');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-[#ff6b6b] to-[#7f4ca5] flex items-center justify-center p-4"
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl w-full border border-white/20 text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-pink-300" />
          </div>
          <h1 className="text-3xl font-rubik font-bold mb-4 text-white">Your Soulmate Awaits!</h1>
          <p className="text-white/80">
            We've discovered incredible insights about your perfect match. Enter your email to unlock your comprehensive soulmate reading.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Your Reading Includes:</h2>
          <ul className="text-white/80 space-y-3">
            <li className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-300" />
              Your Soulmate's First Initial
            </li>
            <li className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-300" />
              Your Primary Love Language
            </li>
            <li className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-300" />
              Detailed Personality Analysis
            </li>
            <li className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-300" />
              Glimpse of Your Destined Partner
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-white/40 transition-colors duration-200 outline-none font-rubik text-white placeholder-white/60"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white hover:bg-white/95 text-[#ff6b6b] font-rubik font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105"
          >
            Unlock Your Soulmate Reading
            <ArrowRight className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-center gap-2 text-sm text-white/60">
            <Lock className="w-4 h-4" />
            <p className="font-rubik">Your reading is private and confidential</p>
          </div>
        </form>
      </div>
    </motion.div>
  );
};