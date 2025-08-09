import { motion } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { logSession, checkSubject } from "../api";

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

// Types
type Option = {
  label: string;
  value: string;
};

type DropdownProps = {
  label: string;
  options: Option[];
  selected: Option | null;
  onSelect: (option: Option) => void;
};

// Dropdown Component
function Dropdown({ label, options, selected, onSelect }: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: Option) => {
    onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="bg-slate-800 border border-gray-300 px-4 py-2 rounded-md shadow-sm hover:bg-slate-900 w-48 text-left"
      >
        {selected ? selected.label : label}
        <span className="float-right">▾</span>
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-2 w-48 bg-slate-800 border border-gray-300 rounded-md shadow-lg">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover:bg-slate-900 cursor-pointer rounded-md"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Subject Selection
function SubjectSelection({
  setChosenSubject,
  subjects,
}: {
  setChosenSubject: (data: string) => void;
  subjects: string[];
}) {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const options = subjects.map((subject) => ({
    label: subject,
    value: subject,
  }));

  const handleChange = (option: Option) => {
    setSelectedOption(option);
    setChosenSubject(option.value);
  };

  return (
    <motion.div
      className="bg-gray-800 px-5 py-4 rounded-2xl"
      variants={itemVariants}
    >
      <div className="text-xl font-bold mb-2">Subject</div>
      <Dropdown
        label="Select a subject"
        options={options}
        selected={selectedOption}
        onSelect={handleChange}
      />
    </motion.div>
  );
}

// Duration Input
function DurationInput({
  duration,
  setDuration,
}: {
  duration: number;
  setDuration: (data: number) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setDuration(parseInt(value) || 0);
  };

  return (
    <motion.div
      className="bg-gray-800 px-5 py-4 rounded-2xl"
      variants={itemVariants}
    >
      <div className="text-xl font-bold mb-2">Duration</div>
      <div className="relative">
        <input
          type="text"
          value={duration}
          onChange={handleChange}
          placeholder="30"
          className="w-full py-2 px-4 pr-20 bg-slate-800 border border-white rounded-md text-white"
        />
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white pointer-events-none">
          minutes
        </span>
      </div>
    </motion.div>
  );
}

// Main Log Component
export default function Log({ subjects }: { subjects: string[] }) {
  const [chosenSubject, setChosenSubject] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);

  const handleLog = async () => {
    if (!chosenSubject) {
      alert("No subject chosen");
      return;
    }
    if (duration == 0) {
      alert("Duration can't be 0");
      return;
    }

    const res = await checkSubject(chosenSubject);
    if (!res) {
      alert("Subject not in your list. Please add it to your list first.");
      return;
    } else {
      logSession(chosenSubject, duration);
    }
  };

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
          <SubjectSelection
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
            >
              Start a <strong>{type}</strong>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
