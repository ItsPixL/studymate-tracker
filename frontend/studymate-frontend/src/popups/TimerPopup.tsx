// ./popups/TimerPopup.tsx

// Import Components
import BasePopup from "../layouts/PopupLayout";

// Define Types
type types = {
  popupType: string;
  controller: (data: string) => void;
};

// Export TimerPopup
export default function TimerPopup({ popupType, controller }: types) {
  return (
    <BasePopup
      title={popupType}
      onClose={() => controller("none")}
      popupKey={popupType}
      className="pointer-events-auto cursor-not-allowed"
    >
      <div>Hello!</div>
    </BasePopup>
  );
}
