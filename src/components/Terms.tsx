import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';

export const Terms: React.FC = () => {
  useEffect(() => {
    document.title = 'Terms of Service | The Soulmate Quiz';
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
            <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
          </div>

          <div className="prose max-w-none text-white/90">
            <p className="mb-6">Last updated: March 1, 2024</p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-white">1. Acceptance of Terms</h2>
              <p>By accessing and using The Soulmate Quiz, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-white">2. Use of Service</h2>
              <p>The soulmate quiz provided is for entertainment and self-discovery purposes only. The results should be considered as guidance rather than definitive predictions.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-white">3. User Conduct</h2>
              <p>Users agree to:</p>
              <ul className="list-disc ml-6">
                <li>Provide accurate information</li>
                <li>Not attempt to manipulate quiz results</li>
                <li>Not use automated means to access the service</li>
                <li>Not share or distribute quiz content</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-white">4. Intellectual Property</h2>
              <p>All content, including but not limited to quiz questions, graphics, and logos, is the property of The Soulmate Quiz and protected by intellectual property laws.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-white">5. Limitation of Liability</h2>
              <p>The Soulmate Quiz is not liable for any damages arising from the use or inability to use our services.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-white">6. Changes to Terms</h2>
              <p>We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of modified terms.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-white">7. Contact</h2>
              <p>For any questions about these terms, please contact us at <a href="mailto:info@thesoulmatequiz.com" className="text-pink-300 hover:text-pink-200">info@thesoulmatequiz.com</a></p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};