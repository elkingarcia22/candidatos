import React, { createContext, useContext, useState, ReactNode } from 'react';

interface OnboardingContextType {
  isWelcomeOpen: boolean;
  isTourActive: boolean;
  currentStep: number;
  isFeedbackModalOpen: boolean;
  isFeedbackAutoOpened: boolean;
  startTour: () => void;
  finishTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  openFeedback: () => void;
  closeFeedback: () => void;
  setWelcomeOpen: (open: boolean) => void;
  setTourActive: (active: boolean) => void;
  setCurrentStep: (step: number) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  isSerenaActive: boolean;
  setSerenaActive: (active: boolean) => void;
  isEditMode: boolean;
  setEditMode: (edit: boolean) => void;
  isInsideVacancy: boolean;
  setInsideVacancy: (inside: boolean) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(true);
  const [isTourActive, setIsTourActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isFeedbackAutoOpened, setIsFeedbackAutoOpened] = useState(false);
  const [activeSection, setActiveSection] = useState('generalInfo');
  const [isSerenaActive, setIsSerenaActive] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isInsideVacancy, setIsInsideVacancy] = useState(false);

  const startTour = () => {
    setIsWelcomeOpen(false);
    setIsTourActive(true);
    setCurrentStep(0);
  };

  const finishTour = () => {
    console.log('[OnboardingContext] finishTour called. Setting isFeedbackAutoOpened to true');
    setIsTourActive(false);
    setCurrentStep(0);
    setIsFeedbackAutoOpened(true);
    setIsFeedbackModalOpen(true);
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => (prev > 0 ? prev - 1 : 0));
  
  const openFeedback = () => {
    console.log('[OnboardingContext] openFeedback called manually. Setting isFeedbackAutoOpened to false');
    setIsFeedbackAutoOpened(false);
    setIsFeedbackModalOpen(true);
  };
  const closeFeedback = () => setIsFeedbackModalOpen(false);

  const value = React.useMemo(() => ({
    isWelcomeOpen,
    isTourActive,
    currentStep,
    isFeedbackModalOpen,
    isFeedbackAutoOpened,
    isSerenaActive,
    setSerenaActive: setIsSerenaActive,
    isEditMode,
    setEditMode: setIsEditMode,
    isInsideVacancy,
    setInsideVacancy: setIsInsideVacancy,
    startTour,
    finishTour,
    nextStep,
    prevStep,
    openFeedback,
    closeFeedback,
    setWelcomeOpen: setIsWelcomeOpen,
    setTourActive: setIsTourActive,
    setCurrentStep,
    activeSection,
    setActiveSection,
  }), [
    isWelcomeOpen,
    isTourActive,
    currentStep,
    isFeedbackModalOpen,
    isFeedbackAutoOpened,
    isSerenaActive,
    isEditMode,
    isInsideVacancy,
    activeSection,
  ]);

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
