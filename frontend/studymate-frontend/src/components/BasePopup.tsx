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
  className = "",
  enabled = true,
}: types) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <motion.div
        key={popupKey}
        className={`pointer-events-auto bg-slate-900/80 backdrop-blur-lg border border-white p-10 rounded-3xl text-white w-[90%] max-w-md ${className}`}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {title && (
          <motion.div
            className="text-2xl font-bold mb-4 text-center"
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
    </div>
  );
}
