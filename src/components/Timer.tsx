import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useTestStore } from '../store';

export const Timer: React.FC = () => {
  const { timeRemaining, updateTime, setStep } = useTestStore();

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeRemaining > 0) {
        updateTime(timeRemaining - 1);
      } else {
        setStep('calculating');
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, updateTime, setStep]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="fixed top-4 right-4 bg-white/10 backdrop-blur-sm shadow-lg rounded-full px-4 py-2 flex items-center gap-2 text-white border border-white/20">
      <Clock className="w-5 h-5 text-pink-300" />
      <span className="font-rubik font-medium">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
};