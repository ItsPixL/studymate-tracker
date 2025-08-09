import { motion } from "motion/react";
import { useState } from "react";
import Dropdown from "./Dropdown";

// Types
type Option = {
  label: string;
  value: string;
};

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0 },
};

export default function SubjectSelector({
  setChosenSubject,
  subjects,
  color = "bg-gray-800",
}: {
  setChosenSubject: (data: string) => void;
  subjects: string[];
  color?: string;
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
