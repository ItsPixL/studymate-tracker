// ./pages/Streaks.tsx

// Import Modules
import { motion } from "motion/react";
import { fetchStreaks } from "../api";
import { useState, useEffect } from "react";

// Import Variables
import { containerVariants, itemVariants } from "../animation/varients";

// Export Streaks
export default function Streaks() {
  const [streaks, setStreaks] = useState<string[]>([]);

  useEffect(() => {
    fetchStreaks()
      .then(setStreaks)
      .catch((err) => console.log(err.message));
  }, []);

  const [current, longest] = streaks;

  return (
    <motion.div
      className="bg-slate-900/60 backdrop-blur-lg rounded-3xl border-white border-2 my-6 p-5"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      transition={{ when: "beforeChildren", delay: 1, staggerChildren: 0.1 }}
    >
      <motion.span className="text-2xl font-bold" variants={itemVariants}>
        Streaks
      </motion.span>
      <motion.div
        className="mt-2 backdrop-blur-lg bg-gradient-to-r from-blue-900 to-purple-900 py-2.5 px-5 text-2xl rounded-lg"
        variants={itemVariants}
        whileHover={{ scale: 1.01 }}
      >
        <strong>Your longest streak:</strong> 🔥{longest}
      </motion.div>
      <motion.div
        className="mt-2 backdrop-blur-lg bg-gradient-to-r from-blue-900 to-purple-900 py-2.5 px-5 text-2xl rounded-lg"
        variants={itemVariants}
        whileHover={{ scale: 1.01 }}
      >
        <strong>Your current streak:</strong> 🔥{current}
      </motion.div>
    </motion.div>
  );
}
