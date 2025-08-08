import { motion } from "motion/react";
import { useState } from "react";
import { addSubject } from "../api";

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { when: "beforeChildren", staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0 },
};

export default function AddSubject({
  controller,
  refreshSubjects,
}: {
  controller: (data: string) => void;
  refreshSubjects: () => void;
}) {
  const [subjectName, setSubjectName] = useState<string>("");

  const handleSubmit = () => {
    if (subjectName.trim() === "") {
      alert("Subject name is required");
      return;
    }
    addSubject(subjectName)
      .then((response) => {
        console.log(response.message);
        refreshSubjects();
        controller("none");
      })
      .catch((error) => console.error(error.message));
    setSubjectName("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <motion.div
        className="pointer-events-auto bg-slate-900/80 backdrop-blur-lg border border-white p-10 rounded-3xl text-white w-[90%] max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div
          className="text-2xl font-bold mb-6 text-center"
          variants={itemVariants}
        >
          Add a Subject
        </motion.div>

        <motion.input
          type="text"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          placeholder="Enter subject name"
          className="w-full px-4 py-3 mb-4 bg-slate-800 border border-white rounded-md text-white focus:outline-none"
          variants={itemVariants}
        />

        <motion.button
          onClick={handleSubmit}
          whileHover={{ scale: 1.05, filter: "brightness(1.5)" }}
          whileTap={{ scale: 0.95 }}
          className="w-full px-4 py-3 bg-gradient-to-r from-blue-900 to-purple-900 rounded-md text-white font-semibold"
          variants={itemVariants}
        >
          Submit
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05, filter: "brightness(2)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-blue-900 to-purple-900 w-full px-2 py-1 mt-3 rounded-md text-white text-center"
          variants={itemVariants}
          onClick={() => controller("none")}
        >
          Close
        </motion.button>
      </motion.div>
    </div>
  );
}
