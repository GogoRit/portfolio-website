import React from "react";
import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Navigation from "./components/Navigation";
import { AIWidget } from "./components/AIWidget";
import { AnimationProvider, useAnimation } from "./contexts/AnimationContext";
import { AppleIntroAnimation } from "./components/AppleIntroAnimation";
import { MainPageReveal } from "./components/MainPageReveal";

const queryClient = new QueryClient();

const AppContent = () => {
  const { showMainPage, setShowMainPage } = useAnimation();

  const handleIntroComplete = () => {
    setShowMainPage(true);
  };

  return (
    <>
      {/* Apple-style intro animation */}
      {!showMainPage && (
        <AppleIntroAnimation onComplete={handleIntroComplete} />
      )}
      
      {/* Main content - only render after intro completes */}
      {showMainPage && (
        <BrowserRouter>
          <Navigation />
          <AIWidget />
          <MainPageReveal isVisible={showMainPage}>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainPageReveal>
        </BrowserRouter>
      )}
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AnimationProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppContent />
        </TooltipProvider>
      </AnimationProvider>
    </QueryClientProvider>
  );
};

export default App;

createRoot(document.getElementById("root")!).render(<App />);
