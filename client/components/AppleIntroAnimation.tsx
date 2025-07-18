import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AppleIntroAnimationProps {
  onComplete: () => void;
}

// Bitmoji avatar path
const BITMOJI_AVATAR = "/icons/bitmoji.png";

// The three intro text sequences
const introTexts = [
  "Hi, Welcome To My Portfolio",
  "This Portfolio Isn't Static — It Thinks, Talks, and Adapts.",
  "Try My Own AI To Answer All Queries About Me"
];

// Movie quotes and motivational quotes with authors
const movieQuotes = [
  { quote: "You want something? Go get it. Period.", author: "— Will Smith" },
  { quote: "Life is what happens when you're busy making other plans.", author: "— John Lennon" },
  { quote: "The only way to do great work is to love what you do.", author: "— Steve Jobs" },
  { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "— Winston Churchill" },
  { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "— Eleanor Roosevelt" },
  { quote: "Don't watch the clock; do what it does. Keep going.", author: "— Sam Levenson" },
  { quote: "The only limit to our realization of tomorrow is our doubts of today.", author: "— Franklin D. Roosevelt" },
  { quote: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "— Zig Ziglar" },
  { quote: "The way to get started is to quit talking and begin doing.", author: "— Walt Disney" },
  { quote: "It does not matter how slowly you go as long as you do not stop.", author: "— Confucius" },
  { quote: "The only person you are destined to become is the person you decide to be.", author: "— Ralph Waldo Emerson" },
  { quote: "Your time is limited, don't waste it living someone else's life.", author: "— Steve Jobs" },
  { quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "— Nelson Mandela" },
  { quote: "Believe you can and you're halfway there.", author: "— Theodore Roosevelt" },
  { quote: "The best way to predict the future is to create it.", author: "— Peter Drucker" }
];

