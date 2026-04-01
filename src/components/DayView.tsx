import { useState, useRef, useCallback } from "react";
import { DayContent, DayStep } from "@/data/daysContent";
import { Progress } from "@/components/ui/progress";

interface DayViewProps {
  content: DayContent;
  onBack: () => void;
  totalDays: number;
}

const SplitView = ({ left, right }: { left: string[]; right: string[] }) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <h3 className="font-serif text-xs uppercase tracking-widest text-cream-dim mb-6">
            What you think you are
          </h3>
          <div className="space-y-4">
            {left.map((item, i) => (
              <p key={i} className="text-cream-dim/70 font-sans text-sm line-through decoration-rose-soft/50">
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="text-center">
          <h3 className="font-serif text-xs uppercase tracking-widest text-primary mb-6">
            What you actually are
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
      {!revealed && (
        <button
          onClick={() => setRevealed(true)}
          className="mx-auto block px-6 py-3 glass-card rounded-full text-sm text-cream-dim 
            hover:text-foreground transition-all duration-300"
        >
          reveal the truth…
        </button>
      )}
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
        const next = prev + 2;
        if (next >= 100) {
          if (holdTimerRef.current) clearInterval(holdTimerRef.current);
          holdCompleteRef.current = true;
          setTimeout(onNext, 300);
          return 100;
        }
        return next;
      });
    }, 30);
  }, [onNext]);

  const endHold = useCallback(() => {
    if (holdTimerRef.current) clearInterval(holdTimerRef.current);
    if (!holdCompleteRef.current) {
      setHoldProgress(0);
    }
  }, []);

  if (step.type === "tease") {
    return (
      <div className="animate-fade-in">
        <p className="font-serif text-xl md:text-2xl leading-relaxed text-foreground/90 mb-8">
          {step.text}
        </p>
        <button
          onClick={onNext}
          className="px-6 py-3 glass-card rounded-full text-sm text-cream-dim 
            hover:text-foreground transition-all duration-300 hover:border-primary/30"
        >
          tap to continue…
        </button>
      </div>
    );
  }

  if (step.type === "tap") {
    return (
      <div className="animate-fade-in">
        <p className="font-serif text-xl md:text-2xl leading-relaxed text-foreground/90 mb-8">
          {step.text}
        </p>
        <button
          onClick={onNext}
          className="px-6 py-3 glass-card rounded-full text-sm text-cream-dim 
            hover:text-foreground transition-all duration-300 hover:border-primary/30"
        >
          tap…
        </button>
      </div>
    );
  }

  if (step.type === "hold") {
    return (
      <div className="animate-fade-in">
        <p className="font-serif text-xl md:text-2xl leading-relaxed text-foreground/90 mb-8">
          {step.text}
        </p>
        <div className="space-y-3">
          <button
            onMouseDown={startHold}
            onMouseUp={endHold}
            onMouseLeave={endHold}
            onTouchStart={startHold}
            onTouchEnd={endHold}
            className="px-8 py-4 glass-card rounded-full text-sm text-cream-dim 
              hover:text-foreground transition-all duration-300 hover:border-primary/30
              active:scale-95 select-none"
          >
            {holdProgress > 0 ? "keep holding…" : "hold to reveal…"}
          </button>
          <div className="w-48 mx-auto">
            <Progress value={holdProgress} className="h-1 bg-muted/30" />
          </div>
        </div>
      </div>
    );
  }

  if (step.type === "reveal") {
    return (
      <div className="animate-fade-in">
        <p className="font-serif text-2xl md:text-3xl leading-relaxed text-primary text-glow mb-8">
          {step.text}
        </p>
        <button
          onClick={onNext}
          className="px-6 py-3 glass-card rounded-full text-sm text-cream-dim 
            hover:text-foreground transition-all duration-300 hover:border-primary/30"
        >
          continue…
        </button>
      </div>
    );
  }

  if (step.type === "bonus") {
    return (
      <div className="animate-fade-in">
        <p className="font-serif text-lg md:text-xl leading-relaxed text-cream-dim italic mb-8">
          {step.text}
        </p>
        <button
          onClick={onNext}
          className="px-6 py-3 glass-card rounded-full text-sm text-cream-dim/50 
            hover:text-foreground transition-all duration-300"
        >
          ✦
        </button>
      </div>
    );
  }

  if (step.type === "voice") {
    return (
      <div className="animate-fade-in text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full glass-card-glow flex items-center justify-center
          cursor-pointer hover:scale-105 transition-transform duration-300">
          <span className="text-2xl">🎧</span>
        </div>
        <p className="text-xs text-cream-dim font-sans">voice note (coming soon)</p>
        <button
          onClick={onNext}
          className="px-6 py-3 glass-card rounded-full text-sm text-cream-dim 
            hover:text-foreground transition-all duration-300"
        >
          continue…
        </button>
      </div>
    );
  }

  if (step.type === "photo") {
    return (
      <div className="animate-fade-in text-center space-y-4">
        <div className="w-48 h-48 mx-auto rounded-2xl glass-card flex items-center justify-center">
          <span className="text-4xl">📸</span>
        </div>
        <p className="text-xs text-cream-dim font-sans">photo (add yours)</p>
        <button
          onClick={onNext}
          className="px-6 py-3 glass-card rounded-full text-sm text-cream-dim 
            hover:text-foreground transition-all duration-300"
        >
          continue…
        </button>
      </div>
    );
  }

  if (step.type === "montage") {
    return (
      <div className="animate-fade-in text-center space-y-4">
        <div className="w-64 h-40 mx-auto rounded-2xl glass-card-glow flex items-center justify-center">
          <span className="text-4xl">🎬</span>
        </div>
        <p className="text-xs text-cream-dim font-sans">montage (coming soon)</p>
        <button
          onClick={onNext}
          className="px-6 py-3 glass-card rounded-full text-sm text-cream-dim 
            hover:text-foreground transition-all duration-300"
        >
          continue…
        </button>
      </div>
    );
  }

  if (step.type === "split-view") {
    return (
      <div className="animate-fade-in space-y-6">
        <SplitView left={step.splitLeft || []} right={step.splitRight || []} />
        <button
          onClick={onNext}
          className="mx-auto block px-6 py-3 glass-card rounded-full text-sm text-cream-dim 
            hover:text-foreground transition-all duration-300"
        >
          continue…
        </button>
      </div>
    );
  }

  if (step.type === "final-text" || step.type === "qr-line") {
    return (
      <div className="animate-fade-in">
        <p className={`font-serif leading-relaxed mb-8 whitespace-pre-line ${
          step.type === "final-text" 
            ? "text-2xl md:text-3xl text-primary text-glow" 
            : "text-lg text-cream-dim italic"
        }`}>
          {step.text}
        </p>
        <button
          onClick={onNext}
          className="px-6 py-3 glass-card rounded-full text-sm text-cream-dim 
            hover:text-foreground transition-all duration-300"
        >
          {step.type === "qr-line" ? "✦" : "continue…"}
        </button>
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

  const handleNext = () => {
    if (currentStepIndex < content.steps.length - 1) {
      setCurrentStepIndex((i) => i + 1);
    } else {
      setIsComplete(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-6 relative z-10">
      {/* Top bar */}
      <div className="max-w-lg mx-auto w-full mb-2">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onBack}
            className="text-cream-dim hover:text-foreground transition-colors duration-300 text-sm font-sans"
          >
            ← back
          </button>
          <span className="text-xs text-cream-dim font-sans tracking-widest">
            Day {content.day} of {totalDays}
          </span>
        </div>
        <Progress value={progressPercent} className="h-0.5 bg-muted/20" />
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full">
        {/* Day label */}
        <div className="mb-2 text-cream-dim text-sm font-sans tracking-widest uppercase">
          Day {content.day}
        </div>
        <h1 className="font-serif text-3xl md:text-4xl text-glow mb-10 text-primary">
          {content.emoji} {content.title}
        </h1>

        {/* Step content */}
        <div className="text-foreground/90 min-h-[200px] flex flex-col justify-center">
          {!isComplete && currentStep && (
            <StepRenderer key={currentStepIndex} step={currentStep} onNext={handleNext} />
          )}
          {isComplete && (
            <div className="animate-fade-in text-center space-y-6">
              <p className="font-serif text-lg text-cream-dim">✦</p>
              <button
                onClick={onBack}
                className="px-8 py-3 glass-card rounded-full text-sm text-cream-dim 
                  hover:text-foreground transition-all duration-300"
              >
                back to days
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DayView;
