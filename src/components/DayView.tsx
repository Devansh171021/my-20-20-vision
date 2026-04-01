import { useState, useEffect, useRef, useCallback } from "react";
import { DayContent, DayStep } from "@/data/daysContent";
import { Progress } from "@/components/ui/progress";

interface DayViewProps {
  content: DayContent;
  onBack: () => void;
  totalDays: number;
}

const StepRenderer = ({ step, onNext }: { step: DayStep; onNext: () => void }) => {
  const [holdProgress, setHoldProgress] = useState(0);
  const holdTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const holdCompleteRef = useRef(false);

  const startHold = useCallback(() => {
    holdCompleteRef.current = false;
    setHoldProgress(0);

    holdTimerRef.current = setInterval(() => {
      setHoldProgress((prev) => {
        const next = prev + 1.5;
        if (next >= 100) {
          if (holdTimerRef.current) clearInterval(holdTimerRef.current);
          holdCompleteRef.current = true;
          return 100;
        }
        return next;
      });
    }, 30);
  }, []);

  const endHold = useCallback(() => {
    if (holdTimerRef.current) clearInterval(holdTimerRef.current);
    if (!holdCompleteRef.current) setHoldProgress(0);
  }, []);

  useEffect(() => {
    if (holdProgress >= 100) {
      const t = setTimeout(() => onNext(), 400);
      return () => clearTimeout(t);
    }
  }, [holdProgress, onNext]);

  /* ================= TEXT TYPES FIX ================= */

  if (
    step.type === "text" ||
    step.type === "tease" ||
    step.type === "reveal" ||
    step.type === "bonus"
  ) {
    return (
      <div className="animate-fade-in text-center space-y-6">
        <p
          className={`font-serif leading-relaxed whitespace-pre-line ${
            step.type === "reveal"
              ? "text-2xl md:text-3xl text-primary text-glow"
              : step.type === "bonus"
              ? "text-sm italic text-muted-foreground"
              : "text-lg text-foreground"
          }`}
        >
          {step.text}
        </p>
      </div>
    );
  }

  /* ================= HOLD ================= */

  if (step.type === "hold") {
    return (
      <div
        className="text-center space-y-6"
        onMouseDown={startHold}
        onMouseUp={endHold}
        onMouseLeave={endHold}
        onTouchStart={startHold}
        onTouchEnd={endHold}
      >
        <p className="font-serif text-lg text-muted-foreground italic whitespace-pre-line">
          {step.text}
        </p>

        <div className="w-full max-w-xs mx-auto">
          <Progress value={holdProgress} />
        </div>

        <p className="text-xs text-muted-foreground">
          hold this…
        </p>
      </div>
    );
  }

  /* ================= SPECIAL ================= */

  if (step.type === "qr-line") {
    return (
      <div className="animate-fade-in text-center">
        <p className="font-serif text-lg italic text-muted-foreground whitespace-pre-line">
          {step.text}
        </p>
      </div>
    );
  }

  return null;
};

const DayView = ({ content, onBack, totalDays }: DayViewProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentStep = content.steps[currentStepIndex];
  const progressPercent = ((currentStepIndex + 1) / content.steps.length) * 100;
  const isHoldStep = currentStep?.type === "hold";

  const handleNext = useCallback(() => {
    setCurrentStepIndex((i) => {
      if (i < content.steps.length - 1) return i + 1;
      setIsComplete(true);
      return i;
    });
  }, [content.steps.length]);

  return (
    <div className="min-h-screen flex flex-col px-6 py-6 relative z-10 romantic-backdrop">

      <div className="max-w-lg mx-auto w-full mb-2">
        <div className="flex items-center justify-between mb-3">
          <button onClick={onBack} className="text-sm">← back</button>
          <span className="text-xs">Day {content.day} of {totalDays}</span>
        </div>
        <Progress value={progressPercent} className="h-0.5" />
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full">

        <h1 className="text-3xl text-primary text-glow text-center mb-10">
          {content.emoji} {content.title}
        </h1>

        <div className="min-h-[280px] flex flex-col justify-center p-6 rounded-3xl border">

          {!isComplete && currentStep && (
            <>
              <StepRenderer
                key={currentStepIndex}
                step={currentStep}
                onNext={handleNext}
              />

              {!isHoldStep && (
                <div className="mt-8 text-center">
                  <button
                    onClick={handleNext}
                    className="px-8 py-3 rounded-full bg-primary text-primary-foreground"
                  >
                    next ♥
                  </button>
                </div>
              )}
            </>
          )}

          {isComplete && (
            <div className="text-center space-y-6">
              <p className="italic">
                tomorrow… you’re not ready for the next one
              </p>
              <button onClick={onBack}>back</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DayView;
