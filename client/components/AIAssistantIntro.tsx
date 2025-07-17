import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";

// Motivational quotes to rotate through
const motivationalQuotes = [
  {
    text: "You want something? Go get it. Period.",
    source: "The Pursuit of Happyness"
  },
  {
    text: "The ones who are crazy enough to think they can change the world… usually do.",
    source: "Steve Jobs"
  },
  {
    text: "Great things never came from comfort zones.",
    source: "Unknown"
  },
  {
    text: "It's not about how hard you hit. It's about how hard you can get hit and keep moving forward.",
    source: "Rocky Balboa"
  }
];

interface AIAssistantIntroProps {
  onComplete: () => void;
}

export const AIAssistantIntro: React.FC<AIAssistantIntroProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showQuote, setShowQuote] = useState(false);
  const [selectedQuote] = useState(() => 
    motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
  );

  const typewriterTexts = [
    "Hi, Welcome To My Portfolio",
    "This Portfolio Isn't Static — It Thinks Talks And Adapts",
    "Try My Own AI To Answer All Queries About Me"
  ];

  // Typewriter effect for current text
  useEffect(() => {
    if (currentStep < typewriterTexts.length) {
      const currentText = typewriterTexts[currentStep];
      if (currentChar < currentText.length) {
        const timer = setTimeout(() => {
          setCurrentChar(prev => prev + 1);
        }, 50); // Faster typewriter speed
        return () => clearTimeout(timer);
      } else {
        // Move to next line after a delay
        const timer = setTimeout(() => {
          setCurrentStep(prev => prev + 1);
          setCurrentChar(0);
        }, 800); // Shorter delay before next line
        return () => clearTimeout(timer);
      }
    } else {
      // All text completed, show quote
      setTimeout(() => setShowQuote(true), 1000);
      setTimeout(() => onComplete(), 6000); // More time to show website
    }
  }, [currentStep, currentChar, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
        className="fixed inset-0 z-[130] flex items-center justify-center bg-black/90 backdrop-blur-md"
      >
        <div className="relative flex flex-col items-center justify-center max-w-4xl mx-auto px-6 text-center">
          {/* Gaurank AI Icon */}
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ 
              scale: [0.3, 1.5, 1.2], 
              opacity: 1,
              transition: { 
                duration: 2,
                scale: {
                  duration: 2,
                  times: [0, 0.6, 1]
                }
              }
            }}
            className="mb-16"
          >
            <div className="relative">
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  transition: { 
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2
                  }
                }}
                className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-full flex items-center justify-center shadow-2xl"
              >
                <Bot className="w-16 h-16 md:w-20 md:h-20 text-background" />
              </motion.div>
              
              {/* Glowing effect */}
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="absolute inset-0 bg-primary/40 rounded-full blur-2xl"
              />
              
              {/* Additional glow layers */}
              <motion.div
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 1.5
                }}
                className="absolute inset-0 bg-primary/20 rounded-full blur-3xl"
              />
            </div>
          </motion.div>

          {/* Typewriter Text */}
          <div className="space-y-8 mb-16">
            {typewriterTexts.map((text, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ 
                  opacity: currentStep >= index ? 1 : 0,
                  y: currentStep >= index ? 0 : 30,
                  transition: { 
                    duration: 0.8,
                    delay: index * 0.5
                  }
                }}
                className="text-2xl md:text-3xl font-bold text-white tracking-wide min-h-[3rem] flex items-center justify-center text-center"
              >
                {currentStep === index 
                  ? text.slice(0, currentChar) + (currentChar < text.length ? '|' : '')
                  : currentStep > index 
                    ? text 
                    : ''
                }
                {index === typewriterTexts.length - 1 && currentStep > index && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="inline-block ml-3"
                  >
                    <Sparkles className="w-8 h-8 text-yellow-400 inline animate-pulse" />
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Motivational Quote */}
          <AnimatePresence>
            {showQuote && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl"
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-lg md:text-xl text-gray-200 italic mb-3 font-medium"
                >
                  "{selectedQuote.text}"
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-sm text-gray-400 font-light"
                >
                  — {selectedQuote.source}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Skip Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            onClick={onComplete}
            className="absolute top-8 right-8 text-white/70 hover:text-white text-sm font-medium hover:underline transition-colors bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            Skip
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}; 