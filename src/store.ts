import { create } from 'zustand';
import { TestState, UserDetails } from './types';

export const useTestStore = create<TestState>((set) => ({
  currentStep: 'loading',
  currentQuestionIndex: 0,
  answers: {},
  gclid: new URLSearchParams(window.location.search).get('gclid') || '',
  quizId: '',

  setStep: (step) => set({ currentStep: step }),
  setAnswer: (questionIndex, answerIndex) =>
    set((state) => {
      // Store the answer
      const newAnswers = { ...state.answers, [questionIndex]: answerIndex };
      
      // Move to next question
      const nextIndex = state.currentQuestionIndex + 1;
      
      return {
        answers: newAnswers,
        currentQuestionIndex: nextIndex,
      };
    }),
  startTest: () => set({ 
    currentStep: 'test', 
    currentQuestionIndex: 0,
    answers: {} 
  }),
  setUserDetails: (details: UserDetails) => set({ userDetails: details }),
  setQuizId: (id: string) => set({ quizId: id }),
}));