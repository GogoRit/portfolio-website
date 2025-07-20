import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { AIChatbot } from "./AIChatbot";
import { useAnimation } from "../contexts/AnimationContext";
import { useTooltipPosition } from "./ui/tooltip";
import ReactDOM from "react-dom";
import { createPortal } from "react-dom";

// Bitmoji avatar path
const BITMOJI_AVATAR = "/icons/bitmoji.png";

export const AIWidget: React.FC = () => {
  const [showChat, setShowChat] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showWelcomeCloud, setShowWelcomeCloud] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isWidgetVisible, setIsWidgetVisible] = useState(false);
  const [widgetDimensions, setWidgetDimensions] = useState({ width: 80, height: 80 });
  const [isDragging, setIsDragging] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<'left' | 'right' | 'top' | 'bottom'>('left');
  const { showMainPage } = useAnimation();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const tooltipTimerRef = useRef<NodeJS.Timeout | null>(null);
  const controls = useAnimationControls();
  const widgetRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Define margin constant for consistent edge padding
  const MARGIN = 16;
  const NAVBAR_HEIGHT = 80; // Approximate height of the navigation bar

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Coordinate timing with main content reveal
  useEffect(() => {
    if (showMainPage && isClient) {
      // Delay widget appearance by 200ms to let main content render first
      const widgetTimer = setTimeout(() => {
        setIsWidgetVisible(true);
      }, 200);

      return () => {
        if (widgetTimer) {
          clearTimeout(widgetTimer);
        }
      };
    }
  }, [showMainPage, isClient]);

  // Calculate widget dimensions and set initial position to bottom-right
  useEffect(() => {
    if (isClient && widgetRef.current) {
      const rect = widgetRef.current.getBoundingClientRect();
      setWidgetDimensions({ width: rect.width, height: rect.height });
      
      // Always initialize at bottom-right corner with proper margins
      // Account for navbar height at the top
      const widgetWidth = rect.width;
      const widgetHeight = rect.height;
      const initialX = window.innerWidth - widgetWidth - MARGIN;
      const initialY = window.innerHeight - widgetHeight - MARGIN;
      
      console.log('AIWidget: Setting initial position:', { initialX, initialY, windowWidth: window.innerWidth, windowHeight: window.innerHeight });
      
      // Add a small delay to ensure the widget is rendered before setting position
      setTimeout(() => {
        controls.set({ x: initialX, y: initialY });
        console.log('AIWidget: Controls set to:', { x: initialX, y: initialY });
      }, 100);
    }
  }, [isClient, controls, MARGIN]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (widgetRef.current) {
        const rect = widgetRef.current.getBoundingClientRect();
        setWidgetDimensions({ width: rect.width, height: rect.height });
        
        // Update position on resize to maintain corner positioning
        const widgetWidth = rect.width;
        const widgetHeight = rect.height;
        const newX = window.innerWidth - widgetWidth - MARGIN;
        const newY = window.innerHeight - widgetHeight - MARGIN;
        
        controls.set({ x: newX, y: newY });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (tooltipTimerRef.current) {
        clearTimeout(tooltipTimerRef.current);
      }
    };
  }, [controls, MARGIN]);

  // Persistent welcome cloud logic - shows after intro and stays until clicked
  useEffect(() => {
    console.log('AIWidget: Component mounted, showMainPage:', showMainPage);
    
    // Since AIWidget only mounts after intro completes, we can show cloud immediately
    const hasSeenWelcome = sessionStorage.getItem('ai-widget-welcome-seen');
    console.log('AIWidget: hasSeenWelcome:', hasSeenWelcome);
    
    if (!hasSeenWelcome && isWidgetVisible) {
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
  }, [isWidgetVisible]); // Only run when widget becomes visible

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

  // Handle mouse enter with delay for tooltip
  const handleMouseEnter = () => {
    if (!showWelcomeCloud && !isDragging) {
      // Clear any existing timer
      if (tooltipTimerRef.current) {
        clearTimeout(tooltipTimerRef.current);
      }
      // Show tooltip after 300ms delay
      tooltipTimerRef.current = setTimeout(() => {
        setShowTooltip(true);
      }, 300);
    }
  };

  // Handle mouse leave - immediate hide
  const handleMouseLeave = () => {
    if (tooltipTimerRef.current) {
      clearTimeout(tooltipTimerRef.current);
    }
    setShowTooltip(false);
  };

  // Handle drag end - snap to nearest edge and calculate tooltip position
  const handleDragEnd = (event: any, info: any) => {
    if (!widgetRef.current) return;
    
    setIsDragging(false);
    setShowTooltip(false); // Reset tooltip on drag end
    
    const { width: widgetWidth, height: widgetHeight } = widgetDimensions;
    const { x, y } = info.point;
    
    // Calculate distances to each edge with margin consideration
    const leftDist = x - MARGIN;
    const rightDist = (window.innerWidth - MARGIN) - (x + widgetWidth);
    const topDist = y - (NAVBAR_HEIGHT + MARGIN);
    const bottomDist = (window.innerHeight - MARGIN) - (y + widgetHeight);
    
    // Find the minimum distance to determine nearest edge
    const distances = [
      { edge: 'left', distance: leftDist },
      { edge: 'right', distance: rightDist },
      { edge: 'top', distance: topDist },
      { edge: 'bottom', distance: bottomDist }
    ];
    
    const nearestEdge = distances.reduce((min, current) => 
      current.distance < min.distance ? current : min
    );
    
    // Calculate target position based on nearest edge with proper margins
    let targetX = x;
    let targetY = y;
    
    // Special handling for bottom-right corner and bottom edge
    const isNearBottom = bottomDist < 100; // Within 100px of bottom
    const isNearRight = rightDist < 100; // Within 100px of right
    
    if (isNearBottom && isNearRight) {
      // Bottom-right corner: position above and to the left of the widget
      targetX = window.innerWidth - widgetWidth - MARGIN;
      targetY = window.innerHeight - widgetHeight - MARGIN;
      setTooltipPosition('top-left'); // Tooltip above and to the left when widget is at bottom-right
    } else if (isNearBottom) {
      // Near bottom edge: always position above
      targetY = window.innerHeight - widgetHeight - MARGIN;
      setTooltipPosition('top'); // Tooltip above when widget is near bottom
    } else {
      switch (nearestEdge.edge) {
        case 'left':
          targetX = MARGIN;
          setTooltipPosition('right'); // Tooltip on right when widget is on left
          break;
        case 'right':
          targetX = window.innerWidth - widgetWidth - MARGIN;
          setTooltipPosition('left'); // Tooltip on left when widget is on right
          break;
        case 'top':
          targetY = NAVBAR_HEIGHT + MARGIN; // Snap below navbar
          setTooltipPosition('bottom'); // Tooltip below when widget is on top
          break;
        case 'bottom':
          targetY = window.innerHeight - widgetHeight - MARGIN;
          setTooltipPosition('top'); // Tooltip above when widget is on bottom
          break;
      }
    }
    
    // Clamp position to keep widget in viewport with margins
    targetX = Math.max(MARGIN, Math.min(targetX, window.innerWidth - widgetWidth - MARGIN));
    targetY = Math.max(NAVBAR_HEIGHT + MARGIN, Math.min(targetY, window.innerHeight - widgetHeight - MARGIN));
    
    // Animate to snapped position
    controls.start({
      x: targetX,
      y: targetY,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    });
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
            onError={(e) => {
              console.log('AIWidget: Bitmoji image failed to load, using fallback');
              const target = e.target as HTMLImageElement;
              target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23007aff'/%3E%3Cpath d='M30 40c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10zm20 0c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10z' fill='white'/%3E%3C/svg%3E";
            }}
            onLoad={() => {
              console.log('AIWidget: Bitmoji image loaded successfully');
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

  // Use the shared hook to determine the best side for the tooltip
  const bestTooltipSide = useTooltipPosition(widgetRef, tooltipRef, tooltipPosition, 8);

  // Don't render until we're on the client side and widget should be visible
  if (!isClient || !isWidgetVisible) {
    return null;
  }

  // Calculate responsive position for both web and mobile
  const widgetWidth = 80; // Base widget width
  const widgetHeight = 80; // Base widget height
  const calculatedX = window.innerWidth - widgetWidth - MARGIN;
  const calculatedY = window.innerHeight - widgetHeight - MARGIN;
  console.log('AIWidget: Rendering widget, isClient:', isClient, 'showMainPage:', showMainPage, 'isWidgetVisible:', isWidgetVisible, 'widgetDimensions:', widgetDimensions);
  console.log('AIWidget: Calculated position:', { calculatedX, calculatedY, windowWidth: window.innerWidth, windowHeight: window.innerHeight });

  return (
    <>
      {/* Draggable Chat Widget - Bottom Right */}
      <motion.div
        ref={widgetRef}
        initial={{ 
          opacity: 0, 
          scale: 0.8,
          x: calculatedX,
          y: calculatedY
        }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          x: calculatedX,
          y: calculatedY
        }}
        transition={{
          opacity: { duration: 0.3, ease: "easeOut" },
          scale: { 
            type: "spring", 
            stiffness: 500, 
            damping: 20, 
            duration: 0.8 
          },
          x: { duration: 0 }, // No movement, just scale
          y: { duration: 0 }  // No movement, just scale
        }}
        drag
        dragConstraints={{ 
          top: NAVBAR_HEIGHT + MARGIN, // Start below navbar
          left: MARGIN,
          right: window.innerWidth - widgetWidth - MARGIN,
          bottom: window.innerHeight - widgetHeight - MARGIN
        }}
        dragElastic={0.2}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        whileDrag={{ 
          cursor: 'grabbing',
          zIndex: 9999,
          scale: 1.05
        }}
        whileHover={{ 
          cursor: 'grab',
          scale: 1.02
        }}
        className="fixed w-16 h-16 md:w-20 md:h-20 z-[9999] cursor-grab"
        style={{ 
          touchAction: 'none'
        }}
      >
        <motion.button
          className="w-full h-full group"
          onClick={handleChatClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
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
          
          {/* Dynamic hover tooltip with edge-aware positioning */}
          <AnimatePresence>
            {showTooltip && !showWelcomeCloud && !isDragging && tooltipRef.current && widgetRef.current &&
              createPortal(
                <motion.div
                  ref={tooltipRef}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  style={{
                    position: 'fixed',
                    zIndex: 9999,
                    left: bestTooltipSide.x,
                    top: bestTooltipSide.y,
                  }}
                  className="px-4 py-3 bg-appleGlass/95 backdrop-blur-apple rounded-apple-lg border border-white/30 shadow-apple-lg text-sm font-medium text-graphite max-w-xs whitespace-nowrap"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    <span className="text-graphite font-medium">Gaurank AI</span>
                  </div>
                  <div className="text-graphite/80 text-xs mt-1">
                    Ask me anything!
                  </div>
                  {/* Dynamic tooltip arrow (optional, can be improved for portal) */}
                </motion.div>,
                document.body
              )
            }
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Responsive Expanded Chat Interface */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed z-50 flex justify-center items-end sm:items-center inset-0 pointer-events-auto"
            style={{ background: 'none' }} // Remove any overlay background
          >
            <div
              className="w-[calc(100%-1rem)] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto h-auto max-h-[80vh] bg-appleGlass/90 backdrop-blur-apple rounded-apple-lg border border-white/20 shadow-apple-lg overflow-hidden flex flex-col"
            >
              <AIChatbot isOpen={showChat} onClose={handleCloseChat} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}; 