// ./popups/TimerPopup.tsx

// Import Modules
import { useState } from "react";

// Import Components
import BasePopup from "../layouts/PopupLayout";
import Timer from "../components/Timer";
import Stopwatch from "../components/Stopwatch";
import Pomodoro from "../components/Pomodoro";

// Define Types
type types = {
  popupType: string;
  controller: (data: string) => void;
  subjects: string[];
  handleLog: (data: { subject: string; duration: number }) => void;
};

// Export TimerPopup
export default function TimerPopup({
  popupType,
  controller,
  subjects,
  handleLog,
}: types) {
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
        <Timer
          timerSet={timerSet}
          setTimerSet={setTimerSet}
          subjects={subjects}
          handleLog={handleLog}
        />
      ) : popupType == "Stopwatch" ? (
        <Stopwatch
          subjects={subjects}
          handleLog={handleLog}
          setTimerSet={setTimerSet}
        />
      ) : (
        <Pomodoro
          subjects={subjects}
          handleLog={handleLog}
          timerSet={timerSet}
          setTimerSet={setTimerSet}
        />
      )}
    </BasePopup>
  );
}
