import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MainPageRevealProps {
  children: React.ReactNode;
  isVisible: boolean;
}

// Staggered animation variants for sections
const sectionVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Container variants for overall reveal
const containerVariants = {
  hidden: { 
    opacity: 0,
    y: 10 // Slight upward movement for smoother entrance
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8, // Increased from 0.6 for smoother fade
      ease: "easeOut",
      staggerChildren: 0.1, // Reduced from 0.15 to 0.1 for faster reveal
      delayChildren: 0.3 // Increased from 0.2 to 0.3 to ensure proper fade-in timing
    }
  }
};

export const MainPageReveal: React.FC<MainPageRevealProps> = ({ children, isVisible }) => {
  const [sections, setSections] = useState<HTMLElement[]>([]);
  const [revealedSections, setRevealedSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isVisible) {
      // Get all main sections
      const sectionElements = document.querySelectorAll('section[id]') as NodeListOf<HTMLElement>;
      const sectionsArray = Array.from(sectionElements);
      setSections(sectionsArray);

      // Reveal sections one by one with faster Apple-style delays
      sectionsArray.forEach((section, index) => {
        setTimeout(() => {
          setRevealedSections(prev => new Set([...prev, section.id]));
        }, index * 100); // Reduced from 150ms to 100ms for faster reveal
      });
    }
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child) && child.props.id) {
            const sectionId = child.props.id;
            const isRevealed = revealedSections.has(sectionId);
            
            return (
              <motion.div
                key={sectionId}
                variants={sectionVariants}
                custom={index}
                className="w-full"
              >
                {child}
              </motion.div>
            );
          }
          return (
            <motion.div
              key={index}
              variants={sectionVariants}
              custom={index}
              className="w-full"
            >
              {child}
            </motion.div>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
}; 