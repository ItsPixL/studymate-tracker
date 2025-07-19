import { motion } from "motion/react";

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

// Stats
export default function Stats() {
  const longest = 6;
  const current = 3;

  return (
    <motion.div
      className="bg-slate-900/60 backdrop-blur-lg rounded-3xl border-white border-2 my-6 p-5"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      transition={{ when: "beforeChildren", delay: 1, staggerChildren: 0.1 }}
    >
      <motion.span className="text-2xl font-bold" variants={itemVariants}>
        Stats
      </motion.span>
      <motion.div
        className="mt-2 backdrop-blur-lg bg-gradient-to-r from-blue-700 to-purple-700 py-2.5 px-5 text-2xl rounded-lg"
        variants={itemVariants}
      >
        <strong>Your longest streak:</strong> 🔥{longest}
      </motion.div>
      <motion.div
        className="mt-2 backdrop-blur-lg bg-gradient-to-r from-blue-700 to-purple-700 py-2.5 px-5 text-2xl rounded-lg"
        variants={itemVariants}
      >
        <strong>Your current streak:</strong> 🔥{current}
      </motion.div>
    </motion.div>
  );
}
