import React, { useEffect } from "react";
import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import CaseStudy from "./pages/CaseStudy";
import NotFound from "./pages/NotFound";
import Navigation from "./components/Navigation";
import { AIWidget } from "./components/AIWidget";
import { ErrorBoundary } from "./components/ErrorBoundary";

const queryClient = new QueryClient();

// Scroll restoration component that handles route changes
const ScrollRestoration = () => {
  const location = useLocation();

  useEffect(() => {
    // Ensure we're in browser environment
    if (typeof window === 'undefined') return;

    const isCaseStudyPage = location.pathname.startsWith("/case-study/");
    
    if (isCaseStudyPage) {
      // Scroll to top when entering case study page - wait for render to complete
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        try {
          window.scrollTo({ top: 0, behavior: "auto" });
          // Also try after a brief delay to ensure it sticks
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "auto" });
          }, 100);
        } catch (error) {
          console.warn('Scroll restoration error:', error);
        }
      });
    } else if (location.pathname === "/") {
      // Restore scroll position when returning to home page
      // Wait a bit for the page to render before attempting scroll restoration
      const restoreScrollPosition = () => {
        try {
          // Check both sessionStorage and location.state for scroll position
          const savedScrollPosition = sessionStorage.getItem("timelineScrollPosition") || 
                                     (location.state as any)?.scrollPosition?.toString();
          
          if (savedScrollPosition) {
            const scrollPosition = parseInt(savedScrollPosition, 10);
            if (!isNaN(scrollPosition) && scrollPosition > 0) {
              // Use multiple attempts to ensure scroll happens after DOM is ready
              const restoreScroll = () => {
                try {
                  window.scrollTo({ top: scrollPosition, behavior: "auto" });
                } catch (error) {
                  console.warn('Scroll restore error:', error);
                }
              };
              
              // Wait for next frame, then try multiple times
              requestAnimationFrame(() => {
                restoreScroll();
                // Also try after delays to handle slow renders
                setTimeout(restoreScroll, 50);
                setTimeout(restoreScroll, 150);
                setTimeout(restoreScroll, 300);
                setTimeout(restoreScroll, 500);
              });
              
              // Clear after ensuring restoration happens (with sufficient delay)
              setTimeout(() => {
                try {
                  sessionStorage.removeItem("timelineScrollPosition");
                } catch (error) {
                  console.warn('SessionStorage clear error:', error);
                }
              }, 600);
            }
          }
        } catch (error) {
          console.warn('Scroll restoration error:', error);
        }
      };
      
      // Delay restoration to ensure page is rendered
      setTimeout(restoreScrollPosition, 0);
    }
  }, [location.pathname]);

  return null;
};

const AppContent = () => {
  return (
    <>
      {/* Main content */}
      <BrowserRouter>
        <ErrorBoundary>
          <ScrollRestoration />
          <Navigation />
          <AIWidget />
          <Routes>
            <Route 
              path="/" 
              element={
                <ErrorBoundary>
                  <Index />
                </ErrorBoundary>
              } 
            />
            <Route 
              path="/case-study/:slug" 
              element={
                <ErrorBoundary>
                  <CaseStudy />
                </ErrorBoundary>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route 
              path="*" 
              element={
                <ErrorBoundary>
                  <NotFound />
                </ErrorBoundary>
              } 
            />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

createRoot(document.getElementById("root")!).render(<App />);
