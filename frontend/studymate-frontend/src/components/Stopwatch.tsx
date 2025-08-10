// ./components/Stopwatch.tsx

// Import Modules
import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";

// Import Components
import SubjectSelector from "./SubjectSelector";

// Import Variables
import { itemVariants } from "../animation/varients";

// Define Types
type Option = {
  label: string;
  value: string;
};

type Props = {
  subjects: string[];
  handleLog: (data: { subject: string; duration: number }) => void;
  setTimerSet: (data: boolean) => void;
};

// Define Button Props
const motionProps = {
  whileHover: { scale: 1.05, filter: "brightness(2)" },
  whileTap: { scale: 0.95 },
  varients: { itemVariants },
  className:
    "bg-gradient-to-r from-blue-900 to-purple-900 w-full px-4 py-3 rounded-md mt-3 text-white text-center disabled:opacity-50 disabled:cursor-not-allowed",
};

// Export Stopwatch
export default function Stopwatch({ subjects, handleLog, setTimerSet }: Props) {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [chosenSubject, setChosenSubject] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const intervalRef = useRef<number | null>(null);

  // Start Stopwatch
  const startTimer = () => {
    if (intervalRef.current !== null) return;
    setIsRunning(true);
    setTimerSet(true);
    intervalRef.current = window.setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
  };

  // Pause Stopwatch
  const pauseTimer = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
    setTimerSet(false);
  };

  // Reset Stopwatch
  const resetTimer = () => {
    const res = confirm("Are you sure? This will reset the stopwatch!");
    if (!res) return;
    pauseTimer();
    setElapsedTime(0);
  };

  // Submit Session Log
  const submitSession = () => {
    if (!chosenSubject) {
      alert("Please select a subject before logging.");
      return;
    }
    handleLog({ subject: chosenSubject, duration: elapsedTime });
  };

  // Format Time: h:mm:ss
  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    const parts = [];

    if (h > 0) parts.push(h.toString());
    if (m > 0 || h > 0) parts.push(m.toString().padStart(h > 0 ? 2 : 1, "0"));
    parts.push(s.toString().padStart(m > 0 || h > 0 ? 2 : 1, "0"));

    return parts.join(":");
  };

  useEffect(() => {
    return () => pauseTimer();
  }, []);

  // Button Groups
  const timerBtns1 = [
    {
      label: "Start",
      onClick: startTimer,
      disabled: isRunning,
    },
    {
      label: "Pause",
      onClick: pauseTimer,
      disabled: !isRunning,
    },
    {
      label: "Reset",
      onClick: resetTimer,
      disabled: false,
    },
  ];

  const timerBtns2 = [
    {
      label: "Log Subject",
      onClick: submitSession,
      disabled: false,
    },
  ];

  return (
    <div>
      <h1 className="text-center text-5xl mb-10 mt-10">
        {formatTime(elapsedTime)}
      </h1>

      {!isRunning && (
        <div className="flex items-center justify-between">
          <SubjectSelector
            setChosenSubject={setChosenSubject}
            subjects={subjects}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            color={"bg-transparent"}
          />
          <div>Session Duration: {formatTime(elapsedTime)}</div>
        </div>
      )}

      {[timerBtns1, timerBtns2].map((btnsGroup, idx) => (
        <div key={idx} className="flex gap-2">
          {btnsGroup.map(({ label, onClick, disabled }) => (
            <motion.button
              key={label}
              onClick={onClick}
              disabled={disabled}
              {...motionProps}
            >
              {label}
            </motion.button>
          ))}
        </div>
      ))}
    </div>
  );
}
