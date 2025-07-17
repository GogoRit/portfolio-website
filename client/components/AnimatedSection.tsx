import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAnimation } from "../contexts/AnimationContext";

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  delay = 0, 
  className = "" 
}) => {
  const { agentLanded, animationTriggered } = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (agentLanded && animationTriggered && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [agentLanded, animationTriggered, hasAnimated]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{
        opacity: hasAnimated ? 1 : 0,
        y: hasAnimated ? 0 : 30,
        scale: hasAnimated ? 1 : 0.95,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 10,
          delay: hasAnimated ? delay : 0,
          duration: 0.8
        }
      }}
      whileHover={hasAnimated ? {
        scale: 1.02,
        y: -2,
        transition: { duration: 0.2, type: "spring", stiffness: 300 }
      } : {}}
      className={className}
    >
      {children}
    </motion.div>
  );
}; 