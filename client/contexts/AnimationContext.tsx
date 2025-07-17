import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AnimationContextType {
  agentLanded: boolean;
  setAgentLanded: (landed: boolean) => void;
  animationTriggered: boolean;
  setAnimationTriggered: (triggered: boolean) => void;
  showMainPage: boolean;
  setShowMainPage: (show: boolean) => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};

interface AnimationProviderProps {
  children: ReactNode;
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({ children }) => {
  const [agentLanded, setAgentLanded] = useState(false);
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [showMainPage, setShowMainPage] = useState(false);

  return (
    <AnimationContext.Provider 
      value={{ 
        agentLanded, 
        setAgentLanded, 
        animationTriggered, 
        setAnimationTriggered,
        showMainPage,
        setShowMainPage
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
}; 