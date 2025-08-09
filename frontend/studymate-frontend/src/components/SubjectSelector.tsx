// ./components/SubjectSelector.tsx

// Import Modules
import { motion } from "motion/react";
import { useState } from "react";

// Import Components
import Dropdown from "./Dropdown";

// Import Variables
import { itemVariants } from "../animation/varients";

// Define Types
type Option = {
  label: string;
  value: string;
};

type types = {
  setChosenSubject: (data: string) => void;
  subjects: string[];
  color?: string;
};

// Export SubjectSelector
export default function SubjectSelector({
  setChosenSubject,
  subjects,
  color = "bg-gray-800",
}: types) {
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
      className={`${color} px-5 py-4 rounded-2xl`}
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
