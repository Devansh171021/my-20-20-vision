import { useState, useEffect, useRef, useCallback } from "react";
import { DayContent, DayStep } from "@/data/daysContent";
import { Progress } from "@/components/ui/progress";

interface DayViewProps {
  content: DayContent;
  onBack: () => void;
  totalDays: number;
}

const TIMINGS: Record<string, number> = {
  voice: 4000,
  photo: 2500,
  montage: 4000,
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
  const holdTimerRef = useRef<any>(null);
  const holdCompleteRef = useRef(false);

  const startHold = useCallback(() => {
    holdCompleteRef.current = false;
    setHoldProgress(0);
    holdTimerRef.current = setInterval(() => {
      setHoldProgress((prev) => {
        const next = prev + 1.5;
        if (next >= 100) {
          clearInterval(holdTimerRef.current);
          holdCompleteRef.current = true;
          return 100;
        }
        return next;
      });
    }, 30);
  }, []);

  const endHold = useCallback(() => {
    clearInterval(holdTimerRef.current);
    if (!holdCompleteRef.current) setHoldProgress(0);
  }, []);

  useEffect(() => {
    if (holdProgress >= 100 && holdCompleteRef.current) {
      const t = setTimeout(onNext, 400);
      return () => clearTimeout(t);
    }
  }, [holdProgress, onNext]);

  // TEXT STEPS WITH BUTTONS

  if (step.type === "tease") {
    return (
      <div className="animate-fade-in text-center space-y-6">
        <p className="font-serif text-lg md:text-xl text-foreground/80 whitespace-pre-line">
          {step.text}
        </p>
        <button onClick={onNext} className="text-sm italic text-muted-foreground hover:text-primary">
          continue…
        </button>
      </div>
    );
  }

  if (step.type === "hold") {
    return (
      <div className="animate-fade-in text-center space-y-8">
        <p className="font-serif text-xl md:text-2xl whitespace-pre-line">
          {step.text}
        </p>

        <button
          onMouseDown={startHold}
          onMouseUp={endHold}
          onTouchStart={startHold}
          onTouchEnd={endHold}
          className="px-10 py-4 rounded-full glass-card text-foreground/70"
        >
          {holdProgress > 0 ? "keep holding…" : "hold this…"}
        </button>

        <div className="w-48 mx-auto">
          <Progress value={holdProgress} className="h-0.5" />
        </div>
      </div>
    );
  }

  if (step.type === "reveal") {
    return (
      <div className="animate-fade-in text-center space-y-6">
        <p className="font-serif text-2xl md:text-3xl text-primary text-glow whitespace-pre-line">
          {step.text}
        </p>
        <button onClick={onNext} className="text-sm italic text-muted-foreground hover:text-primary">
          wait… there’s more
        </button>
      </div>
    );
  }

  if (step.type === "bonus") {
    return (
      <div className="animate-fade-in text-center space-y-6">
        <p className="italic text-muted-foreground whitespace-pre-line">
          {step.text}
        </p>
        <button onClick={onNext} className="text-xs italic text-muted-foreground hover:text-primary">
          okay… next
        </button>
      </div>
    );
  }

  // MEDIA AUTO

  if (step.type === "voice") {
    useEffect(() => {
      const t = setTimeout(onNext, TIMINGS.voice);
      return () => clearTimeout(t);
    }, []);
    return <div className="text-center">🎧</div>;
  }

  if (step.type === "photo") {
    useEffect(() => {
      const t = setTimeout(onNext, TIMINGS.photo);
      return () => clearTimeout(t);
    }, []);
    return <div className="text-center">📸</div>;
  }

  if (step.type === "montage") {
    useEffect(() => {
      const t = setTimeout(onNext, TIMINGS.montage);
      return () => clearTimeout(t);
    }, []);
    return <div className="text-center">🎬</div>;
  }

  if (step.type === "split-view") {
    return <SplitView left={step.splitLeft || []} right={step.splitRight || []} />;
  }

  if (step.type === "final-text") {
    return (
      <div className="text-center space-y-6">
        <p className="text-primary text-glow whitespace-pre-line">{step.text}</p>
        <button onClick={onNext} className="text-sm italic text-muted-foreground hover:text-primary">
          continue…
        </button>
      </div>
    );
  }

  if (step.type === "qr-line") {
    return (
      <div className="text-center space-y-6">
        <p className="italic text-muted-foreground whitespace-pre-line">{step.text}</p>
        <button onClick={onNext}>finish</button>
      </div>
    );
  }

  return null;
};

const DayView = ({ content, onBack, totalDays }: DayViewProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const next = () => {
    if (currentStepIndex < content.steps.length - 1) {
      setCurrentStepIndex((i) => i + 1);
    } else {
      setIsComplete(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-6 vignette">
      <div className="flex justify-between text-xs">
        <button onClick={onBack}>← back</button>
        <span>Day {content.day} of {totalDays}</span>
      </div>

      <div className="flex-1 flex flex-col justify-center text-center">
        <h1 className="text-3xl text-primary text-glow mb-10">
          {content.emoji} {content.title}
        </h1>

        {!isComplete ? (
          <StepRenderer step={content.steps[currentStepIndex]} onNext={next} />
        ) : (
          <div>
            <p className="italic">
              and yeah… tomorrow… you’re not ready for what I’m saying next
            </p>
            <button onClick={onBack}>back</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DayView;
