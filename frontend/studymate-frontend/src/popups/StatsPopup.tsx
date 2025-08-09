// ./components/StatsPopup.tsx

// Import Modules
import { fetchWeekly, fetchMonthly } from "../api";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

// Import Components
import BasePopup from "../layouts/PopupLayout";

// Define Types
type types = {
  popupType: string;
  controller: (data: string) => void;
};

// Export StatsPopup
export default function StatsPopup({ popupType, controller }: types) {
  const [stats, setStats] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (popupType === "stats1") {
      fetchWeekly().then(setStats);
    } else if (popupType === "stats2") {
      fetchMonthly().then(setStats);
    }
  }, [popupType]);

  return (
    <BasePopup
      title={`${popupType === "stats1" ? "Weekly" : "Monthly"} Stats`}
      onClose={() => controller("none")}
      popupKey={popupType}
    >
      <motion.div className="text-center text-white text-sm">
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
                timeParts.push(`${minutes} minute${minutes !== 1 ? "s" : ""}`);
              if (seconds > 0)
                timeParts.push(`${seconds} second${seconds !== 1 ? "s" : ""}`);

              return (
                <div key={index}>
                  {key}: {timeParts.join(", ")}
                </div>
              );
            })
          : "None to show!"}
      </motion.div>
    </BasePopup>
  );
}
