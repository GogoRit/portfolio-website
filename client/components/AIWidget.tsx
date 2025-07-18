import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot } from "lucide-react";
import { AIChatbot } from "./AIChatbot";
import { AIAssistantIntro } from "./AIAssistantIntro";
import { useAnimation } from "../contexts/AnimationContext";

// Finite states the widget can be in
type WidgetState = "intro" | "center-bounce" | "traveling" | "landing" | "collapsed" | "expanded";

export const AIWidget: React.FC = () => {
  const [state, setState] = useState<WidgetState>("intro");
  const [centerBounceComplete, setCenterBounceComplete] = useState(false);
  const [hasLanded, setHasLanded] = useState(false);
  const [aiPos, setAiPos] = useState({ x: 0, y: 0 });
  const iconRef = useRef<HTMLDivElement>(null);
  const { setAgentLanded, setAnimationTriggered, setShowMainPage, setAiTraveling } = useAnimation();

  // Center coordinates for travel
  const [travelCoords, setTravelCoords] = useState({ x: 0, y: 0 });

  // Calculate travel destination (bottom-right)
  useEffect(() => {
    function calcTravelCoords() {
      const margin = 32; // px from edge
      const iconSize = 80; // px (w-20)
      const winW = window.innerWidth;
      const winH = window.innerHeight;
      // Center is (0,0) in motion coordinates
      // Travel to (windowW/2 - margin - iconSize/2, windowH/2 - margin - iconSize/2)
      setTravelCoords({
        x: (winW / 2) - margin - iconSize / 2,
        y: (winH / 2) - margin - iconSize / 2
      });
    }
    calcTravelCoords();
    window.addEventListener("resize", calcTravelCoords);
    return () => window.removeEventListener("resize", calcTravelCoords);
  }, []);

  // Handle intro completion
  const handleIntroComplete = () => {
    console.log("🎬 Intro completed - starting center bounce");
    setState("center-bounce");
    document.body.style.overflow = 'auto';
    window.scrollTo(0, 0);
  };

  // Center bounce animation complete
  const handleCenterBounceComplete = () => {
    console.log("🎯 Center bounce complete - starting travel");
    setCenterBounceComplete(true);
    setTimeout(() => {
      setState("traveling");
      setAiTraveling(true);
    }, 300);
  };

  // Travel animation complete
  const handleTravelComplete = () => {
    console.log("🎯 Travel to corner complete - landing bounce");
    setState("landing");
    setAiTraveling(false);
    setTimeout(() => {
      setHasLanded(true);
      setAgentLanded(true);
      setAnimationTriggered(true);
    }, 200);
  };

  // Landing bounce complete
  const handleLandingComplete = () => {
    setTimeout(() => {
      console.log("🏁 Landing complete, calling setShowMainPage(true)");
      setShowMainPage(true);
      setState("collapsed");
    }, 600);
  };

  // Main render
  return (
    <>
      {/* New AI Assistant Intro */}
      <AnimatePresence>
        {state === "intro" && (
          <AIAssistantIntro onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {/* Cinematic Center Bounce - Step 1: Start in Center */}
      <AnimatePresence>
        {state === "center-bounce" && (
          <motion.div
            ref={iconRef}
            initial={{ x: 0, y: 0, scale: 0.8, opacity: 0 }}
            animate={{
              x: 0,
              y: [0, -24, 0, -12, 0],
              scale: [1.2, 0.9, 1.05, 1],
              opacity: 1,
              boxShadow: [
                "0 0 0 rgba(0,0,0,0)",
                "0 8px 32px 0 rgba(59,130,246,0.25)",
                "0 0 0 rgba(0,0,0,0)"
              ]
            }}
            transition={{
              y: { type: "tween", duration: 1.1, times: [0, 0.3, 0.7, 1] },
              scale: { type: "tween", duration: 1.1, times: [0, 0.3, 0.7, 1] },
              boxShadow: { duration: 0.7 },
              opacity: { duration: 0.3 },
              duration: 1.1
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              zIndex: 110,
              transform: "translate(-50%, -50%)"
            }}
            onAnimationComplete={handleCenterBounceComplete}
            className="w-20 h-20 rounded-full bg-primary text-background flex items-center justify-center shadow-2xl relative"
          >
            {/* Impact ripple */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 2.5, 0.8, 1.5, 0], opacity: [0, 0.5, 0.3, 0.2, 0] }}
              transition={{ duration: 1.1, times: [0, 0.2, 0.4, 0.7, 1] }}
              className="absolute inset-0 bg-blue-400/30 rounded-full blur-2xl pointer-events-none"
            />
            {/* Glow */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              className="absolute inset-0 bg-primary/40 rounded-full blur-lg"
            />
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75 animate-ping"></span>
            <Bot className="w-8 h-8 relative" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Travel to Corner - Step 2: Path with bounce */}
      <AnimatePresence>
        {state === "traveling" && (
          <motion.div
            ref={iconRef}
            initial={{ x: 0, y: 0, scale: 1 }}
            animate={{
              x: travelCoords.x,
              y: travelCoords.y,
              scale: [1, 1.08, 0.97, 1.04, 1],
              boxShadow: [
                "0 0 0 rgba(0,0,0,0)",
                "0 8px 32px 0 rgba(59,130,246,0.25)",
                "0 0 0 rgba(0,0,0,0)"
              ]
            }}
            transition={{
              x: { type: "spring", stiffness: 60, damping: 16 },
              y: { type: "spring", stiffness: 60, damping: 16 },
              scale: { duration: 1.5, times: [0, 0.2, 0.5, 0.8, 1] },
              boxShadow: { duration: 1.2 },
              duration: 1.5
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              zIndex: 110,
              transform: "translate(-50%, -50%)"
            }}
            onAnimationComplete={handleTravelComplete}
            className="w-20 h-20 rounded-full bg-primary text-background flex items-center justify-center shadow-2xl relative"
          >
            {/* Trail effect */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 0], opacity: [0.8, 0.3, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.3 }}
              className="absolute inset-0 bg-blue-400/20 rounded-full blur-md"
            />
            {/* Glow */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              className="absolute inset-0 bg-primary/40 rounded-full blur-lg"
            />
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75 animate-ping"></span>
            <Bot className="w-8 h-8 relative" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Landing Bounce - Step 3: Final landing with impact */}
      <AnimatePresence>
        {state === "landing" && (
          <motion.div
            ref={iconRef}
            initial={{ x: travelCoords.x, y: travelCoords.y, scale: 1 }}
            animate={{
              scale: [1, 1.18, 0.95, 1.08, 1],
              y: [travelCoords.y, travelCoords.y - 18, travelCoords.y, travelCoords.y - 7, travelCoords.y],
              boxShadow: [
                "0 0 0 rgba(0,0,0,0)",
                "0 0 30px rgba(59, 130, 246, 0.5)",
                "0 0 10px rgba(59, 130, 246, 0.3)",
                "0 0 20px rgba(59, 130, 246, 0.4)",
                "0 0 0 rgba(0,0,0,0)"
              ]
            }}
            transition={{
              scale: { type: "tween", duration: 1.1, times: [0, 0.3, 0.7, 0.9, 1] },
              y: { type: "tween", duration: 1.1, times: [0, 0.3, 0.7, 0.9, 1] },
              boxShadow: { duration: 1.1 },
              duration: 1.1
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              zIndex: 110,
              transform: "translate(-50%, -50%)"
            }}
            onAnimationComplete={handleLandingComplete}
            className="w-20 h-20 rounded-full bg-primary text-background flex items-center justify-center shadow-2xl relative"
          >
            {/* Landing impact shadow/ripple */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 3, 0], opacity: [1, 0.5, 0] }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="absolute inset-0 bg-blue-500/30 rounded-full blur-2xl"
            />
            {/* Glow */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              className="absolute inset-0 bg-primary/40 rounded-full blur-lg"
            />
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75 animate-ping"></span>
            <Bot className="w-8 h-8 relative" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed widget - final position (fixed in corner) */}
      {state === "collapsed" && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.3 } }}
          whileHover={{ scale: 1.1 }}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 110
          }}
          className="w-20 h-20 rounded-full bg-primary text-background flex items-center justify-center shadow-2xl transition-transform group relative"
          onClick={() => setState("expanded")}
          title="Gaurank AI — Ask me anything!"
        >
          {/* Enhanced glow effect */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="absolute inset-0 bg-primary/40 rounded-full blur-lg"
          />
          <span className="absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75 animate-ping"></span>
          <Bot className="w-8 h-8 relative" />
          <div className="absolute -top-16 right-0 bg-black/90 backdrop-blur-sm text-white px-4 py-3 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl border border-white/10">
            Gaurank AI — Ask me anything!
            <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
          </div>
        </motion.button>
      )}

      {/* Expanded chat modal */}
      {state === "expanded" && (
        <AIChatbot isOpen={true} onClose={() => setState("collapsed")} />
      )}
    </>
  );
}; 