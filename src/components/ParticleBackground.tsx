import { useMemo } from "react";

interface ParticleBackgroundProps {
  mode?: "default" | "rain";
}

const ParticleBackground = ({ mode = "default" }: ParticleBackgroundProps) => {
  const particles = useMemo(() => {
    if (mode === "rain") {
      return Array.from({ length: 60 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 1,
        height: Math.random() * 15 + 10,
        duration: Math.random() * 0.8 + 0.4,
        delay: Math.random() * 2,
        opacity: Math.random() * 0.3 + 0.15,
      }));
    }
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 3 + 1,
      height: 0,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 15,
      opacity: Math.random() * 0.4 + 0.1,
    }));
  }, [mode]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Vignette */}
      <div className="absolute inset-0 vignette" />

      {/* Gradient orbs */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, hsl(40 60% 69% / 0.3), transparent 70%)" }}
      />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, hsl(350 30% 55% / 0.2), transparent 70%)" }}
      />

      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className={mode === "rain" ? "absolute" : "absolute rounded-full bg-gold"}
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: mode === "rain" ? `${p.height}px` : `${p.size}px`,
            opacity: p.opacity,
            background: mode === "rain"
              ? "linear-gradient(to bottom, hsl(210 60% 70% / 0.6), transparent)"
              : undefined,
            borderRadius: mode === "rain" ? "0" : undefined,
            animation: mode === "rain"
              ? `rain-fall ${p.duration}s linear ${p.delay}s infinite`
              : `particle-float ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;
