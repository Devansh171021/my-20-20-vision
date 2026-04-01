import { useState, useMemo } from "react";
import ParticleBackground from "@/components/ParticleBackground";
import TypewriterText from "@/components/TypewriterText";
import DayView from "@/components/DayView";
import UnlockScreen from "@/components/UnlockScreen";
import { daysContent, DayContent } from "@/data/daysContent";
import {
  getCurrentDay,
  NAME_LETTERS,
  DayStatus,
} from "@/utils/dateUtils";

/* ================= LANDING ================= */

const LandingScreen = ({ onStart }: { onStart: () => void }) => {
  const [step, setStep] = useState(0);

  const lines = [
    ["okay… wait"],
    ["don’t rush this"],
    ["just read this properly…"],
    ["you’re about to turn 20…"],
    ["and somehow…", "you still don’t see yourself clearly"],
    ["which is actually crazy"],
    ["because I do"],
    ["and for the next 20 days…"],
    ["I’m going to prove it to you"],
  ];

  const isLast = step === lines.length - 1;

  return (
    <div className="min-h-screen flex items-center justify-center px-8 relative z-10">
      <div className="max-w-md w-full text-center space-y-10">

        <TypewriterText
          lines={lines[step]}
          speed={45}
          lineDelay={800}
        />

        {!isLast && (
          <button
            onClick={() => setStep((s) => s + 1)}
            className="text-sm italic text-muted-foreground hover:text-primary"
          >
            continue…
          </button>
        )}

        {isLast && (
          <button
            onClick={onStart}
            className="px-10 py-4 rounded-full bg-primary text-primary-foreground btn-glow"
          >
            okay… start
          </button>
        )}
      </div>
    </div>
  );
};

/* ================= MAIN ================= */

const MainExperience = () => {
  const [selectedDay, setSelectedDay] = useState<DayContent | null>(null);
  const [unlocking, setUnlocking] = useState<DayContent | null>(null);

  const todayNumber = getCurrentDay();
  const todayContent =
    typeof todayNumber === "number"
      ? daysContent.find((d) => d.day === todayNumber)
      : null;

  // Unlock animation screen
  if (unlocking && !selectedDay) {
    return (
      <UnlockScreen
        day={unlocking.day}
        onComplete={() => {
          setSelectedDay(unlocking);
          setUnlocking(null);
        }}
      />
    );
  }

  // Day content
  if (selectedDay) {
    return (
      <DayView
        content={selectedDay}
        onBack={() => setSelectedDay(null)}
        totalDays={20}
      />
    );
  }

  // Main home screen
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">

      <h1 className="text-3xl text-primary text-glow mb-6">
        20 Days of You
      </h1>

      {todayContent && (
        <>
          <p className="text-sm text-muted-foreground mb-2">
            Day {todayContent.day}
          </p>

          <h2 className="text-2xl mb-6">
            {todayContent.emoji} {todayContent.title}
          </h2>

          <button
            onClick={() => setUnlocking(todayContent)}
            className="px-10 py-4 rounded-full bg-primary text-primary-foreground btn-glow"
          >
            open today’s moment
          </button>
        </>
      )}
    </div>
  );
};

/* ================= ROOT ================= */

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
