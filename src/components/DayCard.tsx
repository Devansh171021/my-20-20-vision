import { useState } from "react";
import { Lock } from "lucide-react";
import { DayContent } from "@/data/daysContent";

interface DayCardProps {
  content: DayContent;
  isUnlocked: boolean;
  isToday: boolean;
}

const DayCard = ({ content, isUnlocked, isToday }: DayCardProps) => {
  const [revealed, setRevealed] = useState(false);

  if (!isUnlocked) {
    return (
      <div className="glass-card rounded-xl p-5 opacity-40 select-none">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg blur-sm">{content.emoji}</span>
            <div>
              <p className="text-xs text-cream-dim uppercase tracking-widest">
                Day {content.day}
              </p>
              <p className="font-serif text-foreground/40 blur-sm text-sm">
                {content.title}
              </p>
            </div>
          </div>
          <Lock className="w-4 h-4 text-cream-dim/50" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-xl p-5 transition-all duration-700 ${
        isToday
          ? "glass-card-glow shadow-[0_0_40px_rgba(230,192,123,0.2)]"
          : "glass-card"
      }`}
      onMouseDown={() => setRevealed(true)}
      onTouchStart={() => setRevealed(true)}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl">{content.emoji}</span>
        <div>
          <p className="text-xs text-cream-dim uppercase tracking-widest">
            Day {content.day}
          </p>
          <p className="font-serif text-sm text-primary/90">
            {content.title}
          </p>
        </div>
      </div>

      {!revealed && isToday && (
        <p className="mt-3 text-xs text-cream-dim animate-pulse">
          hold this…
        </p>
      )}

      {revealed && (
        <p className="mt-4 text-sm text-foreground/90 animate-fade-in">
          open →
        </p>
      )}
    </div>
  );
};

export default DayCard;
