import { Lock } from "lucide-react";
import { DayContent } from "@/data/daysContent";

interface DayCardProps {
  content: DayContent;
  isUnlocked: boolean;
  isToday: boolean;
  onClick: () => void;
}

const DayCard = ({ content, isUnlocked, isToday, onClick }: DayCardProps) => {
  if (!isUnlocked) {
    return (
      <div className="glass-card rounded-xl p-5 opacity-40 select-none">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg blur-sm">{content.emoji}</span>
            <div>
              <p className="text-xs text-cream-dim font-sans tracking-widest uppercase">Day {content.day}</p>
              <p className="font-serif text-foreground/40 blur-sm text-sm">{content.title}</p>
            </div>
          </div>
          <Lock className="w-4 h-4 text-cream-dim/50" />
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-xl p-5 transition-all duration-500 ${
        isToday
          ? "glass-card-glow animate-scale-in"
          : "glass-card hover:border-primary/20"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl">{content.emoji}</span>
        <div>
          <p className="text-xs text-cream-dim font-sans tracking-widest uppercase">Day {content.day}</p>
          <p className={`font-serif text-sm ${isToday ? "text-primary text-glow-soft" : "text-foreground/80"}`}>
            {content.title}
          </p>
        </div>
      </div>
      {isToday && (
        <p className="mt-3 text-xs text-cream-dim font-sans">tap to open →</p>
      )}
    </button>
  );
};

export default DayCard;
