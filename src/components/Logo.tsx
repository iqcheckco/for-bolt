import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  textClassName?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  showText = true,
  textClassName = "text-2xl font-semibold bg-gradient-to-r from-[#ff6b6b] to-[#7f4ca5] text-transparent bg-clip-text tracking-tight"
}) => {
  return (
    <motion.div 
      className="flex items-center gap-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Heart 
          className="md:w-8 md:h-8 w-6 h-6" 
          style={{
            color: "transparent",
            fill: "url(#logo-gradient)"
          }}
        />
        <svg width="0" height="0">
          <defs>
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff6b6b" />
              <stop offset="100%" stopColor="#7f4ca5" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
      {showText && (
        <motion.span 
          className={`${textClassName} md:text-2xl text-[1.125rem]`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          The Soulmate Quiz
        </motion.span>
      )}
    </motion.div>
  );
};