import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AIChatbot } from "./AIChatbot";
import { useAnimation } from "../contexts/AnimationContext";

// Bitmoji avatar path
const BITMOJI_AVATAR = "/icons/bitmoji.png";

export const AIWidget: React.FC = () => {
  const [showChat, setShowChat] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showWelcomeCloud, setShowWelcomeCloud] = useState(false);
  const { showMainPage } = useAnimation();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Persistent welcome cloud logic - shows after intro and stays until clicked
  useEffect(() => {
    console.log('AIWidget: Component mounted, showMainPage:', showMainPage);
    
    // Since AIWidget only mounts after intro completes, we can show cloud immediately
    const hasSeenWelcome = sessionStorage.getItem('ai-widget-welcome-seen');
    console.log('AIWidget: hasSeenWelcome:', hasSeenWelcome);
    
    if (!hasSeenWelcome) {
      console.log('AIWidget: Setting up welcome cloud timer');
      
      // Show welcome cloud after a short delay (since we're already after intro)
      timerRef.current = setTimeout(() => {
        console.log('AIWidget: Showing welcome cloud');
        setShowWelcomeCloud(true);
      }, 1000); // 1 second delay after widget appears
    } else {
      console.log('AIWidget: Welcome cloud already seen, not showing');
    }

    // Cleanup function to clear timers on unmount
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []); // Only run once when component mounts

  // Handle chat click - hide welcome cloud when user opens chat
  const handleChatClick = () => {
    setShowChat(true);
    // Hide the welcome cloud when user clicks to open chat
    if (showWelcomeCloud) {
      setShowWelcomeCloud(false);
      sessionStorage.setItem('ai-widget-welcome-seen', 'true');
      console.log('AIWidget: Welcome cloud dismissed by user click');
    }
  };

  const handleCloseChat = () => {
    setShowChat(false);
  };

  // Apple-style Bitmoji Avatar Component with 3D effects
  const BitmojiAvatar = ({ className = "" }: { className?: string }) => (
    <div className={`relative ${className}`}>
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
    </div>
  );

  return (
    <>
      {/* Fixed Chat Widget - Bottom Right */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed bottom-8 right-8 w-16 h-16 md:w-20 md:h-20 z-50 group"
        onClick={handleChatClick}
        onMouseEnter={() => !showWelcomeCloud && setShowTooltip(true)}
        onMouseLeave={() => !showWelcomeCloud && setShowTooltip(false)}
      >
        {/* Apple-style notification ring */}
        <motion.div
          className="absolute inset-0 rounded-full bg-blue-500/30 border-2 border-blue-500/60"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.3, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Secondary notification ring */}
        <motion.div
          className="absolute inset-0 rounded-full bg-blue-400/20 border border-blue-400/40"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 0.1, 0.4]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />

        <BitmojiAvatar className="w-full h-full transition-all duration-apple ease-apple-ease group-hover:scale-105 group-hover:shadow-apple-lg relative z-10" />
        
        {/* Welcome Cloud - Apple Messages-style blue cloud (persistent until clicked) */}
        <AnimatePresence>
          {showWelcomeCloud && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              transition={{ 
                duration: 0.5, 
                ease: "easeInOut",
                exit: { duration: 0.3, ease: "easeInOut" }
              }}
              className="absolute bottom-24 right-6 bg-blue-500/95 backdrop-blur-sm rounded-2xl p-4 max-w-xs shadow-lg border border-blue-400/30 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the button click
                handleChatClick();
              }}
            >
              {/* Cloud tail pointing to chat icon */}
              <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-500/95" />
              
              {/* Message content */}
              <div className="text-white text-sm font-medium leading-snug whitespace-nowrap">
                Meet Gaurank AI — Ask me anything!
              </div>
              
              {/* Subtle pulse animation to draw attention */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-blue-400/20"
                animate={{
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Regular hover tooltip (only when welcome cloud is not showing) */}
        <AnimatePresence>
          {showTooltip && !showWelcomeCloud && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute bottom-full right-0 mb-3 px-4 py-2 bg-appleGlass/90 backdrop-blur-apple rounded-full border border-white/20 shadow-apple-lg text-sm font-medium text-graphite whitespace-nowrap"
            >
              Gaurank AI — Ask me anything!
              {/* Tooltip arrow */}
              <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-appleGlass/90" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Expanded chat interface */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-4 md:inset-8 z-50"
          >
            <div className="w-full h-full backdrop-blur-apple bg-appleGlass/90 rounded-apple-lg border border-white/20 shadow-apple-lg overflow-hidden">
              <AIChatbot isOpen={showChat} onClose={handleCloseChat} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}; 