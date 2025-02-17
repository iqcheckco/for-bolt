import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';

export const Privacy: React.FC = () => {
  useEffect(() => {
    document.title = 'Privacy Policy | The Soulmate Quiz';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ff6b6b] to-[#7f4ca5]">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
          <div className="flex items-center gap-3 mb-8">
            <Heart className="w-8 h-8 text-pink-300" />
            <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
          </div>

          <div className="prose max-w-none text-white/90">
            <p className="mb-6">Last updated: March 1, 2024</p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-white">1. Information We Collect</h2>
              <p>We collect:</p>
              <ul className="list-disc ml-6">
                <li>Quiz responses and results</li>
                <li>Email address (if provided)</li>
                <li>Usage data and analytics</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-white">2. How We Use Your Information</h2>
              <p>Your information is used to:</p>
              <ul className="list-disc ml-6">
                <li>Generate and deliver quiz results</li>
                <li>Improve our services</li>
                <li>Send you your results (if email provided)</li>
                <li>Analyze usage patterns</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-white">3. Data Security</h2>
              <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-white">4. Data Sharing</h2>
              <p>We do not sell, trade, or rent your personal information to third parties. We may share anonymous, aggregated data for research or analytical purposes.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-white">5. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc ml-6">
                <li>Access your personal data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of communications</li>
                <li>Request data correction</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-white">6. Contact Us</h2>
              <p>For any privacy-related questions or concerns, please contact us at <a href="mailto:info@thesoulmatequiz.com" className="text-pink-300 hover:text-pink-200">info@thesoulmatequiz.com</a></p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};