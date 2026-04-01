import { useState, useEffect } from "react";

interface UnlockScreenProps {
  day: number;
  onComplete: () => void;
}

const UnlockScreen = ({ day, onComplete }: UnlockScreenProps) => {
  const [phase, setPhase] = useState<"text" | "glow" | "done">("text");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("glow"), 1500);
    const t2 = setTimeout(() => setPhase("done"), 2500);
    const t3 = setTimeout(onComplete, 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center relative z-10">
      <div className="text-center space-y-4">
        <p
          className="font-serif text-xl text-cream-dim transition-all duration-1000"
          style={{ opacity: phase === "text" ? 1 : 0.3 }}
        >
          Day {day} is unlocking…
        </p>
        <div
          className="w-16 h-16 mx-auto rounded-full transition-all duration-1000"
          style={{
            background: phase !== "text"
              ? "radial-gradient(circle, hsla(38, 70%, 69%, 0.6), transparent)"
              : "transparent",
            transform: phase === "glow" ? "scale(2)" : "scale(1)",
            opacity: phase === "done" ? 0 : 1,
          }}
        />
      </div>
    </div>
  );
};

export default UnlockScreen;
