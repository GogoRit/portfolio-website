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

// Greeting text with inline bitmoji
const greetingText = "Hello My Future Boss";

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
  const [currentPhase, setCurrentPhase] = useState<"greeting" | "intro1" | "intro2" | "intro3" | "movieQuote" | "complete">("greeting");
  const [currentQuote, setCurrentQuote] = useState<{ quote: string; author: string }>({ quote: "", author: "" });
  const [typewriterText, setTypewriterText] = useState("");
  const [typewriterAuthor, setTypewriterAuthor] = useState("");
  const [greetingTypewriter, setGreetingTypewriter] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isGreetingTyping, setIsGreetingTyping] = useState(false);
  const [isGreetingComplete, setIsGreetingComplete] = useState(false);

  // Animation sequence timing
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // Select a random movie quote
    const randomQuote = movieQuotes[Math.floor(Math.random() * movieQuotes.length)];
    setCurrentQuote(randomQuote);

    // Start with greeting typing
    setIsGreetingTyping(true);

    // Phase 1: Greeting with typewriter effect (first)
    const greetingLength = greetingText.length;
    const greetingTypewriterTime = greetingLength * 50 + 1000; // 50ms per char + 1s hold
    
    timers.push(setTimeout(() => {
      setCurrentPhase("intro1");
    }, greetingTypewriterTime)); // Greeting typewriter duration

    // Phase 2: Intro text 1 (0.6s fade in, 1s hold, 0.4s fade out)
    timers.push(setTimeout(() => {
      setCurrentPhase("intro2");
    }, greetingTypewriterTime + 2000)); // Greeting + 600 + 1000 + 400

    // Phase 3: Intro text 2 (same timing)
    timers.push(setTimeout(() => {
      setCurrentPhase("intro3");
    }, greetingTypewriterTime + 4000)); // Greeting + 2000 + 600 + 1000 + 400

    // Phase 4: Intro text 3 (same timing)
    timers.push(setTimeout(() => {
      setCurrentPhase("movieQuote");
      setIsTyping(true);
    }, greetingTypewriterTime + 6000)); // Greeting + 4000 + 600 + 1000 + 400

    // Phase 5: Movie quote typewriter (last)
    const quoteLength = randomQuote.quote.length;
    const authorLength = randomQuote.author.length;
    const movieTypewriterTime = (quoteLength + authorLength) * 50 + 500 + 1000; // 50ms per char + 500ms pause + 1s hold
    
    timers.push(setTimeout(() => {
      setCurrentPhase("complete");
    }, greetingTypewriterTime + 6000 + movieTypewriterTime)); // Greeting + intro texts + movie typewriter duration

    // Complete the animation and call onComplete immediately when complete phase starts
    timers.push(setTimeout(() => {
      onComplete();
    }, greetingTypewriterTime + 6000 + movieTypewriterTime)); // Greeting + intro texts + movie typewriter duration

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [onComplete]);

  // Typewriter effect for greeting
  useEffect(() => {
    if (isGreetingTyping && greetingText) {
      let index = 0;
      
      const typeGreeting = () => {
        if (index <= greetingText.length) {
          setGreetingTypewriter(greetingText.slice(0, index));
          index++;
          setTimeout(typeGreeting, 50); // 50ms per character
        } else {
          setIsGreetingComplete(true);
        }
      };
      
      typeGreeting();
    }
  }, [isGreetingTyping, greetingText]);

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
        {/* Unified Container for all centered content */}
        <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
          
          {/* Greeting with inline Bitmoji: Center position (FIRST) */}
          <AnimatePresence>
            {currentPhase === "greeting" && (
              <motion.div
                className="flex items-center justify-center gap-4"
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
                    fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
                    color: 'rgba(63, 61, 61, 0.85)',
                    textShadow: '0 0 1px rgba(117, 113, 113, 0.5)'
                  }}
                >
                  Hello My Future <span className="text-blue/90">Boss</span>
                </div>
                
                {/* Inline Bitmoji with glow effect */}
                <motion.div
                  className="relative"
                  animate={isGreetingComplete ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  } : {}}
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut"
                  }}
                >
                  {/* Subtle blue glowing wave animation */}
                  <div className="absolute inset-0 rounded-full bg-blue-400/30 animate-ping" />
                  
                  {/* Glass container with enhanced depth */}
                  <div className="relative w-16 h-16 rounded-full backdrop-blur-apple bg-white/20 border border-white/30 shadow-apple-lg overflow-hidden">
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
                  
                  {/* Inner pulse - enhanced glow */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue/20 to-purple/20 animate-pulse" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Intro Text 1: Left-top position */}
          <AnimatePresence>
            {currentPhase === "intro1" && (
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

          {/* Intro Text 2: Right-center position */}
          <AnimatePresence>
            {currentPhase === "intro2" && (
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

          {/* Intro Text 3: Bottom-center position */}
          <AnimatePresence>
            {currentPhase === "intro3" && (
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

          {/* Movie Quote: Same center position (LAST) */}
          <AnimatePresence>
            {currentPhase === "movieQuote" && (
              <motion.div
                className="max-w-4xl px-8 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                // Removed the exit animation to prevent double fade
                transition={{ 
                  duration: 0.6,
                  ease: "easeOut"
                }}
              >
                <div 
                  className="font-normal text-graphite/70"
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
        </div>

        {/* Removed the complete phase overlay to prevent double fade */}
      </motion.div>
    </AnimatePresence>
  );
}; 