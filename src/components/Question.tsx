import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTestStore } from '../store';
import { questions } from '../questions';
import { Heart } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export const Question: React.FC = () => {
  const { currentQuestionIndex, setAnswer, setStep } = useTestStore();
  const startTime = React.useRef(Date.now());
  const [lastInteractionTime, setLastInteractionTime] = React.useState(Date.now());
  const [hesitationPoints, setHesitationPoints] = React.useState<number[]>([]);
  const [scrollUpCount, setScrollUpCount] = React.useState(0);
  const [lastScrollPosition, setLastScrollPosition] = React.useState(0);

  React.useEffect(() => {
    // Track scroll behavior
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;
      if (currentPosition < lastScrollPosition) {
        setScrollUpCount(prev => prev + 1);
      }
      setLastScrollPosition(currentPosition);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollPosition]);
  
  React.useEffect(() => {
    if (currentQuestionIndex >= questions.length) {
      setStep('final-details');
      return;
    }

    // Track progress at key points (25%, 50%, 75%, 100%)
    const progress = (currentQuestionIndex / questions.length) * 100;
    const progressPoints = [25, 50, 75, 100];
    
    if (progressPoints.includes(progress)) {
      const timeOnPage = Math.floor((Date.now() - startTime.current) / 1000);
      const scrollDepth = Math.round((window.pageYOffset + window.innerHeight) / document.documentElement.scrollHeight * 100);

      trackEvent('quiz_progress', {
        progress: progress,
        questions_completed: currentQuestionIndex,
        total_questions: questions.length,
        event_label: `Progress ${progress}%`,
        value: progress,
        time_on_page: timeOnPage,
        scroll_depth: scrollDepth,
        hesitation_points: hesitationPoints.length,
        scroll_up_count: scrollUpCount,
        completion_rate: (currentQuestionIndex / questions.length) * 100,
        average_time_per_question: timeOnPage / currentQuestionIndex
      });
    }
  }, [currentQuestionIndex, setStep, hesitationPoints.length, scrollUpCount]);

  const handleAnswer = (index: number) => {
    const currentTime = Date.now();
    const timeSinceLastInteraction = currentTime - lastInteractionTime;
    
    // Track hesitation points (pauses over 3 seconds)
    if (timeSinceLastInteraction > 3000) {
      setHesitationPoints(prev => [...prev, timeSinceLastInteraction]);
    }
    
    setLastInteractionTime(currentTime);

    const question = questions[currentQuestionIndex];
    const timeOnPage = Math.floor((currentTime - startTime.current) / 1000);
    
    trackEvent('quiz_answer', {
      question_index: currentQuestionIndex,
      question_type: question.type,
      question_text: question.question,
      answer_index: index,
      answer_text: question.options[index],
      progress_percentage: ((currentQuestionIndex + 1) / questions.length) * 100,
      event_label: `Q${currentQuestionIndex + 1} - ${question.type}`,
      time_taken: timeSinceLastInteraction,
      hesitation_points: hesitationPoints.length,
      time_on_page: timeOnPage,
      scroll_up_count: scrollUpCount,
      non_interaction: false
    });

    setAnswer(currentQuestionIndex, index);
  };

  if (currentQuestionIndex >= questions.length) {
    return null;
  }

  const question = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ff6b6b] to-[#7f4ca5] p-6 overflow-hidden">
      <div className="max-w-3xl mx-auto mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-white/80 font-rubik">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span className="text-sm text-white/80 font-rubik capitalize px-3 py-1 bg-white/10 rounded-full">
                  {question.type}
                </span>
              </div>
              <h2 className="text-2xl font-rubik font-medium text-white mb-8">
                {question.question}
              </h2>
            </div>

            <div className="space-y-4">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full text-left p-4 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all duration-200 font-rubik hover:scale-[1.02]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"
              initial={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
              animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex items-center justify-center mt-4">
            <Heart className="w-4 h-4 text-pink-300 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};