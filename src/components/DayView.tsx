import { useState, useRef, useEffect } from "react";
import { DayContent, DayStep } from "@/data/daysContent";
import { Progress } from "@/components/ui/progress";

interface DayViewProps {
  content: DayContent;
  onBack: () => void;
  totalDays: number;
}

const StepRenderer = ({ step, onNext }: { step: DayStep; onNext: () => void }) => {
  const [holdProgress, setHoldProgress] = useState(0);
  const timer = useRef<any>(null);

  // 🔥 AUTO PROGRESSION (FIXED)
  useEffect(() => {
    if (step.type === "reveal") {
      const t = setTimeout(onNext, 2200);
      return () => clearTimeout(t);
    }

    if (step.type === "bonus") {
      const t = setTimeout(onNext, 2000);
      return () => clearTimeout(t);
    }

    if (step.type === "voice") {
      const t = setTimeout(onNext, 4000);
      return () => clearTimeout(t);
    }

    if (step.type === "photo") {
      const t = setTimeout(onNext, 2500);
      return () => clearTimeout(t);
    }
  }, [step, onNext]);

  // 🔥 HOLD LOGIC
  const startHold = () => {
    timer.current = setInterval(() => {
      setHoldProgress((p) => {
        if (p >= 100) {
          clearInterval(timer.current);
          setTimeout(onNext, 300);
          return 100;
        }
        return p + 2;
      });
    }, 30);
  };

  const stopHold = () => {
    clearInterval(timer.current);
    setHoldProgress(0);
  };

  // 🔹 TEASE
  if (step.type === "tease") {
    return (
      <p className="font-serif text-2xl md:text-3xl leading-relaxed opacity-0 animate-[fadeIn_1s_ease_forwards]">
        {step.text}
      </p>
    );
  }

  // 🔹 HOLD
  if (step.type === "hold") {
    return (
      <div className="text-center space-y-4">
        <p className="font-serif text-2xl md:text-3xl leading-relaxed">
          {step.text}
        </p>

        <button
          onMouseDown={startHold}
          onMouseUp={stopHold}
          onTouchStart={startHold}
          onTouchEnd={stopHold}
          className="px-8 py-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md 
          text-cream-dim transition-all duration-500 active:scale-95"
        >
          {holdProgress > 0 ? "keep holding…" : "hold this…"}
        </button>

        <Progress value={holdProgress} className="h-1" />
      </div>
    );
  }

  // 🔹 REVEAL
  if (step.type === "reveal") {
    return (
      <p className="font-serif text-3xl md:text-4xl text-primary text-glow opacity-0 animate-[fadeIn_1s_ease_forwards]">
        {step.text}
      </p>
    );
  }

  // 🔹 BONUS
  if (step.type === "bonus") {
    return (
      <p className="text-lg italic text-cream-dim opacity-0 animate-[fadeIn_1s_ease_forwards]">
        {step.text}
      </p>
    );
  }

  // 🔹 VOICE
  if (step.type === "voice") {
    return (
      <div className="text-center space-y-4">
        <div className="w-20 h-20 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
          🎧
        </div>
        <p className="text-sm italic text-cream-dim">
          okay… listen to this properly
        </p>
      </div>
    );
  }

  // 🔹 PHOTO
  if (step.type === "photo") {
    return (
      <div className="text-center space-y-4">
        <img
          src="/your-image.jpg"
          className="w-56 h-56 mx-auto object-cover rounded-2xl opacity-0 animate-[fadeIn_1s_ease_forwards]"
        />
        <p className="text-xs italic text-cream-dim">yeah… this one.</p>
      </div>
    );
  }

  // 🔹 MONTAGE
  if (step.type === "montage") {
    return (
      <div className="text-center">
        <p className="text-2xl">🎬</p>
      </div>
    );
  }

  return null;
};

const DayView = ({ content, onBack, totalDays }: DayViewProps) => {
  const [stepIndex, setStepIndex] = useState(0);

  const next = () => setStepIndex((i) => i + 1);

  const step = content.steps[stepIndex];
  const progress = ((stepIndex + 1) / content.steps.length) * 100;

  return (
    <div className="min-h-screen px-6 py-6 bg-gradient-to-br from-[#1a0f14] via-[#2a1620] to-[#12090c] text-white">

      {/* TOP */}
      <div className="max-w-lg mx-auto mb-6">
        <div className="flex justify-between text-xs text-cream-dim">
          <button onClick={onBack}>← back</button>
          <span>Day {content.day} of {totalDays}</span>
        </div>
        <Progress value={progress} className="h-1 mt-2" />
      </div>

      {/* CONTENT */}
      <div className="max-w-lg mx-auto flex flex-col justify-center min-h-[70vh] space-y-8 text-center">
        <h1 className="text-3xl md:text-4xl font-serif text-primary text-glow">
          {content.emoji} {content.title}
        </h1>

        {step && <StepRenderer step={step} onNext={next} />}
      </div>
    </div>
  );
};

export default DayView;
