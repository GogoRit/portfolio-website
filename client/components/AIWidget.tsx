import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot } from "lucide-react";
import { AIChatbot } from "./AIChatbot";
import { AIAssistantIntro } from "./AIAssistantIntro";
import { useAnimation } from "../contexts/AnimationContext";

// Finite states the widget can be in
type WidgetState = "intro" | "traveling" | "collapsed" | "expanded";

export const AIWidget: React.FC = () => {
  const [state, setState] = useState<WidgetState>("intro");
  const [badgeBounce, setBadgeBounce] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const [hasLanded, setHasLanded] = useState(false);
  const [isTraveling, setIsTraveling] = useState(false);
  const { setAgentLanded, setAnimationTriggered, setShowMainPage } = useAnimation();

  // Check if intro has been shown (using localStorage for persistence)
  useEffect(() => {
    // Temporarily force intro to show for testing
    console.log("🎬 AI Assistant Intro: Forcing intro to show for testing");
    setShowIntro(true);
    localStorage.setItem("gaurank-ai-intro-shown", "true");
    
    // Prevent scrolling during intro
    document.body.style.overflow = 'hidden';
    
    // Original logic (commented out for testing):
    // const hasSeenIntro = localStorage.getItem("gaurank-ai-intro-shown");
    // if (!hasSeenIntro) {
    //   console.log("🎬 AI Assistant Intro: First time visit - showing intro");
    //   setShowIntro(true);
    //   localStorage.setItem("gaurank-ai-intro-shown", "true");
    //   
    //   // Prevent scrolling during intro
    //   document.body.style.overflow = 'hidden';
    // } else {
    //   console.log("🎬 AI Assistant Intro: Returning visitor - skipping intro");
    //   setState("collapsed");
    // }
  }, []);

  // Handle intro completion
  const handleIntroComplete = () => {
    console.log("🎬 Intro completed - starting traveling sequence");
    setShowIntro(false);
    setState("traveling");
    // Restore scrolling after intro
    document.body.style.overflow = 'auto';
    // Scroll to top to ensure we're at the beginning
    window.scrollTo(0, 0);
    
    // Start traveling animation after a short delay
    setTimeout(() => {
      console.log("🎯 Starting AI icon travel to corner");
      setIsTraveling(true);
    }, 300);
  };

  // Auto-collapse intro after 3s (fallback for old intro)
  useEffect(() => {
    if (state === "intro" && !showIntro) {
      const t = setTimeout(() => setState("collapsed"), 3000);
      return () => clearTimeout(t);
    }
  }, [state, showIntro]);

  // Stop badge bounce after 10s of collapsed
  useEffect(() => {
    if (state === "collapsed") {
      const t = setTimeout(() => setBadgeBounce(false), 10000);
      return () => clearTimeout(t);
    }
  }, [state]);

  // Cleanup scroll behavior on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Debug: Monitor traveling and landing states
  useEffect(() => {
    if (isTraveling) {
      console.log("🎯 isTraveling changed to true - AI icon traveling to corner");
    }
    if (hasLanded) {
      console.log("🎯 hasLanded changed to true - bounce animation should trigger");
      
      // Wait for bounce animation to complete, then reveal main page
      setTimeout(() => {
        console.log("🎬 Revealing main page content");
        setShowMainPage(true);
      }, 600); // Match the bounce animation duration
    }
  }, [isTraveling, hasLanded, setShowMainPage]);

  return (
    <>
      {/* New AI Assistant Intro */}
      <AnimatePresence>
        {showIntro && (
          <AIAssistantIntro onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {/* Legacy intro animation (fallback) */}
      <AnimatePresence>
        {state === "intro" && !showIntro && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.6 } }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
            className="fixed inset-0 z-[120] flex items-center justify-center pointer-events-none"
          >
            <div className="bg-background border border-border rounded-2xl shadow-2xl p-6 max-w-sm w-full pointer-events-auto text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-lg font-semibold">
                <Bot className="w-5 h-5 text-primary" /> Hello there!
              </div>
              <p className="text-sm text-muted-foreground">
                👋 I'm <span className="font-medium">Gaurank&nbsp;AI</span> — ask me about his projects, skills, or journey.
              </p>
              <button
                onClick={() => setState("collapsed")}
                className="text-primary text-sm font-medium hover:underline"
              >
                Skip
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Traveling AI Icon - starts from center, travels to corner */}
      <AnimatePresence>
        {state === "traveling" && (
          <motion.div
            initial={{ 
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 110
            }}
            animate={{ 
              top: 'calc(100vh - 120px)', // Bottom position
              left: 'calc(100vw - 120px)', // Right position
              transform: 'translate(0, 0)',
              scale: isTraveling ? [1.4, 1.2, 1.0, 0.8, 1] : hasLanded ? [1, 1.15, 0.95, 1] : 1,
              boxShadow: hasLanded ? [
                "0 0 0 rgba(0,0,0,0)",
                "0 0 30px rgba(59, 130, 246, 0.5)",
                "0 0 10px rgba(59, 130, 246, 0.3)",
                "0 0 20px rgba(59, 130, 246, 0.4)",
                "0 0 0 rgba(0,0,0,0)"
              ] : "0 0 0 rgba(0,0,0,0)",
              transition: { 
                duration: isTraveling ? 1.2 : hasLanded ? 0.6 : 0.6,
                ease: isTraveling ? "easeInOut" : "easeOut",
                times: isTraveling ? [0, 0.3, 0.6, 0.8, 1] : hasLanded ? [0, 0.3, 0.6, 1] : undefined
              } 
            }}
            onAnimationComplete={() => {
              if (isTraveling && !hasLanded) {
                console.log("🎯 Travel completed - triggering bounce");
                setTimeout(() => {
                  console.log("🎯 Setting hasLanded = true");
                  setHasLanded(true);
                  setAgentLanded(true);
                  setAnimationTriggered(true);
                }, 200);
              }
              if (hasLanded) {
                // After bounce completes, transition to collapsed state
                setTimeout(() => {
                  setState("collapsed");
                }, 800);
              }
            }}
            className="w-20 h-20 md:w-18 md:h-18 rounded-full bg-primary text-background flex items-center justify-center shadow-2xl relative"
          >
            {/* Enhanced glow effect */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }}
              className="absolute inset-0 bg-primary/40 rounded-full blur-lg"
            />
            
            {/* Traveling trail effect */}
            {isTraveling && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.5, 0],
                  opacity: [0.8, 0.3, 0]
                }}
                transition={{ 
                  duration: 1.2,
                  repeat: Infinity,
                  repeatDelay: 0.3
                }}
                className="absolute inset-0 bg-blue-400/20 rounded-full blur-md"
              />
            )}
            
            {/* Landing bounce animation */}
            {hasLanded && (
              <motion.div
                initial={{ scale: 1 }}
                animate={{ 
                  scale: [1, 1.3, 0.95, 1],
                  transition: {
                    duration: 0.6,
                    ease: "easeOut",
                    times: [0, 0.3, 0.6, 1]
                  }
                }}
                className="absolute inset-0 bg-primary/30 rounded-full"
              />
            )}
            
            {/* Landing impact shadow/ripple */}
            {hasLanded && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 3, 0],
                  opacity: [1, 0.5, 0]
                }}
                transition={{ 
                  duration: 0.8,
                  delay: 0.2,
                  ease: "easeOut"
                }}
                className="absolute inset-0 bg-blue-500/30 rounded-full blur-2xl"
              />
            )}
            
            {/* Halo */}
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75 animate-ping"></span>
            <Bot className="w-8 h-8 md:w-9 md:h-9 relative" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed widget - final position */}
      {state === "collapsed" && (
        <motion.button
          initial={{ 
            opacity: 0, 
            scale: 0 
          }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.3 }
          }}
          whileHover={{ scale: 1.1 }}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 110
          }}
          className="w-20 h-20 md:w-18 md:h-18 rounded-full bg-primary text-background flex items-center justify-center shadow-2xl transition-transform group relative"
          onClick={() => setState("expanded")}
          title="Gaurank AI — Ask me anything!"
        >
          {/* Enhanced glow effect */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1
            }}
            className="absolute inset-0 bg-primary/40 rounded-full blur-lg"
          />
          
          {/* Halo */}
          <span className="absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75 animate-ping"></span>
          <Bot className="w-8 h-8 md:w-9 md:h-9 relative" />
          
          {/* Enhanced hover tooltip */}
          <div className="absolute -top-16 right-0 bg-black/90 backdrop-blur-sm text-white px-4 py-3 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl border border-white/10">
            Gaurank AI — Ask me anything!
            <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
          </div>
          
          {/* Removed badge - only hover tooltip shows */}
        </motion.button>
      )}

      {/* Expanded chat modal */}
      <AIChatbot isOpen={state === "expanded"} onClose={() => setState("collapsed")} />
    </>
  );
}; 