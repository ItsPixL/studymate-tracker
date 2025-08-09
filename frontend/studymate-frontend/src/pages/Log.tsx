import { motion } from "motion/react";
import SubjectSelector from "../components/SubjectSelector";
import DurationInput from "../components/DurationInput";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0 },
};

// Types for log component
type LogProps = {
  subjects: string[];
  setChosenSubject: (data: string) => void;
  duration: number;
  setDuration: (data: number) => void;
  handleLog: () => void;
  controller: (data: string) => void;
};

// Main Log Component
export default function Log({
  subjects,
  setChosenSubject,
  duration,
  setDuration,
  handleLog,
  controller,
}: LogProps) {
  const handleDeleteSelection = () => {
    setChosenSubject("");
    setDuration(0);
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
          <DurationInput duration={duration} setDuration={setDuration} />
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
            onClick={handleLog}
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
