import { useEffect, useState } from 'react';

interface MediaContainerProps {
  type: 'photo' | 'voice';
  caption?: string;
}

export const MediaContainer = ({ type, caption = '' }: MediaContainerProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (type === 'voice') {
    return (
      <div
        className={`flex justify-center transition-all duration-700 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="relative p-8 glass-card-glow rounded-2xl">
          {/* Animated glow rings */}
          <div
            className="absolute inset-0 rounded-2xl animate-pulse-soft"
            style={{
              boxShadow: `inset 0 0 30px hsl(40 60% 69% / 0.2)`,
            }}
          />

          {/* Voice icon */}
          <div className="relative z-10 text-5xl animate-float">
            🎧
          </div>
        </div>
      </div>
    );
  }

  // Photo container
  return (
    <div
      className={`space-y-4 transition-all duration-700 ${
        isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      {/* Photo placeholder with gradient */}
      <div className="relative w-64 h-64 mx-auto rounded-2xl overflow-hidden glass-card-glow">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-soft to-rose opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gold-soft opacity-60 text-sm">📸</p>
        </div>
      </div>

      {/* Caption */}
      {caption && (
        <p className="text-center text-sm italic text-gold-soft opacity-80">
          {caption}
        </p>
      )}
    </div>
  );
};
