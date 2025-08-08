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

export default function StatsBtns({
  controller,
}: {
  controller: (data: string) => void;
}) {
  function onBtnPress({ type }: { type: string }) {
    if (type == "Weekly") {
      controller("stats1");
    } else {
      controller("stats2");
    }
  }

  return (
    <div>
      <motion.div
        className="bg-slate-900/60 backdrop-blur-lg rounded-3xl border-white border-2 my-6 p-5"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        transition={{ when: "beforeChildren", delay: 1, staggerChildren: 0.1 }}
      >
        <motion.div className="text-2xl font-bold mb-3" variants={itemVariants}>
          Your Stats
        </motion.div>
        <div className="flex flex-col gap-2">
          {["Weekly", "Monthly"].map((type) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.05, filter: "brightness(2)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-900 to-purple-900 w-full px-4 py-3 rounded-md text-white text-center"
              variants={itemVariants}
              onClick={() => onBtnPress({ type })}
            >
              <strong>{type}</strong> stats
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