export const AppleIntroAnimation: React.FC<AppleIntroAnimationProps> = ({ onComplete }) => {
  const [currentPhase, setCurrentPhase] = useState<"bitmoji" | "text1" | "text2" | "text3" | "movieQuote" | "complete">("bitmoji");
  const [currentQuote, setCurrentQuote] = useState<{ quote: string; author: string }>({ quote: "", author: "" });
  const [typewriterText, setTypewriterText] = useState("");
  const [typewriterAuthor, setTypewriterAuthor] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Animation sequence timing
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // Select a random movie quote
    const randomQuote = movieQuotes[Math.floor(Math.random() * movieQuotes.length)];
    setCurrentQuote(randomQuote);

    // Phase 1: Bitmoji avatar (0.5s fade in, 1s hold, 0.4s fade out)
    timers.push(setTimeout(() => {
      setCurrentPhase("text1");
    }, 1900)); // 500 + 1000 + 400

    // Phase 2: Text 1 (0.6s fade in, 1s hold, 0.4s fade out)
    timers.push(setTimeout(() => {
      setCurrentPhase("text2");
    }, 3900)); // 1900 + 600 + 1000 + 400

    // Phase 3: Text 2 (same timing)
    timers.push(setTimeout(() => {
      setCurrentPhase("text3");
    }, 5900)); // 3900 + 600 + 1000 + 400

    // Phase 4: Text 3 (same timing)
    timers.push(setTimeout(() => {
      setCurrentPhase("movieQuote");
      setIsTyping(true);
    }, 7900)); // 5900 + 600 + 1000 + 400

    // Phase 5: Wait for typewriter to complete, then fade out
    // Calculate total typewriter time: quote length + author length + pauses
    const quoteLength = randomQuote.quote.length;
    const authorLength = randomQuote.author.length;
    const typewriterTime = (quoteLength + authorLength) * 50 + 500 + 1000; // 50ms per char + 500ms pause + 1s hold
    
    timers.push(setTimeout(() => {
      setCurrentPhase("complete");
    }, 7900 + typewriterTime)); // Start time + typewriter duration

    // Complete the animation and call onComplete after fade out is complete
    timers.push(setTimeout(() => {
      onComplete();
    }, 7900 + typewriterTime + 1000)); // Start time + typewriter duration + fade out duration (increased to 1000ms)

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [onComplete]);

  // Typewriter effect for movie quote
  useEffect(() => {
    if (isTyping && currentQuote.quote) {
      let quoteIndex = 0;
      let authorIndex = 0;
      
      const typeQuote = () => {
        if (quoteIndex <= currentQuote.quote.length) {
          setTypewriterText(currentQuote.quote.slice(0, quoteIndex));
          quoteIndex++;
          setTimeout(typeQuote, 50); // 50ms per character
        } else {
          // Start typing author after quote is done
          setTimeout(() => {
            const typeAuthor = () => {
              if (authorIndex <= currentQuote.author.length) {
                setTypewriterAuthor(currentQuote.author.slice(0, authorIndex));
                authorIndex++;
                setTimeout(typeAuthor, 50); // 50ms per character
              } else {
                // Mark typing as complete
                setIsTypingComplete(true);
              }
            };
            typeAuthor();
          }, 500); // 500ms pause before author
        }
      };
      
      typeQuote();
    }
  }, [isTyping, currentQuote]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-silver/95 backdrop-blur-sm"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.0, ease: "easeInOut" }}
      >
        {/* Bitmoji Avatar - Static centered, stays until movie quote */}
        <AnimatePresence>
          {currentPhase !== "movieQuote" && currentPhase !== "complete" && (
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: currentPhase === "bitmoji" ? 1 : 0,
                scale: currentPhase === "bitmoji" ? 1 : 0.8
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Outer glowing ring - Siri-style */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue/40 to-purple/40 blur-lg"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* 3D shadow layer for depth */}
              <div className="absolute inset-0 rounded-full bg-black/20 blur-md transform translate-y-1" />
              
              {/* Glass container with enhanced depth */}
              <div className="relative w-full h-full rounded-full backdrop-blur-apple bg-white/20 border border-white/30 shadow-apple-lg overflow-hidden">
                {/* Bitmoji image with mask for background removal */}
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src={BITMOJI_AVATAR}
                    alt="AI Assistant Avatar"
                    className="w-full h-full object-cover object-center"
                    style={{
                      maskImage: 'radial-gradient(circle, black 60%, transparent 100%)',
                      WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 100%)'
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23007aff'/%3E%3Cpath d='M30 40c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10zm20 0c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10z' fill='white'/%3E%3C/svg%3E";
                    }}
                  />
                </div>
              </div>
              
              {/* Inner pulse - enhanced glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue/20 to-purple/20 animate-pulse" />
              
              {/* Additional 3D highlight */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent opacity-60" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Text 1: Left-top position */}
        <AnimatePresence>
          {currentPhase === "text1" && (
            <motion.div
              className="absolute top-16 left-8 text-left"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ 
                duration: 0.6,
                ease: "easeOut"
              }}
            >
              <div 
                className="font-bold max-w-lg backdrop-blur-sm"
                style={{ 
                  fontFamily: '-apple-system, "SF Pro Display", system-ui, sans-serif',
                  fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
                  color: 'rgba(63, 61, 61, 0.85)',
                  textShadow: '0 0 1px rgba(117, 113, 113, 0.5)'
                }}
              >
                Hi, <span className="text-blue/90">Welcome</span> To My Portfolio
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Text 2: Right-center position */}
        <AnimatePresence>
          {currentPhase === "text2" && (
            <motion.div
              className="absolute top-1/2 right-8 transform -translate-y-1/2 text-right"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ 
                duration: 0.6,
                ease: "easeOut"
              }}
            >
              <div 
                className="font-bold max-w-lg backdrop-blur-sm"
                style={{ 
                  fontFamily: '-apple-system, "SF Pro Display", system-ui, sans-serif',
                  fontSize: 'clamp(1.25rem, 3.5vw, 3rem)',
                  color: 'rgba(63, 61, 61, 0.85)',
                  textShadow: '0 0 1px rgba(117, 113, 113, 0.5)'
                }}
              >
                This Portfolio Isn't Static — It Thinks, Talks, and <span className="text-blue/85">Adapts</span>.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Text 3: Bottom-center position */}
        <AnimatePresence>
          {currentPhase === "text3" && (
            <motion.div
              className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ 
                duration: 0.6,
                ease: "easeOut"
              }}
            >
              <div 
                className="font-bold max-w-3xl backdrop-blur-sm"
                style={{ 
                  fontFamily: '-apple-system, "SF Pro Display", system-ui, sans-serif',
                  fontSize: 'clamp(1.25rem, 3.5vw, 3rem)',
                  color: 'rgba(63, 61, 61, 0.85)',
                  textShadow: '0 0 1px rgba(117, 113, 113, 0.5)'
                }}
              >
                Try My Own <span className="text-blue/90">AI</span> To Answer All Queries About Me
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Movie Quote: Center position with typewriter effect */}
        <AnimatePresence>
          {currentPhase === "movieQuote" && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center p-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.6,
                ease: "easeOut"
              }}
            >
              <div 
                className="font-normal text-graphite/70 max-w-4xl px-8 backdrop-blur-sm"
                style={{ 
                  fontFamily: '-apple-system, "SF Pro Display", system-ui, sans-serif',
                  fontSize: 'clamp(1.2rem, 3vw, 2.5rem)'
                }}
              >
                "{typewriterText}"
                <div 
                  className="font-normal text-graphite/60 mt-4"
                  style={{ 
                    fontFamily: '-apple-system, "SF Pro Display", system-ui, sans-serif',
                    fontSize: 'clamp(1rem, 2.5vw, 2rem)'
                  }}
                >
                  {typewriterAuthor}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fade out overlay - only when completing */}
        {currentPhase === "complete" && (
          <motion.div
            className="absolute inset-0 bg-silver/95 backdrop-blur-sm"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}; 