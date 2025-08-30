// ./components/Clock.tsx

// Import Modules
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

// Define Types
type types = { digit: string };

// Digit for Live Time
export function AnimatedDigit({ digit }: types) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={digit}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="inline-block font-sans"
      >
        {digit}
      </motion.div>
    </AnimatePresence>
  );
}

// Clock for Live Time
export function Clock() {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <div className="text-white text-2xl font-mono flex space-x-1">
      {timeString.split("").map((char, index) => (
        <AnimatedDigit key={index + char} digit={char} />
      ))}
    </div>
  );
}
