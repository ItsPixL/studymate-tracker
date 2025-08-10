// ./components/BasePopup.tsx

// Import Modules
import { motion } from "motion/react";

// Import Types
import type { ReactNode } from "react";

// Import Variables
import { containerVariants, itemVariants } from "../animation/varients";

// Define Types
type types = {
  title?: string;
  onClose: () => void;
  children: ReactNode;
  popupKey?: string | number;
  className?: string;
  enabled?: boolean;
};

// Export Base Popup
export default function BasePopup({
  title,
  onClose,
  children,
  popupKey,
  className = "pointer-events-none",
  enabled = true,
}: types) {
  return (
    <motion.div
      className={`fixed inset-0 h-screen w-screen z-50 flex items-center justify-center bg-slate-950/60 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div
        key={popupKey}
        className="pointer-events-auto cursor-auto bg-slate-900/80 backdrop-blur-lg border border-white p-20 rounded-3xl text-white w-[90%] max-w-3xl"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {title && (
          <motion.div
            className="text-3xl font-bold mb-4 text-center"
            variants={itemVariants}
          >
            {title}
          </motion.div>
        )}

        <motion.div variants={itemVariants}>{children}</motion.div>

        <motion.button
          {...(enabled && {
            whileHover: { scale: 1.05, filter: "brightness(2)" },
            whileTap: { scale: 0.95 },
            variants: itemVariants,
          })}
          className={`w-full px-2 py-1 mt-3 rounded-md text-white text-center transition-colors duration-300 ${
            enabled
              ? "bg-gradient-to-r from-blue-900 to-purple-900"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={onClose}
          disabled={!enabled}
        >
          Close
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
