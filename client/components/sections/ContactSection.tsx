import React, { useState } from "react";
import { Button } from "../ui/button";
import { MessageCircle, Download } from "lucide-react";
import { AIChatbot } from "../AIChatbot";

const ContactSection: React.FC = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  return (
    <>
      <footer id="contact" className="pt-16 lg:pt-20 pb-20 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="w-6 h-6 bg-primary rounded-sm" />
              <span className="gradient-text font-bold text-lg">Gaurank</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">
              Let's Build Something Amazing Together
            </h3>
            <p className="text-muted-foreground mb-2">
              Open to opportunities in AI infrastructure, ML products, and
              full-stack development
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              gm8189@g.rit.edu • 📱 +1 (585) 957-6312 • 📍 Rochester, NY
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="glow-hover">
                <MessageCircle className="w-5 h-5 mr-2" />
                Get In Touch
              </Button>
              <Button variant="outline" size="lg">
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </Button>
            </div>
          </div>
        </div>
      </footer>
      {/* Removed in favor of global ChatWidget */}
    </>
  );
};

export default ContactSection; 