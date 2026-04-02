import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ShooterTargetProps {
  onNext: () => void;
}

const ShooterTarget = ({ onNext }: ShooterTargetProps) => {
  const [hit, setHit] = useState(false);

  const handleTap = () => {
    if (hit) return;
    setHit(true);
  };

  useEffect(() => {
    if (hit) {
      const t = setTimeout(onNext, 1000);
      return () => clearTimeout(t);
    }
  }, [hit, onNext]);

  return (
    <div className="animate-fade-in flex flex-col items-center justify-center space-y-6">
      <p className="font-serif text-sm italic text-muted-foreground">tap the target</p>

      <motion.div
        className="relative cursor-pointer select-none"
        whileTap={{ scale: 0.95 }}
        onClick={handleTap}
      >
        {/* Outer ring */}
        <div className="w-32 h-32 rounded-full border-2 border-primary/40 flex items-center justify-center">
          {/* Middle ring */}
          <div className="w-20 h-20 rounded-full border-2 border-primary/60 flex items-center justify-center">
            {/* Inner ring */}
            <div className="w-10 h-10 rounded-full border-2 border-primary/80 flex items-center justify-center">
              {/* Bullseye */}
              <div className="w-4 h-4 rounded-full bg-primary" />
            </div>
          </div>
        </div>

        {/* Hit splash */}
        <AnimatePresence>
          {hit && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.4, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div
                className="w-16 h-16 rounded-full"
                style={{
                  background: "radial-gradient(circle, hsl(0 80% 55% / 0.9), hsl(0 80% 55% / 0) 70%)",
                  boxShadow: "0 0 40px hsl(0 80% 55% / 0.6)",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {hit && (
        <motion.p
          className="font-serif text-primary text-glow text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          direct hit 🎯
        </motion.p>
      )}
    </div>
  );
};

export default ShooterTarget;
