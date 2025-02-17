import React from 'react';
import { motion } from 'framer-motion';
import { useTestStore } from '../store';
import { Heart, Clock, Sparkles } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export const Instructions: React.FC = () => {
  const { startTest } = useTestStore();

  const handleStartTest = () => {
    trackEvent('start_quiz');
    startTest();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-[#ff6b6b] to-[#7f4ca5] flex items-center justify-center p-4"
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl w-full border border-white/20">
        <div className="flex items-center gap-3 mb-6">
          <Heart className="w-8 h-8 text-pink-300" />
          <h1 className="md:text-3xl text-2xl font-rubik font-bold text-white">Are You Ready?</h1>
        </div>

        <div className="space-y-6 mb-8">
          <div className="flex items-start gap-3">
            <Clock className="w-6 h-6 text-white flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-rubik font-semibold text-lg mb-1 text-white">Take Your Time</h2>
              <p className="text-white/80">Take as much time as you need to answer thoughtfully.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Sparkles className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-rubik font-semibold text-lg mb-1 text-white">Be Truthful</h2>
              <p className="text-white/80">Consider each question carefully, your answers shape your soulmate reading.</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleStartTest}
          className="w-full bg-white hover:bg-white/95 text-[#ff6b6b] font-rubik font-medium py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105"
        >
          Start Now
        </button>
      </div>
    </motion.div>
  );
};