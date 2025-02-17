import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, Star, Brain, Scan, Wand2, Hourglass } from 'lucide-react';
import { useTestStore } from '../store';

const steps = [
  {
    icon: Brain,
    text: "Analyzing personality patterns...",
    duration: 2000
  },
  {
    icon: Star,
    text: "Calculating cosmic alignments...",
    duration: 2500
  },
  {
    icon: Scan,
    text: "Generating soulmate image...",
    duration: 3000
  },
  {
    icon: Wand2,
    text: "Preparing your personalized results...",
    duration: 3000
  }
];

export const CalculatingScreen: React.FC = () => {
  const navigate = useNavigate();
  const { userDetails } = useTestStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;

    const startProgress = () => {
      let currentProgress = 0;
      progressInterval = setInterval(() => {
        currentProgress += 0.75;
        if (currentProgress <= 100) {
          setProgress(currentProgress);
        } else {
          clearInterval(progressInterval);
        }
      }, 100); // ~13-14 seconds total
    };

    const runSteps = async () => {
      startProgress();

      for (let i = 0; i < steps.length; i++) {
        await new Promise(resolve => {
          timeout = setTimeout(resolve, steps[i].duration);
        });
        setCurrentStep(i + 1);
      }

      // Wait for the final step to be visible
      await new Promise(resolve => {
        timeout = setTimeout(resolve, 1500);
      });

      navigate('/sales');
    };

    runSteps();

    return () => {
      clearTimeout(timeout);
      clearInterval(progressInterval);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ff6b6b] to-[#7f4ca5] p-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-3xl mx-auto mt-8 flex flex-col items-center justify-center text-white"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }}
          className="mb-8"
        >
          <Heart className="w-12 h-12 text-pink-300" />
        </motion.div>
        
        <h1 className="text-2xl font-rubik font-bold mb-8 text-center">
          Generating Your Results
        </h1>
        
        <div className="w-full max-w-md mb-8">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-400 to-purple-400"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 text-white/60 text-sm text-center">{Math.min(Math.round(progress), 100)}%</div>
        </div>

        <div className="space-y-4 w-full max-w-md">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isComplete = index < currentStep;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isActive || isComplete ? 1 : 0.5,
                  x: 0
                }}
                className={`flex items-start gap-3 p-4 rounded-lg ${
                  isActive ? 'bg-white/10' : 'bg-transparent'
                } transition-colors duration-300`}
              >
                <motion.div
                  animate={isActive ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  } : {}}
                  transition={{
                    repeat: isActive ? Infinity : 0,
                    duration: 2
                  }}
                  className={`${isActive ? 'text-yellow-300' : isComplete ? 'text-green-300' : 'text-white/60'} mt-0.5`}
                >
                  <step.icon className="w-5 h-5" />
                </motion.div>
                <div className="flex-1">
                  <span className={`${
                    isActive ? 'text-white' : isComplete ? 'text-white/80' : 'text-white/60'
                  } block text-left text-[13px] md:text-base`}>
                    {step.text}
                  </span>
                </div>
                {isComplete && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-green-300 mt-0.5"
                  >
                    <Sparkles className="w-4 h-4" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-8 flex items-center gap-2 text-white/60"
        >
          <Hourglass className="w-4 h-4 animate-spin" />
          <span className="text-sm">Please wait while we process your results...</span>
        </motion.div>
      </motion.div>
    </div>
  );
};