import { useState, useEffect } from "react";

interface TypewriterTextProps {
  lines: string[];
  onComplete?: () => void;
  speed?: number;
  lineDelay?: number;
  isReveal?: boolean;
}

const AdmirationOverlay = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <p className="fixed bottom-6 left-0 right-0 text-center font-serif text-[11px] italic text-gold/50 animate-fade-in z-50"
       style={{ textShadow: "0 0 8px hsl(40 80% 60% / 0.3)" }}>
      I hope you know how much you're admired today.
    </p>
  );
};

const TypewriterText = ({ lines, onComplete, speed = 40, lineDelay = 800, isReveal = false }: TypewriterTextProps) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentLine >= lines.length) {
      setIsTyping(false);
      onComplete?.();
      return;
    }

    if (currentChar < lines[currentLine].length) {
      const timeout = setTimeout(() => {
        setCurrentChar((c) => c + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, lines[currentLine]]);
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, lineDelay);
      return () => clearTimeout(timeout);
    }
  }, [currentLine, currentChar, lines, speed, lineDelay, onComplete]);

  const textClass = isReveal
    ? "font-serif text-xl md:text-2xl leading-relaxed animate-fade-in-slow shimmer-gold-text"
    : "font-serif text-xl md:text-2xl text-foreground/90 leading-relaxed animate-fade-in-slow";

  return (
    <div className="space-y-4">
      {displayedLines.map((line, i) => (
        <p key={i} className={textClass}>
          {line}
        </p>
      ))}
      {currentLine < lines.length && (
        <p className={textClass}>
          {lines[currentLine].substring(0, currentChar)}
          <span className="inline-block w-0.5 h-6 bg-primary ml-1 animate-pulse" />
        </p>
      )}
      <AdmirationOverlay />
    </div>
  );
};

export default TypewriterText;
