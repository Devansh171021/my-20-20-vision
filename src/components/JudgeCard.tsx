import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface JudgeCardProps {
  memory: string;
  verdict: string;
  onNext: () => void;
}

const JudgeCard = ({ memory, verdict, onNext }: JudgeCardProps) => {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (flipped) {
      const t = setTimeout(onNext, 2500);
      return () => clearTimeout(t);
    }
  }, [flipped, onNext]);

  return (
    <div className="animate-fade-in flex flex-col items-center space-y-6">
      <p className="font-serif text-sm italic text-muted-foreground">
        {flipped ? "the verdict…" : "tap to flip"}
      </p>

      <div
        className="relative w-64 h-40 cursor-pointer"
        style={{ perspective: "800px" }}
        onClick={() => !flipped && setFlipped(true)}
      >
        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 rounded-2xl romantic-card flex items-center justify-center p-6"
            style={{ backfaceVisibility: "hidden" }}
          >
            <p className="font-serif text-base text-foreground text-center leading-relaxed">
              "{memory}"
            </p>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 rounded-2xl romantic-card flex items-center justify-center p-6"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <p className="font-serif text-lg text-primary text-glow text-center italic">
              {verdict}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default JudgeCard;
