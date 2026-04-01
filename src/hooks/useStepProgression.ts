import { useEffect, useState } from 'react';

export type StepType = 'tease' | 'hold' | 'reveal' | 'bonus' | 'voice' | 'photo';

export interface StepState {
  currentStep: StepType;
  isComplete: boolean;
  progress: number;
}

const STEP_TIMINGS: Record<StepType, number> = {
  tease: 2000,
  hold: 0, // manual
  reveal: 2400,
  bonus: 2000,
  voice: 4000,
  photo: 2500,
};

export const useStepProgression = (
  hasBonus: boolean,
  hasVoice: boolean,
  hasPhoto: boolean,
  onStepChange?: (step: StepType) => void
) => {
  const [currentStep, setCurrentStep] = useState<StepType>('tease');
  const [isHolding, setIsHolding] = useState(false);

  const steps: StepType[] = ['tease', 'hold', 'reveal'];

  if (hasBonus) steps.push('bonus');
  if (hasVoice) steps.push('voice');
  if (hasPhoto) steps.push('photo');

  useEffect(() => {
    onStepChange?.(currentStep);
  }, [currentStep, onStepChange]);

  useEffect(() => {
    if (currentStep === 'hold' || isHolding) return;

    const duration = STEP_TIMINGS[currentStep];
    if (duration === 0) return;

    const timer = setTimeout(() => {
      const currentIndex = steps.indexOf(currentStep);
      if (currentIndex < steps.length - 1) {
        setCurrentStep(steps[currentIndex + 1]);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [currentStep, isHolding, steps]);

  const handleHoldComplete = () => {
    setIsHolding(false);
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const moveToNextStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  return {
    currentStep,
    isHolding,
    setIsHolding,
    handleHoldComplete,
    moveToNextStep,
    steps,
  };
};
