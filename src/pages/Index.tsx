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
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-muted/80 text-foreground text-xs font-sans flex items-center justify-center backdrop-blur-sm border border-border hover:bg-muted"
      >
        🛠
      </button>
      {open && (
        <div className="absolute bottom-12 right-0 bg-card/95 backdrop-blur-md border border-border rounded-lg p-3 w-64 max-h-80 overflow-y-auto shadow-lg">
          <p className="text-xs text-cream-dim font-sans mb-2 tracking-widest uppercase">Dev: Jump to day</p>
          <div className="grid grid-cols-5 gap-1.5 mb-2">
            {Array.from({ length: 21 }, (_, i) => 20 - i).map((d) => (
              <button
                key={d}
                onClick={() => { onChangeDay(d); setOpen(false); }}
                className={`text-xs py-1.5 rounded font-sans transition-colors ${
                  currentDay === d
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/50 text-cream-dim hover:bg-muted"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="flex gap-1.5">
            <button
              onClick={() => { onChangeDay("not-started"); setOpen(false); }}
              className={`text-xs py-1.5 px-2 rounded font-sans flex-1 transition-colors ${
                currentDay === "not-started" ? "bg-primary text-primary-foreground" : "bg-muted/50 text-cream-dim hover:bg-muted"
              }`}
            >
              Pre-start
            </button>
            <button
              onClick={() => { onChangeDay("complete"); setOpen(false); }}
              className={`text-xs py-1.5 px-2 rounded font-sans flex-1 transition-colors ${
                currentDay === "complete" ? "bg-primary text-primary-foreground" : "bg-muted/50 text-cream-dim hover:bg-muted"
              }`}
            >
              Complete
            </button>
          </div>
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

  const revealedCount =
    dayNumber !== null
      ? getRevealedLetterCount(dayNumber)
      : dayStatus === "complete"
      ? NAME_LETTERS.length
      : 0;

  const activeLetterIndex =
    dayNumber !== null && dayNumber >= 8 ? revealedCount - 1 : null;

  const showCountdown = dayNumber !== null && isCountdownPhase(dayNumber);

  const handleOpenToday = () => {
    if (todayContent) setUnlocking(todayContent);
  };

  if (unlocking && !selectedDay) {
    return (
      <>
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
        <DevToggle currentDay={dayStatus} onChangeDay={(d) => { setDevDay(d); setUnlocking(null); setSelectedDay(null); }} />
      </>
    );
  }

  if (selectedDay) {
    return (
      <>
        <DayView
          content={selectedDay}
          onBack={() => setSelectedDay(null)}
          totalDays={20}
        />
        <DevToggle currentDay={dayStatus} onChangeDay={(d) => { setDevDay(d); setUnlocking(null); setSelectedDay(null); }} />
      </>
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
        <DevToggle currentDay={dayStatus} onChangeDay={(d) => { setDevDay(d); setUnlocking(null); setSelectedDay(null); }} />
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
        <DevToggle currentDay={dayStatus} onChangeDay={(d) => { setDevDay(d); setUnlocking(null); setSelectedDay(null); }} />
      </div>
    );
  }

  // Active day
  return (
    <div className="min-h-screen px-6 py-8 relative z-10 flex flex-col items-center justify-center">
      <div className="max-w-md w-full text-center">
        <p className="text-xs text-cream-dim font-sans tracking-[0.3em] uppercase mb-6">
          20 Days of You
        </p>

        <LetterTiles
          revealedCount={revealedCount}
          activeIndex={activeLetterIndex}
        />

        {showCountdown && <CountdownDisplay dayNumber={dayNumber!} />}

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

        <p className="mt-8 text-xs text-cream-dim/50 font-sans">
          {revealedCount} of {NAME_LETTERS.length} letters revealed
        </p>
      </div>
      <DevToggle currentDay={dayStatus} onChangeDay={(d) => { setDevDay(d); setUnlocking(null); setSelectedDay(null); }} />
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
