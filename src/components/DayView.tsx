
import { useState, useEffect, useRef, useCallback } from "react";
import { DayContent, DayStep } from "@/data/daysContent";
import { Progress } from "@/components/ui/progress";

interface DayViewProps {
  content: DayContent;
  onBack: () => void;
  totalDays: number;
}

const TIMINGS: Record<string, number> = {
  tease: 2000,
  reveal: 2400,
  bonus: 2000,
  voice: 4000,
  photo: 2500,
  montage: 4000,
  "final-text": 3000,
  "qr-line": 4000,
  "split-view": 5000,
};

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
              <p key={i} className="text-muted-foreground/70 font-sans text-sm line-through decoration-rose-soft/50">
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="text-center">
          <h3 className="font-serif text-xs uppercase tracking-widest text-primary mb-6">
            What you are
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
  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-progress for non-hold steps
  useEffect(() => {
    if (step.type === "hold") return;
    const delay = TIMINGS[step.type] || 2000;
    autoTimerRef.current = setTimeout(onNext, delay);
    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    };
  }, [step.type, onNext]);

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

  // When hold reaches 100%, auto-advance after a beat
  useEffect(() => {
    if (holdProgress >= 100 && holdCompleteRef.current) {
      const t = setTimeout(onNext, 500);
      return () => clearTimeout(t);
    }
  }, [holdProgress, onNext]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (holdTimerRef.current) clearInterval(holdTimerRef.current);
    };
  }, []);

  if (step.type === "tease") {
    return (
      <div className="animate-fade-in text-center">
        <p className="font-serif text-lg md:text-xl leading-relaxed text-foreground/80 whitespace-pre-line">
          {step.text}
        </p>
      </div>
    );
  }

  if (step.type === "hold") {
    return (
      <div className="animate-fade-in text-center space-y-8">
        <p
          className="font-serif text-xl md:text-2xl leading-relaxed text-foreground/90 whitespace-pre-line transition-all duration-500"
          style={{
            textShadow: holdProgress > 50 ? `0 0 ${holdProgress / 4}px hsl(40 60% 69% / 0.3)` : "none",
          }}
        >
          {step.text}
        </p>
        <div className="space-y-4">
          <button
            onMouseDown={startHold}
            onMouseUp={endHold}
            onMouseLeave={endHold}
            onTouchStart={(e) => { e.preventDefault(); startHold(); }}
            onTouchEnd={endHold}
            className={`px-10 py-4 rounded-full font-serif text-base transition-all duration-300 select-none
              ${holdProgress > 0
                ? "glass-card-glow text-primary scale-[0.97]"
                : "glass-card text-foreground/70 hover:text-foreground"
              }`}
            style={{
              boxShadow: holdProgress > 0
                ? `0 0 ${20 + holdProgress / 2}px hsl(40 60% 69% / ${0.1 + holdProgress / 300})`
                : undefined,
            }}
          >
            {holdProgress >= 100 ? "✦" : holdProgress > 0 ? "keep holding…" : "hold this…"}
          </button>
          <div className="w-48 mx-auto">
            <Progress value={holdProgress} className="h-0.5 bg-muted/20" />
          </div>
        </div>
      </div>
    );
  }

  if (step.type === "reveal") {
    return (
      <div className="animate-fade-in text-center">
        <p className="font-serif text-2xl md:text-3xl leading-relaxed text-primary text-glow whitespace-pre-line">
          {step.text}
        </p>
      </div>
    );
  }

  if (step.type === "bonus") {
    return (
      <div className="animate-fade-in text-center">
        <p className="font-serif text-base md:text-lg leading-relaxed text-muted-foreground italic whitespace-pre-line">
          {step.text}
        </p>
      </div>
    );
  }

  if (step.type === "voice") {
    return (
      <div className="animate-fade-in text-center space-y-4">
        <div className="w-20 h-20 mx-auto rounded-full glass-card-glow flex items-center justify-center animate-pulse-soft">
          <span className="text-3xl">🎧</span>
        </div>
        <p className="font-serif text-sm text-muted-foreground italic">
          yeah… this one
        </p>
        <p className="text-xs text-muted-foreground/50 font-sans">voice note (coming soon)</p>
      </div>
    );
  }

  if (step.type === "photo") {
    return (
      <div className="animate-fade-in text-center space-y-4">
        <div className="w-56 h-56 mx-auto rounded-2xl glass-card-glow flex items-center justify-center overflow-hidden">
          <span className="text-5xl">📸</span>
        </div>
        <p className="font-serif text-sm text-muted-foreground italic">
          don't lie… you know this
        </p>
        <p className="text-xs text-muted-foreground/50 font-sans">photo (add yours)</p>
      </div>
    );
  }

  if (step.type === "montage") {
    return (
      <div className="animate-fade-in text-center space-y-4">
        <div className="w-72 h-44 mx-auto rounded-2xl glass-card-glow flex items-center justify-center overflow-hidden animate-pulse-soft">
          <span className="text-5xl">🎬</span>
        </div>
        <p className="font-serif text-sm text-muted-foreground italic">
          every moment… all of it
        </p>
        <p className="text-xs text-muted-foreground/50 font-sans">montage (coming soon)</p>
      </div>
    );
  }

  if (step.type === "split-view") {
    return (
      <div className="animate-fade-in">
        <SplitView left={step.splitLeft || []} right={step.splitRight || []} />
      </div>
    );
  }

  if (step.type === "final-text") {
    return (
      <div className="animate-fade-in text-center">
        <p className="font-serif text-2xl md:text-3xl leading-relaxed text-primary text-glow whitespace-pre-line">
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

  const handleNext = useCallback(() => {
    setCurrentStepIndex((i) => {
      if (i < content.steps.length - 1) return i + 1;
      setIsComplete(true);
      return i;
    });
  }, [content.steps.length]);

  return (
    <div className="min-h-screen flex flex-col px-6 py-6 relative z-10 vignette">
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

      <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full">
        {/* Day label */}
        <div className="mb-2 text-muted-foreground text-sm font-sans tracking-widest uppercase text-center">
          Day {content.day}
        </div>
        <h1 className="font-serif text-3xl md:text-4xl text-glow mb-12 text-primary text-center">
          {content.emoji} {content.title}
        </h1>

        {/* Step content */}
        <div className="text-foreground/90 min-h-[250px] flex flex-col justify-center">
          {!isComplete && currentStep && (
            <StepRenderer key={currentStepIndex} step={currentStep} onNext={handleNext} />
          )}
          {isComplete && (
            <div className="animate-fade-in text-center space-y-8">
              <p className="font-serif text-2xl text-primary text-glow">✦</p>
              <p className="font-serif text-sm text-muted-foreground italic">
                see you tomorrow…
              </p>
              <button
                onClick={onBack}
                className="px-8 py-3 glass-card rounded-full text-sm text-muted-foreground 
                  hover:text-foreground transition-all duration-300"
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
