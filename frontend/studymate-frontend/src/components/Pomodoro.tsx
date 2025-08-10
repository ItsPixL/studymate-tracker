// ./components/Pomodoro.tsx

// Import Modules
import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";

// Import Components
import SubjectSelector from "./SubjectSelector";
import DurationInput from "./DurationInput";

// Import Variables
import { itemVariants } from "../animation/varients";

// Define Types
type types = {
  subjects: string[];
  handleLog: (data: { subject: string; duration: number }) => void;
  timerSet: boolean;
  setTimerSet: (data: boolean) => void;
};

type Option = {
  value: string;
  label: string;
};

// Define Button Props
const motionProps = {
  whileHover: { scale: 1.05, filter: "brightness(2)" },
  whileTap: { scale: 0.95 },
  varients: { itemVariants },
  className:
    "bg-gradient-to-r from-blue-900 to-purple-900 w-full px-4 py-3 rounded-md mt-3 text-white text-center disabled:opacity-50 disabled:cursor-not-allowed",
};

// Export Pomodoro
export default function Pomodoro({
  subjects,
  handleLog,
  timerSet,
  setTimerSet,
}: types) {
  const [phase, setPhase] = useState<"work" | "break">("work");
  const [cycleCount, setCycleCount] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedWork, setElapsedWork] = useState<number>(0);
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [chosenSubject, setChosenSubject] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const intervalRef = useRef<number | null>(null);

  const workTime = 25 * 60;
  const shortBreak = 5 * 60;
  const longBreak = 15 * 60;
  const cyclesBeforeLongBreak = 4;

  // Start Timer
  const startTimer = () => {
    if (intervalRef.current !== null) return;
    setIsRunning(true);
    intervalRef.current = window.setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
  };

  useEffect(() => {
    if (isRunning && phase === "work" && timeLeft > 0) {
      setElapsedWork((et) => et + 1);
    }
    if (timeLeft === 0) {
      pauseTimer();
      nextPhase();
    }
  }, [timeLeft]);

  // Pause Timer
  const pauseTimer = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  };

  // Reset Timer
  const resetTimer = () => {
    pauseTimer();
    setPhase("work");
    setCycleCount(0);
    setElapsedWork(0);
    setTimeLeft(workTime);
  };

  // Next Phase
  const nextPhase = () => {
    if (phase === "work") {
      const nextCycle = cycleCount + 1;
      setCycleCount(nextCycle);
      if (nextCycle % cyclesBeforeLongBreak === 0) {
        setPhase("break");
        setTimeLeft(longBreak);
      } else {
        setPhase("break");
        setTimeLeft(shortBreak);
      }
    } else {
      setPhase("work");
      setTimeLeft(workTime);
    }
  };

  // Log Time
  const logTime = () => {
    if (elapsedWork > 0 && chosenSubject) {
      handleLog({ subject: chosenSubject, duration: elapsedWork });
      setElapsedWork(0);
    }
  };

  useEffect(() => {
    return () => pauseTimer();
  }, []);

  // Format Time
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Go back to the timer input page
  const goBack = () => {
    if (elapsedWork != 0) {
      const res = confirm(
        "Are you sure? This will get rid of your progress! Make sure you have logged if you want to keep your progress."
      );
      if (!res) return;
    }
    setTimeLeft(0);
    setTimerSet(false);
  };

  // Setup Screen
  const setupScreen = (
    <div>
      <div className="flex justify-center gap-6">
        <div>
          <h3 className="text-center mb-2">Work (min)</h3>
          <DurationInput
            title=""
            unit="minutes"
            duration={workMinutes}
            setDuration={setWorkMinutes}
            color="bg-transparent"
          />
        </div>
        <div>
          <h3 className="text-center mb-2">Break (min)</h3>
          <DurationInput
            title=""
            unit="minutes"
            duration={breakMinutes}
            setDuration={setBreakMinutes}
            color="bg-transparent"
          />
        </div>
      </div>
      <motion.button
        {...motionProps}
        onClick={() => {
          setTimeLeft(workMinutes * 60);
          setTimerSet(true);
        }}
      >
        Set Pomodoro
      </motion.button>
    </div>
  );

  // Define Button Groups
  const pomodoroBtns1 = [
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

  const pomodoroBtns2 = [
    {
      label: "Go back",
      onClick: () => goBack(),
      disabled: false,
    },
    {
      label: "Log",
      onClick: () => logTime(),
      disabled: elapsedWork === 0 || !chosenSubject,
    },
  ];

  // Running Screen
  const runningScreen = (
    <div>
      <h2 className="text-center text-xl mb-2">
        {phase === "work" ? "Work Phase" : "Break Phase"}
      </h2>
      <h1 className="text-center text-5xl mb-10 mt-6">
        {formatTime(timeLeft)}
      </h1>

      {!isRunning && phase === "work" && (
        <div className="flex items-center justify-between mb-6">
          <SubjectSelector
            setChosenSubject={setChosenSubject}
            subjects={subjects}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            color="bg-transparent"
          />
          <div>Session Duration: {formatTime(elapsedWork)}</div>
        </div>
      )}

      {[pomodoroBtns1, pomodoroBtns2].map((btnsGroup, idx) => (
        <div key={idx} className="flex gap-2 justify-center mb-4">
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

  return <div>{!timerSet ? setupScreen : runningScreen}</div>;
}
