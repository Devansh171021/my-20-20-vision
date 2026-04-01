import { useState, useEffect } from "react";

interface UnlockScreenProps {
  day: number;
  letter?: string;
  countdownNumber?: number;
  onComplete: () => void;
}

const UnlockScreen = ({ day, letter, countdownNumber, onComplete }: UnlockScreenProps) => {
  const [phase, setPhase] = useState<"text" | "reveal" | "glow" | "done">("text");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("reveal"), 1200);
    const t2 = setTimeout(() => setPhase("glow"), 2200);
    const t3 = setTimeout(() => setPhase("done"), 3000);
    const t4 = setTimeout(onComplete, 3400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center relative z-10">
      <div className="text-center space-y-6">
        <p
          className="font-serif text-xl text-cream-dim transition-all duration-1000"
          style={{ opacity: phase === "text" ? 1 : 0.3 }}
        >
          Day {day} is unlocking…
        </p>

        {/* Letter reveal */}
        {letter && (
          <div
            className="transition-all duration-1000"
            style={{
              opacity: phase === "text" ? 0 : phase === "done" ? 0 : 1,
              transform: phase === "reveal" || phase === "glow" ? "scale(1)" : "scale(0.5)",
            }}
          >
            <span
              className="font-serif text-7xl md:text-8xl text-primary"
              style={{
                textShadow:
                  phase === "glow"
                    ? "0 0 40px hsl(40 60% 69% / 0.6), 0 0 80px hsl(40 60% 69% / 0.3)"
                    : "none",
              }}
            >
              {letter}
            </span>
          </div>
        )}

        {/* Countdown number reveal */}
        {countdownNumber !== undefined && (
          <div
            className="transition-all duration-1000"
            style={{
              opacity: phase === "text" ? 0 : phase === "done" ? 0 : 1,
              transform: phase === "reveal" || phase === "glow" ? "scale(1)" : "scale(0.5)",
            }}
          >
            <span
              className="font-serif text-8xl md:text-9xl text-primary"
              style={{
                textShadow:
                  phase === "glow"
                    ? "0 0 50px hsl(40 60% 69% / 0.6), 0 0 100px hsl(40 60% 69% / 0.3)"
                    : "none",
              }}
            >
              {countdownNumber}
            </span>
          </div>
        )}

        {/* Glow orb */}
        <div
          className="w-16 h-16 mx-auto rounded-full transition-all duration-1000"
          style={{
            background:
              phase !== "text"
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
