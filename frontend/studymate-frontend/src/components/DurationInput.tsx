// ./components/DurationInput.tsx

// Import Modules
import { motion } from "motion/react";

// Import Variables
import { itemVariants } from "../animation/varients";

// Define Types
type types = {
  duration: number;
  setDuration: (data: number) => void;
  color?: string;
};

// Export DurationInput
export default function DurationInput({
  duration,
  setDuration,
  color = "bg-gray-800",
}: types) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setDuration(parseInt(value) || 0);
  };

  return (
    <motion.div
      className={`${color} px-5 py-4 rounded-2xl`}
      variants={itemVariants}
    >
      <div className="text-xl font-bold mb-2">Duration</div>
      <div className="relative">
        <input
          type="text"
          value={duration}
          onChange={handleChange}
          placeholder="30"
          className="w-full py-2 px-4 pr-20 bg-transparent border border-white rounded-md text-white"
        />
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white pointer-events-none">
          minutes
        </span>
      </div>
    </motion.div>
  );
}
