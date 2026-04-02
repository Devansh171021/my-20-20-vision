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
    // Attraction particles: spawn at bottom, drift toward top-right Golden Source
    return Array.from({ length: 35 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      height: 0,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 12,
      opacity: Math.random() * 0.5 + 0.15,
    }));
  }, [mode]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep black canvas */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Vignette */}
      <div className="absolute inset-0 vignette" />

      {/* Golden Source — top-right pulsing glow */}
      <div
        className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full animate-golden-source"
        style={{
          background: "radial-gradient(circle, hsla(40, 80%, 60%, 0.20), hsla(40, 80%, 60%, 0.05) 50%, transparent 70%)",
        }}
      />

      {/* Connection Line: bottom-left → top-right */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsla(40, 80%, 60%, 0.05)" />
            <stop offset="50%" stopColor="hsla(40, 80%, 60%, 0.25)" />
            <stop offset="100%" stopColor="hsla(40, 80%, 60%, 0.08)" />
          </linearGradient>
          <linearGradient id="pulseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="45%" stopColor="transparent" />
            <stop offset="50%" stopColor="hsla(40, 80%, 65%, 0.8)" />
            <stop offset="55%" stopColor="transparent" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        {/* Static golden line */}
        <line x1="0%" y1="100%" x2="100%" y2="0%" stroke="url(#lineGrad)" strokeWidth="0.5" />
        {/* Glow pulse traveling along the line */}
        <line
          x1="0%" y1="100%" x2="100%" y2="0%"
          stroke="url(#pulseGrad)"
          strokeWidth="2"
          className="animate-connection-pulse"
        />
      </svg>

      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className={mode === "rain" ? "absolute" : "absolute rounded-full"}
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: mode === "rain" ? `${p.height}px` : `${p.size}px`,
            opacity: p.opacity,
            background: mode === "rain"
              ? "linear-gradient(to bottom, hsl(210 60% 70% / 0.6), transparent)"
              : "hsl(40, 80%, 65%)",
            boxShadow: mode !== "rain" ? `0 0 ${p.size * 3}px hsl(40, 80%, 65% / 0.4)` : undefined,
            borderRadius: mode === "rain" ? "0" : undefined,
            animation: mode === "rain"
              ? `rain-fall ${p.duration}s linear ${p.delay}s infinite`
              : `attraction-float ${p.duration}s ease-in ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;
