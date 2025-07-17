import React, { useState, useEffect } from "react";
import { Bot } from "lucide-react";
import { AIChatbot } from "./AIChatbot";
import { motion } from "framer-motion";

export const ChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [showBadge, setShowBadge] = useState(true);

  // Auto-hide badge after 8 seconds if not clicked
  useEffect(() => {
    const timer = setTimeout(() => setShowBadge(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1, transition: { delay: 0.8, type: 'spring', stiffness: 260, damping: 20 } }}
        onClick={() => {
          setOpen(true);
          setShowBadge(false);
        }}
        className="fixed bottom-6 right-6 z-[110] w-16 h-16 md:w-14 md:h-14 rounded-full bg-primary text-background flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
      >
        {/* Pulse halo */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75 animate-ping pointer-events-none"></span>
        <Bot className="w-7 h-7 relative" />
        {showBadge && (
          <span className="absolute -top-2 -left-2 bg-accent text-background text-[10px] px-2 py-0.5 rounded-full animate-bounce">
            Ask me!
          </span>
        )}
      </motion.button>

      {/* Chat Modal */}
      <AIChatbot isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}; 