import { useState, useMemo } from "react";
import ParticleBackground from "@/components/ParticleBackground";
import TypewriterText from "@/components/TypewriterText";
import DayView from "@/components/DayView";
import UnlockScreen from "@/components/UnlockScreen";
import { daysContent, DayContent } from "@/data/daysContent";
import {
  getCurrentDay,
  getRevealedLetterCount,
  isCountdownPhase,
  getCountdownText,
  NAME_LETTERS,
  DayStatus,
} from "@/utils/dateUtils";

const LetterTiles = ({
  revealedCount,
  activeIndex,
}: {
  revealedCount: number;
  activeIndex: number | null;
}) => (
  <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8">
    {NAME_LETTERS.map((letter, i) => {
      const isRevealed = i < revealedCount;
      const isActive = i === activeIndex;
      return (
        <div
          key={i}
          className={`
            w-9 h-12 md:w-11 md:h-14 rounded-lg flex items-center justify-center
            font-serif text-lg md:text-xl transition-all duration-700
            ${isRevealed
              ? isActive
                ? "letter-tile-active"
                : "letter-tile"
              : "letter-tile-locked"
            }
          `}
          style={{ transitionDelay: isRevealed ? `${i * 80}ms` : "0ms" }}
        >
          <span className={isRevealed ? "" : "blur-sm select-none"}>
            {letter}
          </span>
        </div>
      );
    })}
  </div>
);

const CountdownDisplay = ({ dayNumber }: { dayNumber: number }) => (
  <div className="flex flex-col items-center my-8 animate-fade-in">
    <span className="font-serif text-8xl md:text-9xl text-primary">
      {dayNumber}
    </span>
    <p className="font-serif text-lg text-cream-dim mt-4 italic">
      {getCountdownText(dayNumber)}
    </p>
  </div>
);

/* ================== UPDATED LANDING ================== */

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

  const handleNext = () => {
    if (step < lines.length - 1) {
      setStep((s) => s + 1);
    }
  };

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
            onClick={handleNext}
            className="text-sm italic text-muted-foreground hover:text-primary transition-all duration-300"
          >
            continue…
          </button>
        )}

        {isLast && (
          <button
            onClick={onStart}
            className="px-10 py-4 rounded-full font-serif text-lg bg-primary text-primary-foreground 
              btn-glow animate-pulse-soft transition-all duration-300 hover:scale-105"
          >
            okay… start
          </button>
        )}
      </div>
    </div>
  );
};

/* ================== REST SAME ================== */

const DevToggle = ({
  currentDay,
  onChangeDay,
}: {
  currentDay: DayStatus;
  onChangeDay: (d: DayStatus) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button onClick={() => setOpen(!open)}>🛠</button>
      {open && (
        <div>
          {Array.from({ length: 21 }, (_, i) => 20 - i).map((d) => (
            <button key={d} onClick={() => onChangeDay(d)}>
              {d}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const MainExperience = () => {
  const [selectedDay, setSelectedDay] = useState<DayContent | null>(null);
  const [unlocking, setUnlocking] = useState<DayContent | null>(null);
  const [devDay, setDevDay] = useState<DayStatus | null>(null);

  const naturalDay: DayStatus = useMemo(() => getCurrentDay(), []);
  const dayStatus = devDay !== null ? devDay : naturalDay;
  const dayNumber = typeof dayStatus === "number" ? dayStatus : null;

  const todayContent = useMemo(() => {
    if (dayNumber === null) return null;
    return daysContent.find((d) => d.day === dayNumber) || null;
  }, [dayNumber]);

  const handleOpenToday = () => {
    if (todayContent) setUnlocking(todayContent);
  };

  if (selectedDay) {
    return (
      <DayView
        content={selectedDay}
        onBack={() => setSelectedDay(null)}
        totalDays={20}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {todayContent && (
        <button onClick={handleOpenToday}>
          Open today
        </button>
      )}
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
