export interface Question {
  id: number;
  type: 'personality' | 'values' | 'lifestyle' | 'emotions';
  question: string;
  options: string[];
}

export interface UserDetails {
  firstName: string;
  birthYear: string;
  zodiacSign: string;
  interestedIn: string;
  email: string;
  quizId?: string;  // Add quiz ID to user details
}

export interface TestState {
  currentStep: 'loading' | 'instructions' | 'test' | 'final-details' | 'calculating' | 'results';
  currentQuestionIndex: number;
  answers: Record<number, number>;
  gclid: string;
  quizId: string;
  userDetails?: UserDetails;
  setStep: (step: TestState['currentStep']) => void;
  setAnswer: (questionIndex: number, answerIndex: number) => void;
  startTest: () => void;
  setUserDetails: (details: UserDetails) => void;
  setQuizId: (id: string) => void;
}

export interface GoogleAdsEvent {
  send_to: string;
  user_timing_category: string;
  value?: number;
  currency?: string;
  transaction_id?: string;
}

export interface GoogleAdsEvents {
  start_quiz: GoogleAdsEvent;
  complete_quiz: GoogleAdsEvent;
  view_results: GoogleAdsEvent;
  begin_checkout: GoogleAdsEvent;
  quiz_progress: GoogleAdsEvent;
  quiz_answer: GoogleAdsEvent;
}