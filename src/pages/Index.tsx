import { useState } from "react";
import ParticleBackground from "@/components/ParticleBackground";
import TypewriterText from "@/components/TypewriterText";
import DayCard from "@/components/DayCard";
import DayView from "@/components/DayView";
import UnlockScreen from "@/components/UnlockScreen";
import { daysContent, DayContent } from "@/data/daysContent";
import { Progress } from "@/components/ui/progress";

const LandingScreen = ({ onStart }: { onStart: () => void }) => {
  const [typingDone, setTypingDone] = useState(false);

  const introLines = [
    "You're about to turn 20…",
    "and somehow… you still don't see yourself clearly.",
  ];

  const secondLines = [
    "So… for the next 20 days,",
    "I'm just going to show you what I see.",
  ];

  const [showSecond, setShowSecond] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center px-8 relative z-10">
      <div className="max-w-md w-full text-center space-y-8">
        <TypewriterText
          lines={introLines}
          speed={45}
          lineDelay={1200}
          onComplete={() => setTimeout(() => setShowSecond(true), 1000)}
        />

        {showSecond && (
          <div className="animate-fade-in" style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
            <TypewriterText
              lines={secondLines}
              speed={45}
              lineDelay={1000}
              onComplete={() => setTimeout(() => setTypingDone(true), 800)}
            />
          </div>
        )}

        {typingDone && (
          <div className="animate-fade-in pt-8" style={{ animationDelay: "0.5s", animationFillMode: "both" }}>
            <button
              onClick={onStart}
              className="px-10 py-4 rounded-full font-serif text-lg bg-primary text-primary-foreground 
                btn-glow animate-pulse-soft transition-all duration-300 hover:scale-105"
            >
              Start
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const MainExperience = () => {
  const [selectedDay, setSelectedDay] = useState<DayContent | null>(null);

  // For demo purposes, unlock all days. In production, use date-based unlocking.
  const unlockedDays = 21; // all days unlocked for now

  if (selectedDay) {
    return <DayView content={selectedDay} onBack={() => setSelectedDay(null)} />;
  }

  return (
    <div className="min-h-screen px-6 py-8 relative z-10">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs text-cream-dim font-sans tracking-[0.3em] uppercase mb-2">
            20 Days of You
          </p>
          <h1 className="font-serif text-2xl md:text-3xl text-primary text-glow">
            The Way I See You
          </h1>
        </div>

        {/* Day cards */}
        <div className="space-y-3">
          {daysContent.map((day, index) => (
            <DayCard
              key={day.day}
              content={day}
              isUnlocked={index < unlockedDays}
              isToday={index === 0}
              onClick={() => setSelectedDay(day)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  const [started, setStarted] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <ParticleBackground />
      {!started ? (
        <LandingScreen onStart={() => setStarted(true)} />
      ) : (
        <MainExperience />
      )}
    </div>
  );
};

export default Index;
