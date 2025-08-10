// ./components/Timer.tsx

// Import Modules
import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";

// Import Components
import DurationInput from "./DurationInput";

// Import Variables
import { itemVariants } from "../animation/varients";
import SubjectSelector from "./SubjectSelector";

// Define Types
type TimeUnit = "hours" | "minutes" | "seconds";
type types = {
  timerSet: boolean;
  setTimerSet: (data: boolean) => void;
  subjects: string[];
  handleLog: (data: { subject: string; duration: number }) => void;
};
type Option = {
  label: string;
  value: string;
};

// Define Button Props
const motionProps = {
  whileHover: { scale: 1.05, filter: "brightness(2)" },
  whileTap: { scale: 0.95 },
  varients: { itemVariants },
  className:
    "bg-gradient-to-r from-blue-900 to-purple-900 w-full px-4 py-3 rounded-md mt-3 text-white text-center disabled:opacity-50 disabled:cursor-not-allowed",
};

// Export Timer
export default function Timer({
  timerSet,
  setTimerSet,
  subjects,
  handleLog,
}: types) {
  // Constants
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [chosenSubject, setChosenSubject] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const time = hours * 3600 + minutes * 60 + seconds;
  const sessionLength = time - timeLeft;
  const intervalRef = useRef<number | null>(null);

  // Convert user input to timer length
  const setTimer = () => {
    if (!time) {
      alert("Time must be more than 0 seconds");
    } else {
      setTimeLeft(time);
      setTimerSet(true);
    }
  };

  // Start the timer
  const startTimer = () => {
    if (intervalRef.current !== null) return;

    setIsRunning(true);
    intervalRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) return prev - 1;
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setIsRunning(false);
        return 0;
      });
    }, 1000);
  };

  // Pause the timer
  const pauseTimer = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  };

  // Reset the timer
  const resetTimer = () => {
    if (timeLeft < time) {
      const res = confirm("Are you sure? This will get rid of your progress!");
      if (!res) return;
    }
    pauseTimer();
    setTimer();
  };

  useEffect(() => {
    return () => pauseTimer();
  }, []);

  // Go back to the timer input page
  const goBack = () => {
    if (timeLeft < time) {
      const res = confirm(
        "Are you sure? This will get rid of your progress! Make sure you have logged if you want to keep your progress."
      );
      if (!res) return;
    }
    setTimeLeft(0);
    setTimerSet(false);
  };

  // Submit session
  const submitSession = () => {
    handleLog({ subject: chosenSubject, duration: sessionLength });
  };

  // Format time from seconds to h:m:s
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

  // Durations (for array-based repetition)
  const durations: Record<TimeUnit, number> = {
    hours,
    minutes,
    seconds,
  };

  const setters: Record<
    TimeUnit,
    React.Dispatch<React.SetStateAction<number>>
  > = {
    hours: setHours,
    minutes: setMinutes,
    seconds: setSeconds,
  };

  // Buttons (for array-based repetition)
  const timerBtns1 = [
    {
      label: "Start",
      onClick: () => startTimer(),
      disabled: isRunning,
    },
    {
      label: "Pause",
      onClick: () => pauseTimer(),
      disabled: !isRunning,
    },
    {
      label: "Reset",
      onClick: () => resetTimer(),
      disabled: false,
    },
  ];

  const timerBtns2 = [
    {
      label: "Go back",
      onClick: () => goBack(),
      disabled: false,
    },
    {
      label: "Log Subject",
      onClick: () => submitSession(),
      disabled: false,
    },
  ];

  return (
    <div>
      {!timerSet ? (
        <div>
          <div className="flex">
            {["Hours", "Minutes", "Seconds"].map((type) => {
              const unit = type.toLowerCase();
              return (
                <DurationInput
                  key={unit}
                  title={""}
                  unit={unit}
                  duration={durations[unit as TimeUnit]}
                  setDuration={setters[unit as TimeUnit]}
                  color={"bg-transparent"}
                />
              );
            })}
          </div>
          <motion.button {...motionProps} onClick={() => setTimer()}>
            Set Timer
          </motion.button>
        </div>
      ) : (
        <div>
          <h1 className="text-center text-5xl mb-10 mt-10">
            {formatTime(timeLeft)}
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
              <div>Session Duration: {formatTime(sessionLength)}</div>
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
      )}
    </div>
  );
}
