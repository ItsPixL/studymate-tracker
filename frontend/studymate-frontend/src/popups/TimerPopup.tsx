// ./popups/TimerPopup.tsx

// Import Modules
import { useState } from "react";

// Import Components
import BasePopup from "../layouts/PopupLayout";
import Timer from "../components/Timer";

// Define Types
type types = {
  popupType: string;
  controller: (data: string) => void;
};

// Export TimerPopup
export default function TimerPopup({ popupType, controller }: types) {
  const [timerSet, setTimerSet] = useState<boolean>(false);

  return (
    <BasePopup
      title={popupType}
      onClose={() => controller("none")}
      popupKey={popupType}
      className="pointer-events-auto cursor-not-allowed"
      enabled={!timerSet}
    >
      {popupType == "Timer" ? (
        <Timer timerSet={timerSet} setTimerSet={setTimerSet} />
      ) : popupType == "Stopwatch" ? (
        "STOPWATCH"
      ) : (
        "POMODORO"
      )}
    </BasePopup>
  );
}
