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
    <div className="relative">
      <span
        className="font-serif text-8xl md:text-9xl text-primary animate-countdown-glow"
        style={{
          textShadow:
            "0 0 40px hsl(40 60% 69% / 0.5), 0 0 80px hsl(40 60% 69% / 0.2)",
        }}
      >
        {dayNumber}
      </span>
    </div>
    <p className="font-serif text-lg text-cream-dim mt-4 italic">
      {getCountdownText(dayNumber)}
    </p>
  </div>
);

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
          <div
            className="animate-fade-in"
            style={{ animationDelay: "0.3s", animationFillMode: "both" }}
          >
            <TypewriterText
              lines={secondLines}
              speed={45}
              lineDelay={1000}
              onComplete={() => setTimeout(() => setTypingDone(true), 800)}
            />
          </div>
        )}

        {typingDone && (
          <div
            className="animate-fade-in pt-8"
            style={{ animationDelay: "0.5s", animationFillMode: "both" }}
          >
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
  const [unlocking, setUnlocking] = useState<DayContent | null>(null);

  const dayStatus: DayStatus = useMemo(() => getCurrentDay(), []);

  const dayNumber = typeof dayStatus === "number" ? dayStatus : null;

  const todayContent = useMemo(() => {
    if (dayNumber === null) return null;
    return daysContent.find((d) => d.day === dayNumber) || null;
  }, [dayNumber]);

  const revealedCount =
    dayNumber !== null
      ? getRevealedLetterCount(dayNumber)
      : dayStatus === "complete"
      ? NAME_LETTERS.length
      : 0;

  // The active letter index is the most recently unlocked one (only during letter phase)
  const activeLetterIndex =
    dayNumber !== null && dayNumber >= 8 ? revealedCount - 1 : null;

  const showCountdown = dayNumber !== null && isCountdownPhase(dayNumber);

  const handleOpenToday = () => {
    if (todayContent) setUnlocking(todayContent);
  };

  if (unlocking && !selectedDay) {
    return (
      <UnlockScreen
        day={unlocking.day}
        letter={
          activeLetterIndex !== null
            ? NAME_LETTERS[activeLetterIndex]
            : undefined
        }
        countdownNumber={showCountdown ? dayNumber! : undefined}
        onComplete={() => {
          setSelectedDay(unlocking);
          setUnlocking(null);
        }}
      />
    );
  }

  if (selectedDay) {
    return (
      <DayView
        content={selectedDay}
        onBack={() => setSelectedDay(null)}
        totalDays={20}
      />
    );
  }

  // Not started yet
  if (dayStatus === "not-started") {
    return (
      <div className="min-h-screen flex items-center justify-center px-8 relative z-10">
        <div className="max-w-md w-full text-center space-y-8">
          <p className="text-xs text-cream-dim font-sans tracking-[0.3em] uppercase mb-2">
            20 Days of You
          </p>
          <LetterTiles revealedCount={0} activeIndex={null} />
          <p className="font-serif text-xl text-cream-dim italic animate-pulse-soft">
            coming soon…
          </p>
        </div>
      </div>
    );
  }

  // Complete (after birthday)
  if (dayStatus === "complete") {
    return (
      <div className="min-h-screen flex items-center justify-center px-8 relative z-10">
        <div className="max-w-md w-full text-center space-y-8">
          <LetterTiles revealedCount={NAME_LETTERS.length} activeIndex={null} />
          <p className="font-serif text-2xl text-primary text-glow">
            Happy Birthday, Priyodarshini ✦
          </p>
        </div>
      </div>
    );
  }

  // Active day
  return (
    <div className="min-h-screen px-6 py-8 relative z-10 flex flex-col items-center justify-center">
      <div className="max-w-md w-full text-center">
        {/* Header */}
        <p className="text-xs text-cream-dim font-sans tracking-[0.3em] uppercase mb-6">
          20 Days of You
        </p>

        {/* Letter tiles */}
        <LetterTiles
          revealedCount={revealedCount}
          activeIndex={activeLetterIndex}
        />

        {/* Countdown display for days 7-0 */}
        {showCountdown && <CountdownDisplay dayNumber={dayNumber!} />}

        {/* Today's info */}
        {todayContent && (
          <div className="mt-6 space-y-4 animate-fade-in">
            <p className="text-xs text-cream-dim font-sans tracking-widest uppercase">
              Day {todayContent.day}
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-primary text-glow">
              {todayContent.emoji} {todayContent.title}
            </h2>

            <button
              onClick={handleOpenToday}
              className="mt-6 px-10 py-4 rounded-full font-serif text-lg bg-primary text-primary-foreground 
                btn-glow animate-pulse-soft transition-all duration-300 hover:scale-105"
            >
              Open today's moment
            </button>
          </div>
        )}

        {/* Progress indicator */}
        <p className="mt-8 text-xs text-cream-dim/50 font-sans">
          {revealedCount} of {NAME_LETTERS.length} letters revealed
        </p>
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
