import { motion } from "motion/react";
import { useState } from "react";

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

// Subject selector
function SubjectSelection() {
  const [subject, setSubject] = useState("Math");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSubject(event.target.value);
  };

  return (
    <div className="bg-gray-800 px-5 py-4 rounded-3xl">
      <label htmlFor="subject" className="text-2xl font-bold">
        Subject:
        <br />
      </label>
      <select
        id="subject"
        value={subject}
        onChange={handleChange}
        className="bg-red-500 px-3 py-2 rounded-xl w-full appearance-none"
      >
        <option value="Math">Math</option>
        <option value="English"> English</option>
        {/* CHANGE LATER */}
      </select>
    </div>

    // NOTE: Change this to a custom dropdown
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
        <div className="grid grid-cols-2 my-2">
          <SubjectSelection />
          <div>Duration:</div>
        </div>
      </div>
    </motion.div>
  );
}
