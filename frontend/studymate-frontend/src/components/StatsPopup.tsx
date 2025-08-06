import { motion } from "motion/react";
import { fetchWeekly, fetchMonthly } from "../api";
import { useEffect, useState } from "react";

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
  const [stats, setStats] = useState<string[]>([]);

  useEffect(() => {
    if (type === 1) {
      fetchWeekly().then(setStats);
    } else if (type === 2) {
      fetchMonthly().then(setStats);
    }
  }, [type]);

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
          {type === 1 ? "Weekly" : "Monthly"} Stats
        </motion.div>

        <motion.p
          className="text-center text-white text-sm"
          variants={itemVariants}
        >
          <div>
            {Object.keys(stats).length > 0
              ? Object.entries(stats).map(([key, value], index) => {
                  const totalSeconds = parseInt(value, 10);
                  const hours = Math.floor(totalSeconds / 3600);
                  const minutes = Math.floor((totalSeconds % 3600) / 60);
                  const seconds = totalSeconds % 60;

                  const timeParts = [];
                  if (hours > 0)
                    timeParts.push(`${hours} hour${hours !== 1 ? "s" : ""}`);
                  if (minutes > 0)
                    timeParts.push(
                      `${minutes} minute${minutes !== 1 ? "s" : ""}`
                    );
                  if (seconds > 0)
                    timeParts.push(
                      `${seconds} second${seconds !== 1 ? "s" : ""}`
                    );

                  return (
                    <div key={index}>
                      {key}: {timeParts.join(", ")}
                    </div>
                  );
                })
              : "None to show!"}
          </div>
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
