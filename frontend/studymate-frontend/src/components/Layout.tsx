// ./components/Layout.tsx

// Import Modules
import { motion } from "motion/react";

// Import Components
import { Clock } from "./Clock";

// Define Types
type types = { children: React.ReactNode };

// Export Layout
export default function Layout({ children }: types) {
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
