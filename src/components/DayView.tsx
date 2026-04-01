import { useState, useEffect } from "react";
import { DayContent } from "@/data/daysContent";

interface DayViewProps {
  content: DayContent;
  onBack: () => void;
}

const FadeSequence = ({ lines }: { lines: string[] }) => {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount < lines.length) {
      const timer = setTimeout(() => setVisibleCount((c) => c + 1), 1500);
      return () => clearTimeout(timer);
    }
  }, [visibleCount, lines.length]);

  return (
    <div className="space-y-6">
      {lines.map((line, i) => (
        <p
          key={i}
          className="font-serif text-xl md:text-2xl leading-relaxed transition-all duration-1000"
          style={{
            opacity: i < visibleCount ? 1 : 0,
            transform: i < visibleCount ? "translateY(0)" : "translateY(15px)",
            transitionDelay: `${i * 200}ms`,
          }}
        >
          {line}
        </p>
      ))}
    </div>
  );
};

const TapReveal = ({ lines }: { lines: string[] }) => {
  const [revealed, setRevealed] = useState(1);

  return (
    <div className="space-y-6">
      {lines.map((line, i) => (
        <p
          key={i}
          className="font-serif text-xl md:text-2xl leading-relaxed transition-all duration-700"
          style={{
            opacity: i < revealed ? 1 : 0,
            transform: i < revealed ? "translateY(0)" : "translateY(10px)",
          }}
        >
          {line}
        </p>
      ))}
      {revealed < lines.length && (
        <button
          onClick={() => setRevealed((r) => r + 1)}
          className="mt-6 px-6 py-3 glass-card rounded-full text-sm text-cream-dim 
            hover:text-foreground transition-all duration-300 hover:border-primary/30"
        >
          tap to continue…
        </button>
      )}
    </div>
  );
};

const SplitView = ({ left, right }: { left: string[]; right: string[] }) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <h3 className="font-serif text-sm uppercase tracking-widest text-cream-dim mb-6">
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
          <h3 className="font-serif text-sm uppercase tracking-widest text-primary mb-6">
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

const DayView = ({ content, onBack }: DayViewProps) => {
  return (
    <div className="min-h-screen flex flex-col px-6 py-8 relative z-10">
      {/* Header */}
      <button
        onClick={onBack}
        className="self-start text-cream-dim hover:text-foreground transition-colors duration-300 mb-8 text-sm font-sans"
      >
        ← back
      </button>

      <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full">
        {/* Day label */}
        <div className="mb-2 text-cream-dim text-sm font-sans tracking-widest uppercase">
          Day {content.day}
        </div>
        <h1 className="font-serif text-3xl md:text-4xl text-glow mb-10 text-primary">
          {content.emoji} {content.title}
        </h1>

        {/* Content */}
        <div className="text-foreground/90">
          {content.interaction === "fade-sequence" && <FadeSequence lines={content.lines} />}
          {content.interaction === "tap-reveal" && <TapReveal lines={content.lines} />}
          {content.interaction === "hold-reveal" && <TapReveal lines={content.lines} />}
          {content.interaction === "split-view" && (
            <SplitView left={content.splitLeft || []} right={content.splitRight || []} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DayView;
