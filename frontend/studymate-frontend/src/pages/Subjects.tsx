// ./pages/Subjects.tsx

// Import Modules
import { motion } from "motion/react";
import { removeSubject } from "../api";

// Import Variables
import { containerVariants, itemVariants } from "../animation/varients";

// Subject component
function Subject({
  subject,
  index,
  updateList,
}: {
  subject: string;
  index: number;
  updateList: () => void;
}) {
  const colors = [
    "bg-red-600/80",
    "bg-orange-600/80",
    "bg-yellow-600/80",
    "bg-lime-600/80",
    "bg-emerald-600/80",
    "bg-teal-600/80",
    "bg-cyan-600/80",
    "bg-blue-600/80",
    "bg-violet-600/80",
    "bg-fuchsia-600/80",
    "bg-pink-600/80",
  ];

  const handleDelete = () => {
    removeSubject(subject)
      .then((response) => console.log(response.message))
      .then(updateList)
      .catch((error) => console.error(error.message));
  };

  return (
    <motion.div
      key={index}
      className={`w-full rounded-lg`}
      variants={itemVariants}
      whileHover={{
        scale: 1.01,
        boxShadow: "0 8px 15px rgba(0,0,0,0.3)",
        transition: { duration: 0.25 },
      }}
    >
      <div
        className={`flex justify-between items-center w-full backdrop-blur-lg py-3 px-6 text-2xl rounded-lg shadow-md select-none ${
          colors[index % colors.length]
        }`}
      >
        <span>{subject}</span>
        <motion.span
          className="material-symbols-outlined text-3xl cursor-pointer"
          initial={{ scale: 1 }}
          whileHover={{
            scale: 1.3,
            transition: { type: "spring", stiffness: 300, damping: 20 },
          }}
          whileTap={{ scale: 0.9 }}
          aria-label={`Delete ${subject}`}
          role="button"
          onClick={handleDelete}
        >
          delete
        </motion.span>
      </div>
    </motion.div>
  );
}

// Export Subjects
export default function Subjects({
  addSubBtn,
  subjects,
  updateSubjects,
}: {
  addSubBtn: () => void;
  subjects: string[];
  updateSubjects: () => void;
}) {
  return (
    <motion.div
      className="bg-slate-900/60 backdrop-blur-lg rounded-3xl border-white border-2 my-6 p-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      transition={{ when: "beforeChildren", delay: 1.5, staggerChildren: 0.1 }}
    >
      <motion.div
        className="flex justify-between items-center mb-4"
        variants={itemVariants}
      >
        <span className="text-2xl font-bold">Subjects</span>
        <div>
          <motion.span
            className="material-symbols-outlined cursor-pointer text-3xl select-none"
            aria-label="Add subject"
            role="button"
            initial={{ scale: 1 }}
            whileHover={{
              scale: 1.3,
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }}
            whileTap={{ scale: 0.9 }}
            onClick={addSubBtn}
          >
            add
          </motion.span>
          <motion.span
            className="material-symbols-outlined cursor-pointer text-3xl select-none"
            aria-label="Refresh subjects"
            role="button"
            initial={{ scale: 1 }}
            whileHover={{
              scale: 1.3,
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }}
            whileTap={{ scale: 0.9 }}
            onClick={updateSubjects}
          >
            refresh
          </motion.span>
        </div>
      </motion.div>

      <div className="flex flex-col gap-4">
        {subjects.map((subject, index) => (
          <Subject
            key={index}
            subject={subject}
            index={index}
            updateList={updateSubjects}
          />
        ))}
      </div>
    </motion.div>
  );
}
