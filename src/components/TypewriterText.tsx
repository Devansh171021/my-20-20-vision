import { useState, useEffect } from "react";

interface TypewriterTextProps {
  lines: string[];
  onComplete?: () => void;
  speed?: number;
  lineDelay?: number;
}

const TypewriterText = ({ lines, onComplete, speed = 40, lineDelay = 800 }: TypewriterTextProps) => {
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

  return (
    <div className="space-y-4">
      {displayedLines.map((line, i) => (
        <p key={i} className="font-serif text-xl md:text-2xl text-foreground/90 leading-relaxed animate-fade-in-slow">
          {line}
        </p>
      ))}
      {currentLine < lines.length && (
        <p className="font-serif text-xl md:text-2xl text-foreground/90 leading-relaxed">
          {lines[currentLine].substring(0, currentChar)}
          <span className="inline-block w-0.5 h-6 bg-primary ml-1 animate-pulse" />
        </p>
      )}
    </div>
  );
};

export default TypewriterText;
