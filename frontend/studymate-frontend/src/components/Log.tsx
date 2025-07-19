import { motion } from "motion/react";
import { useState, useRef, useEffect } from "react";

// Motion Varients
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

type Option = {
  label: string;
  value: string;
};

type DropdownProps = {
  label: string;
  options: Option[];
  onSelect: (option: Option) => void;
};

function Dropdown({ label, options, onSelect }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: Option) => {
    setSelected(option);
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

// Subject selector
function SubjectSelection() {
  const [subject, setSubject] = useState("Math");

  const handleChange = (option: Option) => {
    setSubject(option.value); // or option.label check later code
    console.log(subject);
  };

  const options = [
    { label: "Math", value: "math" },
    { label: "Physics", value: "physics" },
    { label: "English", value: "english" },
  ];

  return (
    <div className="bg-gray-800 px-5 py-4 rounded-2xl">
      <div className="text-xl font-bold mb-2">Subject</div>
      <Dropdown
        label="Select a subject"
        options={options}
        onSelect={handleChange}
      ></Dropdown>
    </div>
  );
}

function DurationInput() {
  const [duration, setDuration] = useState("");
  // LATER: IF duration = "", use 30

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setDuration(value);
  };

  return (
    <div className="bg-gray-800 px-5 py-4 rounded-2xl">
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
    </div>
  );
}

// Log
export default function Log() {
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
          <SubjectSelection />
          <DurationInput />
        </div>
        <div className="flex flex-cols gap-2">
          <button className="bg-slate-800 w-max px-2 py-3 rounded-md flex items-center justify-center">
            <span className="material-symbols-outlined">delete</span>
          </button>
          <button className="bg-gradient-to-r from-blue-700 to-purple-700 w-full rounded-md">
            Log Session
          </button>
        </div>
      </div>
    </motion.div>
  );
}
