// import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

function AnimatedDigit({ digit }: { digit: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={digit}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="inline-block font-sans"
      >
        {digit}
      </motion.div>
    </AnimatePresence>
  );
}

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <div className="text-white text-2xl font-mono flex space-x-1">
      {timeString.split("").map((char, index) => (
        <AnimatedDigit key={index + char} digit={char} />
      ))}
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const navContainerVariants = {
    hidden: { opacity: 0, y: -20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-deepBlue to-royalPurple flex flex-col">
      <motion.div
        className="backdrop-blur-lg bg-slate-900/80 border-b-2 border-white py-3 px-8"
        variants={navContainerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.nav
          className="grid grid-cols-3 items-center lg:max-w-screen-2xl mx-auto"
          variants={navContainerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div
            className="text-cyan-500 text-3xl font-light"
            variants={navItemVariants}
          >
            📚 StudyMate
          </motion.div>
          <motion.div
            className="flex justify-center"
            variants={navItemVariants}
          >
            {<Clock />}
          </motion.div>
        </motion.nav>
      </motion.div>
      <main className="p-6 text-white">{children}</main>
    </div>
  );
}
