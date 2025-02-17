import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTestStore } from '../store';
import { Heart, Sparkles } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  const { setStep } = useTestStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setStep('instructions');
    }, 2000);

    return () => clearTimeout(timer);
  }, [setStep]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-[#ff6b6b] to-[#7f4ca5] flex flex-col items-center justify-center text-center text-white"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ 
          repeat: Infinity,
          duration: 2
        }}
      >
        <Heart className="w-16 h-16 mb-8 text-pink-300" />
      </motion.div>
      <h1 className="text-3xl font-rubik font-bold mb-8">Preparing Your Quiz</h1>
      <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-400 to-purple-400"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2 }}
        />
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Sparkles className="w-5 h-5 text-yellow-300" />
        <p className="text-white/80 text-base">Connecting to the universe...</p>
      </div>
    </motion.div>
  );
};