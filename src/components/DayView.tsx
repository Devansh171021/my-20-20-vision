import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { DayContent, DayStep } from "@/data/daysContent";
import { Progress } from "@/components/ui/progress";
import ShooterTarget from "@/components/ShooterTarget";
import JudgeCard from "@/components/JudgeCard";

const TIMINGS: Record<string, number> = {
  tease: 2000,
  reveal: 2400,
  bonus: 2000,
  voice: 4000,
  photo: 2500,
  "final-text": 3000,
  "qr-line": 3000,
  montage: 4000,
  "split-view": 3000,
};

interface DayViewProps {
  content: DayContent;
  onBack: () => void;
  totalDays: number;
}

const StepRenderer = ({ step, onNext }: { step: DayStep; onNext: () => void }) => {
  const [holdProgress, setHoldProgress] = useState(0);
  const holdTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const holdCompleteRef = useRef(false);
  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-advance for non-interactive steps
  useEffect(() => {
    const delay = TIMINGS[step.type];
    if (!delay) return; // hold, target, judge are manual
    autoTimerRef.current = setTimeout(onNext, delay);
    return () => { if (autoTimerRef.current) clearTimeout(autoTimerRef.current); };
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
    if (!holdCompleteRef.current) setHoldProgress(0);
  }, []);

  useEffect(() => {
    if (holdProgress >= 100) {
      const t = setTimeout(onNext, 400);
      return () => clearTimeout(t);
    }
  }, [holdProgress, onNext]);

  // Haptic vibration on reveal steps
  useEffect(() => {
    if (step.type === "reveal" && navigator.vibrate) {
      navigator.vibrate([50, 30, 50]);
    }
  }, [step.type]);

  /* ================= TEXT TYPES ================= */
  if (
    step.type === "tease" ||
    step.type === "reveal" ||
    step.type === "bonus" ||
    step.type === "final-text"
  ) {
    return (
      <div className="animate-fade-in text-center space-y-6">
        <p
          className={`font-serif leading-relaxed whitespace-pre-line ${
            step.type === "reveal" || step.type === "final-text"
              ? "text-2xl md:text-3xl shimmer-gold-text"
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
        className="text-center space-y-6 select-none"
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
          <Progress value={holdProgress} className="h-1" />
        </div>

        <p
          className="text-xs text-muted-foreground transition-all duration-300"
          style={{
            textShadow: holdProgress > 0 ? `0 0 ${8 + holdProgress * 0.3}px hsl(330 80% 75% / ${0.2 + holdProgress * 0.005})` : "none",
          }}
        >
          hold this…
        </p>
      </div>
    );
  }

  /* ================= VOICE ================= */
  if (step.type === "voice") {
    return (
      <div className="animate-fade-in text-center space-y-4">
        <div
          className="text-6xl animate-pulse-soft mx-auto w-fit"
          style={{ textShadow: "0 0 30px hsl(330 80% 75% / 0.5)" }}
        >
          🎧
        </div>
        <p className="font-serif text-sm italic text-muted-foreground">
          yeah… this one
        </p>
      </div>
    );
  }

  /* ================= PHOTO ================= */
  if (step.type === "photo") {
    return (
      <div className="animate-fade-in text-center space-y-4">
        <div className="w-48 h-48 mx-auto rounded-2xl romantic-card flex items-center justify-center">
          <span className="text-5xl">📸</span>
        </div>
        <p className="font-serif text-sm italic text-muted-foreground">
          don't lie… you know this
        </p>
      </div>
    );
  }

  /* ================= TARGET ================= */
  if (step.type === "target") {
    return <ShooterTarget onNext={onNext} />;
  }

  /* ================= JUDGE ================= */
  if (step.type === "judge") {
    return (
      <JudgeCard
        memory={step.memory || ""}
        verdict={step.verdict || ""}
        onNext={onNext}
      />
    );
  }

  /* ================= MONTAGE ================= */
  if (step.type === "montage") {
    return (
      <div className="animate-fade-in text-center space-y-4">
        <div className="text-6xl animate-pulse-soft mx-auto w-fit">🎞️</div>
        <p className="font-serif text-sm italic text-muted-foreground">
          every moment… playing back
        </p>
      </div>
    );
  }

  /* ================= QR-LINE ================= */
  if (step.type === "qr-line") {
    return (
      <div className="animate-fade-in text-center">
        <p className="font-serif text-lg italic text-muted-foreground whitespace-pre-line">
          {step.text}
        </p>
      </div>
    );
  }

  /* ================= SPLIT-VIEW ================= */
  if (step.type === "split-view") {
    return (
      <div className="animate-fade-in text-center space-y-4">
        <div className="flex gap-6 justify-center">
          <div className="space-y-2">
            {step.splitLeft?.map((l, i) => (
              <p key={i} className="font-serif text-sm text-muted-foreground">{l}</p>
            ))}
          </div>
          <div className="w-px bg-primary/30" />
          <div className="space-y-2">
            {step.splitRight?.map((l, i) => (
              <p key={i} className="font-serif text-sm text-primary text-glow">{l}</p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

/* ============================================================ */

const DayView = ({ content, onBack, totalDays }: DayViewProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);

  const currentStep = content.steps[currentStepIndex];
  const progressPercent = ((currentStepIndex + 1) / content.steps.length) * 100;

  const handleNext = useCallback(() => {
    setCurrentStepIndex((i) => {
      if (i < content.steps.length - 1) return i + 1;
      setIsComplete(true);
      return i;
    });
  }, [content.steps.length]);

  // Background music
  useEffect(() => {
    if (!content.bgMusic) return;
    const audio = new Audio(content.bgMusic);
    audio.loop = true;
    audio.volume = 0.3;
    audio.play().catch(() => {});
    bgAudioRef.current = audio;
    return () => { audio.pause(); audio.src = ""; };
  }, [content.bgMusic]);

  // Volume ducking for voice steps
  useEffect(() => {
    if (!bgAudioRef.current) return;
    const targetVol = currentStep?.type === "voice" ? 0.05 : 0.3;
    const audio = bgAudioRef.current;
    // Simple fade
    const step = targetVol > audio.volume ? 0.02 : -0.02;
    const interval = setInterval(() => {
      const next = audio.volume + step;
      if ((step > 0 && next >= targetVol) || (step < 0 && next <= targetVol)) {
        audio.volume = targetVol;
        clearInterval(interval);
      } else {
        audio.volume = Math.max(0, Math.min(1, next));
      }
    }, 50);
    return () => clearInterval(interval);
  }, [currentStepIndex, currentStep?.type]);

  return (
    <div className="min-h-screen flex flex-col px-6 py-6 relative z-10 romantic-backdrop">

      <div className="max-w-lg mx-auto w-full mb-2">
        <div className="flex items-center justify-between mb-3">
          <button onClick={onBack} className="text-sm text-foreground/60 font-sans hover:text-foreground transition-colors">
            ← back
          </button>
          <span className="text-xs text-muted-foreground font-sans">
            Day {content.day} of {totalDays}
          </span>
        </div>
        <Progress value={progressPercent} className="h-0.5" />
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full">

        <h1 className="text-3xl text-primary text-glow text-center mb-10 font-serif">
          {content.emoji} {content.title}
        </h1>

        <div className="min-h-[280px] flex flex-col justify-center p-6 rounded-3xl romantic-card">

          {!isComplete && currentStep && (
            <StepRenderer
              key={currentStepIndex}
              step={currentStep}
              onNext={handleNext}
            />
          )}

          {isComplete && (
            <div className="text-center space-y-6 animate-fade-in">
              <p className="font-serif italic text-muted-foreground">
                tomorrow… you're not ready for the next one
              </p>
              <button
                onClick={onBack}
                className="text-sm text-foreground/50 font-sans hover:text-foreground transition-colors"
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
