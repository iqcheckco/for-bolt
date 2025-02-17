import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTestStore } from '../store';
import { Heart, Lock, Users, Calendar, Stars, Mail } from 'lucide-react';
import { ZodiacIcon } from './ZodiacIcon';
import { trackEvent } from '../utils/analytics';
import { submitQuizResults } from '../lib/supabase';

const zodiacSigns = [
  { name: 'Aries' },
  { name: 'Taurus' },
  { name: 'Gemini' },
  { name: 'Cancer' },
  { name: 'Leo' },
  { name: 'Virgo' },
  { name: 'Libra' },
  { name: 'Scorpio' },
  { name: 'Sagittarius' },
  { name: 'Capricorn' },
  { name: 'Aquarius' },
  { name: 'Pisces' }
];

const currentYear = new Date().getFullYear();

export const FinalDetails: React.FC = () => {
  const { setStep, setUserDetails, setQuizId } = useTestStore();
  const [formData, setFormData] = useState({
    firstName: '',
    birthYear: String(currentYear - 100),
    zodiacSign: '',
    interestedIn: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await submitQuizResults(formData);
      
      if (result.success) {
        trackEvent('complete_quiz');
        setUserDetails({
          ...formData,
          quizId: result.quizId
        });
        setQuizId(result.quizId);
        setStep('calculating');
      } else {
        // Handle error - you might want to show an error message to the user
        console.error('Failed to submit quiz results');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ff6b6b] to-[#7f4ca5] py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto px-4"
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-yellow-300" />
            </div>
            <h1 className="text-3xl font-bold text-white">Final Details</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="relative"
              >
                <label className="flex items-center gap-2 text-white mb-2">
                  <Users className="w-4 h-4" />
                  <span>First Name</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-white/40 transition-colors duration-200 outline-none text-white placeholder-white/60"
                  placeholder="Enter your first name"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <label className="flex items-center gap-2 text-white mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>Year of Birth</span>
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    name="birthYear"
                    min={currentYear - 100}
                    max={currentYear - 18}
                    value={formData.birthYear}
                    onChange={handleChange}
                    className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                  />
                  <div className="text-white/80 text-center">{formData.birthYear}</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <label className="flex items-center gap-2 text-white mb-2">
                  <Stars className="w-4 h-4" />
                  <span>Star Sign</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {zodiacSigns.map((sign) => (
                    <motion.button
                      key={sign.name}
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, zodiacSign: sign.name }));
                      }}
                      className={`relative p-3 rounded-lg border transition-all duration-200 ${
                        formData.zodiacSign === sign.name
                          ? 'bg-white/20 border-white'
                          : 'bg-white/10 border-white/20 hover:bg-white/15'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex flex-col items-center justify-center min-h-[60px]">
                        <ZodiacIcon sign={sign.name} className="w-6 h-6 mb-2" />
                        <div className="text-sm text-white text-center leading-tight">{sign.name}</div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <label className="flex items-center gap-2 text-white mb-2">
                  <Users className="w-4 h-4" />
                  <span>I'm Interested In</span>
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {['Men', 'Women', 'Both'].map((option) => (
                    <label
                      key={option}
                      className={`flex items-center justify-center px-4 py-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                        formData.interestedIn === option
                          ? 'bg-white/20 border-white'
                          : 'bg-white/10 border-white/20 hover:bg-white/15'
                      }`}
                    >
                      <input
                        type="radio"
                        name="interestedIn"
                        value={option}
                        checked={formData.interestedIn === option}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <span className="text-white">{option}</span>
                    </label>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="relative"
              >
                <label className="flex items-center gap-2 text-white mb-2">
                  <Mail className="w-4 h-4" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-white/40 transition-colors duration-200 outline-none text-white placeholder-white/60"
                  placeholder="Enter your email"
                />
                <div className="flex items-center mt-2 text-white/60 text-sm">
                  <Lock className="w-3 h-3 mr-2 flex-shrink-0" />
                  <span>We respect your privacy and never share your email.</span>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white hover:bg-white/95 text-[#ff6b6b] font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              >
                {isSubmitting ? 'Submitting...' : 'Reveal My Soulmate'}
              </button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};