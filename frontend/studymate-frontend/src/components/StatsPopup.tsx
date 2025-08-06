import { motion } from "motion/react";

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

export default function StatsPopup({
  type,
  controller,
}: {
  type: number;
  controller: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <motion.div
        className="pointer-events-auto bg-slate-900/80 backdrop-blur-lg border border-white p-10 rounded-3xl text-white w-[90%] max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div
          className="text-2xl font-bold mb-4 text-center"
          variants={itemVariants}
        >
          Stats
        </motion.div>

        <motion.p
          className="text-center text-white text-sm"
          variants={itemVariants}
        >
          Your stats: {type}
        </motion.p>
        <motion.button
          key={type}
          whileHover={{ scale: 1.05, filter: "brightness(2)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-blue-900 to-purple-900 w-full px-2 py-1 mt-3 rounded-md text-white text-center"
          variants={itemVariants}
          onClick={() => controller(0)}
        >
          Close
        </motion.button>
      </motion.div>
    </div>
  );
}
