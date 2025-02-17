import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, Star, Clock, Eye, Zap, CreditCard, Shield, Timer } from 'lucide-react';
import { PublicationLogos } from './PublicationLogos';
import { Logo } from './Logo';
import { useTestStore } from '../store';
import { trackEvent } from '../utils/analytics';

type Region = 'EU' | 'UK' | 'US' | 'ROW';

interface PricingConfig {
  price: string;
  currency: string;
  showCurrencyCode: boolean;
  getCheckoutLink: (interestedIn: string, quizId?: string, email?: string, firstName?: string) => string;
}

const regionConfig: Record<Region, PricingConfig> = {
  EU: {
    price: '9.99',
    currency: '€',
    showCurrencyCode: false,
    getCheckoutLink: (interestedIn, quizId, email, firstName) => {
      const baseUrl = `https://checkout.thesoulmatequiz.com/en-eu/cart/${interestedIn === 'Women' ? '46625384562955:1' : '46625398292747:1'}`;
      const params = new URLSearchParams();
      if (quizId) params.append('note', quizId);
      if (email) params.append('checkout[email]', email);
      if (firstName) params.append('checkout[billing_address][first_name]', firstName);
      const queryString = params.toString();
      return queryString ? `${baseUrl}?${queryString}` : baseUrl;
    }
  },
  UK: {
    price: '9.99',
    currency: '£',
    showCurrencyCode: false,
    getCheckoutLink: (interestedIn, quizId, email, firstName) => {
      const baseUrl = `https://checkout.thesoulmatequiz.com/cart/${interestedIn === 'Women' ? '46625384562955:1' : '46625398292747:1'}`;
      const params = new URLSearchParams();
      if (quizId) params.append('note', quizId);
      if (email) params.append('checkout[email]', email);
      if (firstName) params.append('checkout[billing_address][first_name]', firstName);
      const queryString = params.toString();
      return queryString ? `${baseUrl}?${queryString}` : baseUrl;
    }
  },
  US: {
    price: '9.99',
    currency: '$',
    showCurrencyCode: true,
    getCheckoutLink: (interestedIn, quizId, email, firstName) => {
      const baseUrl = `https://checkout.thesoulmatequiz.com/en-us/cart/${interestedIn === 'Women' ? '46625384562955:1' : '46625398292747:1'}`;
      const params = new URLSearchParams();
      if (quizId) params.append('note', quizId);
      if (email) params.append('checkout[email]', email);
      if (firstName) params.append('checkout[billing_address][first_name]', firstName);
      const queryString = params.toString();
      return queryString ? `${baseUrl}?${queryString}` : baseUrl;
    }
  },
  ROW: {
    price: '9.99',
    currency: '$',
    showCurrencyCode: true,
    getCheckoutLink: (interestedIn, quizId, email, firstName) => {
      const baseUrl = `https://checkout.thesoulmatequiz.com/en-us/cart/${interestedIn === 'Women' ? '46625384562955:1' : '46625398292747:1'}`;
      const params = new URLSearchParams();
      if (quizId) params.append('note', quizId);
      if (email) params.append('checkout[email]', email);
      if (firstName) params.append('checkout[billing_address][first_name]', firstName);
      const queryString = params.toString();
      return queryString ? `${baseUrl}?${queryString}` : baseUrl;
    }
  }
};

const testimonials = [
  {
    name: "Sarah M.",
    age: 28,
    location: "New Jersey, United States",
    image: "https://assets.zyrosite.com/mnlqVelL4btke54l/471782675_10163418331312792_7023783413103489711_n-m5KL6764xyUOjw1e.jpg",
    quote: "I was skeptical at first, but the accuracy of my soulmate reading was uncanny. Two months later, I met someone who matched the description perfectly!",
    stars: 5
  },
  {
    name: "Michael K.",
    age: 52,
    location: "Devon, United Kingdom",
    image: "https://assets.zyrosite.com/mnlqVelL4btke54l/387783568_3577547639230679_3363582185582589861_n-mk3qpEpNRei5ZLKq.jpg",
    quote: "The personality insights were spot-on. It helped me understand what I was really looking for in a partner. Worth every penny!",
    stars: 5
  },
  {
    name: "Jessica L.",
    age: 36,
    location: "Toronto, Canada",
    image: "https://assets.zyrosite.com/mnlqVelL4btke54l/125844111_10158977953681369_6783748705719542133_n-AVL16V64Oetqeoyv.jpg",
    quote: "Not only did it reveal my soulmate's first initial, but the zodiac compatibility guidance helped me navigate my love life better.",
    stars: 5
  }
];

