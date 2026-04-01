import { useState, useEffect, useRef, useCallback } from "react";
import { DayContent, DayStep } from "@/data/daysContent";
import { Progress } from "@/components/ui/progress";

interface DayViewProps {
  content: DayContent;
  onBack: () => void;
  totalDays: number;
}

const SplitView = ({ left, right }: { left: string[]; right: string[] }) => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <h3 className="font-serif text-xs uppercase tracking-widest text-muted-foreground mb-6">
            What you think
          </h3>
          <div className="space-y-4">
            {left.map((item, i) => (
              <p
                key={i}
                className="text-muted-foreground/70 font-sans text-sm line-through decoration-rose-soft/50"
              >
                {item}
              </p>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h3 className="font-serif text-xs uppercase tracking-widest text-primary mb-6">
            What I see
          </h3>
          <div className="space-y-4">
            {right.map((item, i) => (
              <p
                key={i}
                className="text-foreground font-sans text-sm transition-all duration-700"
                style={{
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? "translateX(0)" : "translateX(20px)",
                  transitionDelay: `${i * 300}ms`,
                }}
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

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
    if (!holdCompleteRef.current) {
      setHoldProgress(0);
    }
  }, []);

  useEffect(() => {
    if (holdProgress >= 100) {
      const t = setTimeout(() => onNext(), 400);
      return () => clearTimeout(t);
    }
  }, [holdProgress, onNext]);

  if (step.type === "split") {
    return <SplitView left={step.left || []} right={step.right || []} />;
  }

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
        <p className="font-serif text-lg text-muted-foreground italic">
          {step.text}
        </p>
        <div className="w-full max-w-xs mx-auto">
          <Progress value={holdProgress} />
        </div>
        <p className="text-xs text-muted-foreground">hold to continue</p>
      </div>
    );
  }

  if (step.type === "text") {
    return (
      <div className="animate-fade-in text-center">
        <p className="font-serif text-lg leading-relaxed text-foreground whitespace-pre-line">
          {step.text}
        </p>
      </div>
    );
  }

  if (step.type === "qr-line") {
    return (
      <div className="animate-fade-in text-center">
        <p className="font-serif text-lg leading-relaxed text-muted-foreground italic whitespace-pre-line">
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
      {/* Top bar */}
      <div className="max-w-lg mx-auto w-full mb-2">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-sans"
          >
            ← back
          </button>
          <span className="text-xs text-muted-foreground font-sans tracking-widest">
            Day {content.day} of {totalDays}
          </span>
        </div>
        <Progress value={progressPercent} className="h-0.5 bg-muted/20" />
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full">
        <div className="mb-2 text-muted-foreground text-sm font-sans tracking-widest uppercase text-center">
          Day {content.day}
        </div>

        <h1 className="font-serif text-3xl md:text-4xl text-glow mb-12 text-primary text-center">
          {content.emoji} {content.title}
        </h1>

        <div className="text-foreground/90 min-h-[280px] flex flex-col justify-center romantic-card p-6 md:p-10 rounded-3xl border border-primary/20">
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
                    className="px-8 py-3 rounded-full bg-primary/90 text-primary-foreground font-serif text-sm md:text-base tracking-wide shadow-lg shadow-primary/25 hover:bg-primary transition-all duration-300"
                  >
                    next ♥
                  </button>
                </div>
              )}
            </>
          )}

          {isComplete && (
            <div className="animate-fade-in text-center space-y-8">
              <p className="font-serif text-2xl text-primary text-glow">✦</p>
              <p className="font-serif text-sm text-muted-foreground italic">
                see you tomorrow…
              </p>
              <button
                onClick={onBack}
                className="px-8 py-3 glass-card rounded-full text-sm text-muted-foreground hover:text-foreground transition-all duration-300"
              >
                back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DayView;
