// ./pages/Log.tsx

// Import Modules
import { motion } from "motion/react";
import { useState } from "react";

// Import Components
import SubjectSelector from "../components/SubjectSelector";
import DurationInput from "../components/DurationInput";

// Import Variables
import { containerVariants, itemVariants } from "../animation/varients";

// Define Types
type types = {
  subjects: string[];
  handleLog: (data: { subject: string; duration: number }) => void;
  controller: (data: string) => void;
};

// Main Log Component
export default function Log({ subjects, handleLog, controller }: types) {
  const [chosenSubject, setChosenSubject] = useState<string>("");
  const [durationMin, setDurationMin] = useState<number>(0);

  const handleDeleteSelection = () => {
    setChosenSubject("");
    setDurationMin(0);
  };

  const handleLogMin = () => {
    const seconds = durationMin * 60;
    handleLog({ subject: chosenSubject, duration: seconds });
  };

  return (
    <motion.div
      className="bg-slate-900/60 backdrop-blur-lg rounded-3xl border-white border-2 my-6 p-5"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      transition={{ when: "beforeChildren", delay: 1, staggerChildren: 0.1 }}
    >
      <motion.span className="text-2xl font-bold" variants={itemVariants}>
        Log a Subject
      </motion.span>

      <div>
        <div className="grid grid-cols-2 my-2 gap-2">
          <SubjectSelector
            subjects={subjects}
            setChosenSubject={setChosenSubject}
          />
          <DurationInput duration={durationMin} setDuration={setDurationMin} />
        </div>

        <motion.div
          className="flex flex-cols gap-2 mb-4"
          variants={itemVariants}
        >
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#475569" }}
            whileTap={{ scale: 0.95 }}
            className="bg-slate-800 w-max px-2 py-3 rounded-md flex items-center justify-center"
          >
            <span
              className="material-symbols-outlined"
              onClick={handleDeleteSelection}
            >
              delete
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, filter: "brightness(2)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-900 to-purple-900 w-full rounded-md"
            onClick={handleLogMin}
          >
            Log Session
          </motion.button>
        </motion.div>

        <motion.div
          className="text-center text-white my-4 text-lg"
          variants={itemVariants}
        >
          Or...
        </motion.div>

        <div className="flex flex-col gap-2">
          {["Timer", "Stopwatch", "Pomodoro"].map((type) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.05, filter: "brightness(2)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-900 to-purple-900 w-full px-4 py-3 rounded-md text-white text-center"
              variants={itemVariants}
              onClick={() => controller(type)}
            >
              Start a <strong>{type}</strong>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
