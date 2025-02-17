import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, Sparkles, Users, ChevronDown, Star, Clock, Eye, Lock } from 'lucide-react';
import { Logo } from './Logo';

const faqItems = [
  {
    question: "How accurate is the quiz?",
    answer: "Our algorithm uses advanced personality analysis and compatibility metrics, combining ancient wisdom with modern psychology to provide highly accurate soulmate insights."
  },
  {
    question: "How long does the quiz take?",
    answer: "The quiz contains 50 thoughtfully crafted questions and takes about 6-7 minutes to complete. Take your time to answer each one carefully - your responses help us reveal deep insights about your ideal soulmate match."
  },
  {
    question: "What will I receive?",
    answer: "You'll receive a comprehensive report including your soulmate's first initial, detailed personality traits, and a unique glimpse of your destined partner."
  },
  {
    question: "Is my information private?",
    answer: "Absolutely. We take privacy seriously and use bank-level encryption to protect your personal information. Your responses are completely confidential."
  },
  {
    question: "When will I receive my results?",
    answer: "Your complete soulmate results are available instantly after completing the quiz."
  }
];

export const LandingPage: React.FC = () => {
  useEffect(() => {
    document.title = 'The Soulmate Quiz - Find Your Perfect Match';
  }, []);

  const navigate = useNavigate();
  const [activeUsers, setActiveUsers] = useState(Math.floor(Math.random() * (150 - 120) + 120));
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const change = Math.random() < 0.5 ? -1 : 1;
      setActiveUsers(current => {
        const newCount = current + change;
        return newCount >= 100 && newCount <= 200 ? newCount : current;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <Logo />
          </div>
        </div>
      </header>

      <div className="flex-1 bg-gradient-to-br from-[#ff6b6b] to-[#7f4ca5]">
        <div className="md:mt-8 mt-10 flex justify-center">
          <div className="bg-white/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-full px-4 py-2 md:py-3 md:px-6 flex items-center gap-2 text-white border border-white/[0.08] transition-all duration-300 hover:bg-white/[0.12] mb-4 md:mb-0">
            <Users className="w-5 h-5" />
            <span className="font-medium text-[13px] md:text-base">
              <span className="font-semibold">{activeUsers}</span>
              <span className="opacity-90 ml-2">People Finding Their Soulmate</span>
            </span>
          </div>
        </div>

        <main className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-white mb-6 mt-[9px] md:mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="md:hidden leading-relaxed">Discover Your<br /></span>
                <span className="hidden md:inline">Discover Your </span>
                <span className="bg-gradient-to-r from-white via-pink-100 to-white text-transparent bg-clip-text">
                  True Soulmate
                </span>
              </motion.h1>

              <motion.p
                className="text-[18px] md:text-xl text-white/90 mb-8 md:whitespace-nowrap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="md:inline hidden">Ancient wisdom meets modern science to reveal your soulmate</span>
                <span className="md:hidden">
                  Ancient wisdom meets modern<br />
                  science to reveal your soulmate
                </span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-4"
              >
                <button
                  onClick={() => navigate('/test')}
                  className="bg-white hover:bg-white/95 text-[#ff6b6b] font-bold py-4 px-12 rounded-full text-lg shadow-lg transition-all duration-200 mx-auto hover:scale-105"
                >
                  Take The Quiz
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center justify-center gap-2 text-white/90 mb-12"
              >
                <Clock className="w-4 h-4" />
                <span className="text-sm">Takes Just 6-7 Minutes</span>
              </motion.div>
            </div>

            <motion.div 
              className="mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-semibold text-white mb-6 text-center">What You'll Discover</h3>
                <ul className="space-y-6 text-left">
                  <li className="flex items-start gap-4">
                    <Eye className="w-6 h-6 text-purple-300 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-medium text-white mb-2">Soulmate Image</h4>
                      <p className="text-white/90">Experience a powerful visual preview of your soulmate.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Heart className="w-6 h-6 text-pink-300 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-medium text-white mb-2">First Initial</h4>
                      <p className="text-white/90">Reveal the first letter of your soulmate's name.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Star className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-medium text-white mb-2">Personality Profile</h4>
                      <p className="text-white/90">Uncover deep insights about your soulmate's personality.</p>
                    </div>
                  </li>
                </ul>

                <div className="mt-8 text-center">
                  <div>
                    <button
                      onClick={() => navigate('/test')}
                      className="bg-white hover:bg-white/95 text-[#ff6b6b] font-bold py-4 px-12 rounded-full text-lg shadow-lg transition-all duration-200 mx-auto hover:scale-105 mb-4"
                    >
                      Take The Quiz
                    </button>
                    <div className="flex items-center justify-center gap-2 text-white/90">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-sm">50 Multiple-Choice Questions</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="text-2xl font-semibold text-white mb-6 text-center">
                Soulmate Image Examples
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <img 
                    src="https://assets.zyrosite.com/mnlqVelL4btke54l/1-mP42K9LKw8hXOLJL.webp"
                    alt="Soulmate Example 1"
                    className="w-full h-auto rounded-xl shadow-lg"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                    <p className="text-white font-semibold">First Initial: K</p>
                  </div>
                </motion.div>
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <img 
                    src="https://assets.zyrosite.com/mnlqVelL4btke54l/2-AVL1K9XeMvHpoLJB.webp"
                    alt="Soulmate Example 2"
                    className="w-full h-auto rounded-xl shadow-lg"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                    <p className="text-white font-semibold">First Initial: M</p>
                  </div>
                </motion.div>
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <img 
                    src="https://assets.zyrosite.com/mnlqVelL4btke54l/3-m2Wa0jk2apCVEN9b.webp"
                    alt="Soulmate Example 3"
                    className="w-full h-auto rounded-xl shadow-lg"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                    <p className="text-white font-semibold">First Initial: J</p>
                  </div>
                </motion.div>
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <img 
                    src="https://assets.zyrosite.com/mnlqVelL4btke54l/4-A3QOkN4D9ztLk4jv.webp"
                    alt="Soulmate Example 4"
                    className="w-full h-auto rounded-xl shadow-lg"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                    <p className="text-white font-semibold">First Initial: R</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="text-center">
                <button
                  onClick={() => navigate('/test')}
                  className="bg-white hover:bg-white/95 text-[#ff6b6b] font-bold py-4 px-12 rounded-full text-lg shadow-lg transition-all duration-200 mx-auto hover:scale-105 mb-4"
                >
                  Take The Quiz
                </button>
                <div className="flex items-center justify-center gap-2 text-white/90">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm">Reveal Your Soulmate</span>
                </div>
              </div>
            </motion.div>

            <motion.section 
              className="text-left mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h2 className="text-2xl font-semibold text-white text-center mb-6">Common Questions</h2>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div 
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden border border-white/20"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full px-6 py-4 flex items-center justify-between text-white hover:bg-white/5 transition-colors text-left"
                    >
                      <span className="font-medium">{item.question}</span>
                      <ChevronDown 
                        className={`w-5 h-5 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <motion.div
                      initial={false}
                      animate={{ height: openFaq === index ? 'auto' : 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 py-4 text-white/80">
                        {item.answer}
                      </p>
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <div className="text-center">
                <button
                  onClick={() => navigate('/test')}
                  className="bg-white hover:bg-white/95 text-[#ff6b6b] font-bold py-4 px-12 rounded-full text-lg shadow-lg transition-all duration-200 mx-auto hover:scale-105 mb-4"
                >
                  Take The Quiz
                </button>
                <div className="flex items-center justify-center gap-2 text-white/90">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">Over 1M Tests Taken</span>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-6">
            <div>
              <Logo textClassName="text-2xl font-semibold bg-gradient-to-r from-[#ff6b6b] to-[#7f4ca5] text-transparent bg-clip-text tracking-tight" />
            </div>
            <div className="flex items-center justify-center gap-6">
              <Link to="/terms" className="text-[12px] text-[#ff6b6b] hover:text-[#7f4ca5] transition-colors underline">Terms</Link>
              <Link to="/privacy" className="text-[12px] text-[#ff6b6b] hover:text-[#7f4ca5] transition-colors underline">Privacy</Link>
              <a 
                href="mailto:info@thesoulmatequiz.com?subject=Question about The Soulmate Quiz" 
                className="text-[12px] text-[#ff6b6b] hover:text-[#7f4ca5] transition-colors underline"
              >
                Contact
              </a>
            </div>
            <div className="text-[12px] text-[#ff6b6b] text-center">
              © 2025 - The Soulmate Quiz - All Rights Reserved
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};