export const SalesPage: React.FC = () => {
  const [region, setRegion] = useState<Region>('ROW');
  const { userDetails, gclid } = useTestStore();
  const [hasTrackedView, setHasTrackedView] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ minutes: 10, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds === 0) {
          if (prev.minutes === 0) {
            clearInterval(timer);
            return prev;
          }
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return { ...prev, seconds: prev.seconds - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.title = 'Almost There! | The Soulmate Quiz';
    
    if (!hasTrackedView) {
      trackEvent('view_results', {
        user_data: {
          email_address: userDetails?.email,
          first_name: userDetails?.firstName,
          address: {
            country: region
          }
        },
        user_segment: getUserSegment(),
        event_label: 'View Results',
        event_category: 'Results',
        non_interaction: false
      });
      setHasTrackedView(true);
    }
    
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.continent_code === 'EU' && data.country_code !== 'GB') {
          setRegion('EU');
        } else if (data.country_code === 'GB') {
          setRegion('UK');
        } else if (data.country_code === 'US') {
          setRegion('US');
        } else {
          setRegion('ROW');
        }
      })
      .catch(() => {
        setRegion('ROW');
      });
  }, [hasTrackedView, region, userDetails]);

  const { price, currency, showCurrencyCode, getCheckoutLink } = regionConfig[region];
  
  const baseCheckoutLink = getCheckoutLink(
    userDetails?.interestedIn || 'Both',
    userDetails?.quizId,
    userDetails?.email,
    userDetails?.firstName
  );
  
  const checkoutLink = gclid ? `${baseCheckoutLink}&gclid=${gclid}` : baseCheckoutLink;

  const handleCheckoutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const productId = userDetails?.interestedIn === 'Women' ? '46625384562955' : '46625398292747';
    
    trackEvent('begin_checkout', {
      gclid: gclid,
      user_data: {
        email_address: userDetails?.email,
        first_name: userDetails?.firstName,
        address: {
          country: region
        }
      },
      items: [{
        id: productId,
        quantity: 1,
        price: parseFloat(price),
        variant: userDetails?.interestedIn
      }],
      value: parseFloat(price),
      currency: region === 'EU' ? 'EUR' : region === 'UK' ? 'GBP' : 'USD',
      event_label: `Checkout - ${userDetails?.interestedIn}`,
      event_category: 'Ecommerce',
      user_segment: getUserSegment(),
      non_interaction: false
    });
  };

  const getUserSegment = () => {
    const age = new Date().getFullYear() - parseInt(userDetails?.birthYear || '0');
    return {
      age_group: getAgeGroup(age),
      zodiac: userDetails?.zodiacSign,
      interested_in: userDetails?.interestedIn,
      region: region
    };
  };

  const getAgeGroup = (age: number): string => {
    if (age < 25) return '18-24';
    if (age < 35) return '25-34';
    if (age < 45) return '35-44';
    if (age < 55) return '45-54';
    return '55+';
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const day = tomorrow.getDate();
    const month = tomorrow.toLocaleString('default', { month: 'long' });
    const year = tomorrow.getFullYear();
    
    const getDayWithSuffix = (day: number) => {
      if (day > 3 && day < 21) return day + 'th';
      switch (day % 10) {
        case 1: return day + 'st';
        case 2: return day + 'nd';
        case 3: return day + 'rd';
        default: return day + 'th';
      }
    };
    
    return `${getDayWithSuffix(day)} ${month} ${year}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <Logo />
          </div>
        </div>
      </header>

      <div className="flex-1 bg-gradient-to-br from-[#ff6b6b] to-[#7f4ca5]">
        <main className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 mb-6"
              >
                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 text-white/90">
                  <Timer className="w-4 h-4 text-green-300" />
                  Results Saved For: {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </motion.div>

              <motion.h1 
                className="text-2xl md:text-3xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="bg-gradient-to-r from-white via-pink-100 to-white text-transparent bg-clip-text">
                  Your Soulmate Awaits!
                </span>
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-white/90 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {userDetails?.firstName 
                  ? `${userDetails.firstName}, we've uncovered powerful insights about your soulmate.`
                  : "We've uncovered powerful insights about your soulmate."}
              </motion.p>
            </div>

            <motion.div 
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
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
              <h3 className="text-sm text-white/90 mt-6 text-center italic">
                Examples
              </h3>
            </motion.div>

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
                    <Eye className="w-6 h-6 text-indigo-300 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-medium text-white mb-2">Soulmate Image</h4>
                      <p className="text-white/90">Experience a powerful visual preview of your soulmate.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Heart className="w-6 h-6 text-pink-300 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-medium text-white mb-2">Their First Initial</h4>
                      <p className="text-white/90">Reveal the first letter of your soulmate's name.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Star className="w-6 h-6 text-emerald-300 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-medium text-white mb-2">Their Star Sign</h4>
                      <p className="text-white/90">Discover your soulmate's zodiac sign.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Sparkles className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-medium text-white mb-2">Personality Profile</h4>
                      <p className="text-white/90">Uncover deep insights about your soulmate's personality.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8 text-center">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">Limited Time Offer</h3>
                <p className="text-white/80 mb-6 text-sm">Sale Price Ends: {getTomorrowDate()}</p>
                <div className="flex flex-col items-center mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white/60 line-through text-lg">
                      {currency}27{showCurrencyCode ? ' USD' : ''}
                    </span>
                    <span className="text-white text-2xl font-bold">
                      {currency}{price}{showCurrencyCode ? ' USD' : ''}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <a
                    href={checkoutLink}
                    onClick={handleCheckoutClick}
                    className="w-full max-w-xs bg-white hover:bg-white/95 text-[#ff6b6b] font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-all duration-200 hover:scale-105 mb-6 whitespace-nowrap"
                  >
                    Reveal My Soulmate
                  </a>
                  <div className="flex flex-wrap items-center justify-center gap-4 text-white/90 text-sm mb-6">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-green-300 flex-shrink-0" />
                      <span>One-Time Purchase</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-green-300 flex-shrink-0" />
                      <span>Instant Access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-300 flex-shrink-0" />
                      <span>30-Day Money Back Guarantee</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 flex-nowrap">
                    <img src="/visa.svg" alt="Visa" className="h-[20px]" />
                    <img src="/mastercard.svg" alt="Mastercard" className="h-[20px]" />
                    <img src="/amex.svg" alt="American Express" className="h-[20px]" />
                    <img src="/apple-pay.svg" alt="Apple Pay" className="h-[20px]" />
                    <img src="/google-pay.svg" alt="Google Pay" className="h-[20px]" />
                    <img src="/shop-pay.svg" alt="Shop Pay" className="h-[20px]" />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <PublicationLogos />
              </div>
            </motion.div>

            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-white mb-2">Love Stories From Around The World</h3>
                <p className="text-white/80">Join thousands who found their soulmate with our results package</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 * (index + 1) }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="text-white font-medium">{testimonial.name}</h4>
                        <p className="text-white/60 text-sm">
                          {testimonial.age} • {testimonial.location}
                        </p>
                        <div className="flex gap-1 mt-1">
                          {[...Array(testimonial.stars)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {testimonial.quote}
                    </p>
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <Heart className="w-4 h-4 text-pink-300" />
                        <span>Verified Purchase</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Bottom Buy Box */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8 text-center">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">Limited Time Offer</h3>
                <p className="text-white/80 mb-6 text-sm">Sale Price Ends: {getTomorrowDate()}</p>
                <div className="flex flex-col items-center mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white/60 line-through text-lg">
                      {currency}27{showCurrencyCode ? ' USD' : ''}
                    </span>
                    <span className="text-white text-2xl font-bold">
                      {currency}{price}{showCurrencyCode ? ' USD' : ''}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <a
                    href={checkoutLink}
                    onClick={handleCheckoutClick}
                    className="w-full max-w-xs bg-white hover:bg-white/95 text-[#ff6b6b] font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-all duration-200 hover:scale-105 mb-6 whitespace-nowrap"
                  >
                    Reveal My Soulmate
                  </a>
                  <div className="flex flex-wrap items-center justify-center gap-4 text-white/90 text-sm mb-6">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-green-300 flex-shrink-0" />
                      <span>One-Time Purchase</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-green-300 flex-shrink-0" />
                      <span>Instant Access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-300 flex-shrink-0" />
                      <span>30-Day Money Back Guarantee</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 flex-nowrap">
                    <img src="/visa.svg" alt="Visa" className="h-[20px]" />
                    <img src="/mastercard.svg" alt="Mastercard" className="h-[20px]" />
                    <img src="/amex.svg" alt="American Express" className="h-[20px]" />
                    <img src="/apple-pay.svg" alt="Apple Pay" className="h-[20px]" />
                    <img src="/google-pay.svg" alt="Google Pay" className="h-[20px]" />
                    <img src="/shop-pay.svg" alt="Shop Pay" className="h-[20px]" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>

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