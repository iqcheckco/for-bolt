import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTestStore } from './store';
import { initializeGoogleAds } from './utils/analytics';
import { LandingPage } from './components/LandingPage';
import { LoadingScreen } from './components/LoadingScreen';
import { Instructions } from './components/Instructions';
import { Question } from './components/Question';
import { CalculatingScreen } from './components/CalculatingScreen';
import { Results } from './components/Results';
import { LoadingResults } from './components/LoadingResults';
import { SalesPage } from './components/SalesPage';
import { Terms } from './components/Terms';
import { Privacy } from './components/Privacy';
import { FinalDetails } from './components/FinalDetails';
import { ScrollToTop } from './components/ScrollToTop';
import { ResultsPage } from './components/ResultsPage';

function TestFlow() {
  const { currentStep, gclid } = useTestStore();

  useEffect(() => {
    // Initialize Google Ads with GCLID
    initializeGoogleAds(gclid);

    const titles = {
      loading: 'Loading... | The Soulmate Quiz',
      instructions: 'Instructions | The Soulmate Quiz',
      test: 'Quiz Session | The Soulmate Quiz',
      'final-details': 'Almost There | The Soulmate Quiz',
      calculating: 'Analyzing Results | The Soulmate Quiz',
      results: 'Your Results | The Soulmate Quiz'
    };
    document.title = titles[currentStep];
  }, [currentStep, gclid]);

  return (
    <div className="min-h-screen">
      {currentStep === 'loading' && <LoadingScreen />}
      {currentStep === 'instructions' && <Instructions />}
      {currentStep === 'test' && <Question />}
      {currentStep === 'final-details' && <FinalDetails />}
      {currentStep === 'calculating' && <CalculatingScreen />}
      {currentStep === 'results' && <Results />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/test" element={<TestFlow />} />
        <Route path="/loading-results" element={<LoadingResults />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/results/:id" element={<ResultsPage />} />
        {/* Development route - only works in development mode */}
        {import.meta.env.DEV && (
          <Route 
            path="/dev/sales" 
            element={
              <SalesPage />
            } 
          />
        )}
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;