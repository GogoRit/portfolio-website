import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "../components/sections/HeroSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import TimelineSection from "../components/sections/TimelineSection";
import NowSection from "../components/sections/NowSection";
import SkillsSection from "../components/sections/SkillsSection";
import ContactSection from "../components/sections/ContactSection";
import { AnimatedSection } from "../components/AnimatedSection";
import { useAnimation } from "../contexts/AnimationContext";

export default function Index() {
  const { showMainPage, animationTriggered, aiTraveling } = useAnimation();
  console.log("Index.tsx: showMainPage =", showMainPage);

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence>
        {showMainPage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut"
            }}
            className="w-full"
          >
            {/* Hero Section - First to appear as AI icon starts traveling */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ 
                opacity: showMainPage ? 1 : 0, 
                y: showMainPage ? 0 : 40, 
                scale: showMainPage ? 1 : 0.9 
              }}
              transition={{ 
                duration: 1.2, 
                ease: "easeOut",
                delay: 0.1
              }}
            >
              <HeroSection />
            </motion.div>
            
            {/* Projects Section - Appears with energy from AI bounce */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ 
                opacity: showMainPage ? 1 : 0, 
                y: showMainPage ? 0 : 30, 
                scale: showMainPage ? 1 : 0.95 
              }}
              transition={{ 
                duration: 1.0, 
                ease: "easeOut", 
                delay: 0.6
              }}
            >
              <ProjectsSection />
            </motion.div>
            
            {/* Timeline Section - Wakes up with landing energy */}
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.97 }}
              animate={{ 
                opacity: showMainPage ? 1 : 0, 
                y: showMainPage ? 0 : 25, 
                scale: showMainPage ? 1 : 0.97 
              }}
              transition={{ 
                duration: 0.9, 
                ease: "easeOut", 
                delay: 1.1
              }}
            >
              <TimelineSection />
            </motion.div>
            
            {/* Now Section - Final sections with landing impact */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ 
                opacity: showMainPage ? 1 : 0, 
                y: showMainPage ? 0 : 20, 
                scale: showMainPage ? 1 : 0.98 
              }}
              transition={{ 
                duration: 0.8, 
                ease: "easeOut", 
                delay: 1.6
              }}
            >
              <NowSection />
            </motion.div>
            
            {/* Skills Section - Cascading reveal */}
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.99 }}
              animate={{ 
                opacity: showMainPage ? 1 : 0, 
                y: showMainPage ? 0 : 15, 
                scale: showMainPage ? 1 : 0.99 
              }}
              transition={{ 
                duration: 0.7, 
                ease: "easeOut", 
                delay: 2.0
              }}
            >
              <SkillsSection />
            </motion.div>
            
            {/* Contact Section - Final reveal */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.995 }}
              animate={{ 
                opacity: showMainPage ? 1 : 0, 
                y: showMainPage ? 0 : 10, 
                scale: showMainPage ? 1 : 0.995 
              }}
              transition={{ 
                duration: 0.6, 
                ease: "easeOut", 
                delay: 2.4
              }}
            >
              <ContactSection />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
