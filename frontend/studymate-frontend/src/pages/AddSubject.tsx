// ./pages/AddSubject.tsx

// Import Modules
import { useState } from "react";
import { addSubject } from "../api";
import { motion } from "motion/react";

// Import Components
import BasePopup from "../components/BasePopup";

// Define Types
type types = {
  controller: (data: string) => void;
  refreshSubjects: () => void;
};

// Export AddSubject
export default function AddSubject({ controller, refreshSubjects }: types) {
  const [subjectName, setSubjectName] = useState<string>("");

  const handleSubmit = () => {
    if (subjectName.trim() === "") {
      alert("Subject name is required");
      return;
    }
    addSubject(subjectName)
      .then((response) => {
        console.log(response.message);
        refreshSubjects();
        controller("none");
      })
      .catch((error) => console.error(error.message));
    setSubjectName("");
  };

  return (
    <BasePopup
      title="Add a Subject"
      onClose={() => controller("none")}
      popupKey="add-subject"
    >
      <motion.input
        type="text"
        value={subjectName}
        onChange={(e) => setSubjectName(e.target.value)}
        placeholder="Enter subject name"
        className="w-full px-4 py-3 mb-4 bg-slate-800 border border-white rounded-md text-white focus:outline-none"
      />
      <motion.button
        onClick={handleSubmit}
        whileHover={{ scale: 1.05, filter: "brightness(1.5)" }}
        whileTap={{ scale: 0.95 }}
        className="w-full px-4 py-3 bg-gradient-to-r from-blue-900 to-purple-900 rounded-md text-white font-semibold"
      >
        Submit
      </motion.button>
    </BasePopup>
  );
}
