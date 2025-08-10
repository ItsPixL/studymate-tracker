// ./dashboard.tsx

// Import Modules
import { fetchSubjects, logSession, checkSubject } from "./api";
import { useState, useEffect } from "react";

// Import Page Elements
import Layout from "./layouts/BaseLayout";
import Subjects from "./pages/Subjects";
import Greeting from "./pages/Greeting";
import Streaks from "./pages/Streaks";
import Log from "./pages/Log";
import AddSubjectPopup from "./popups/AddSubjectPopup";

// Import Components
import StatsBtns from "./components/StatsBtns";
import StatsPopup from "./popups/StatsPopup";
import TimerPopup from "./popups/TimerPopup";

// Export Dashboard
export default function Dashboard() {
  // Logic for the popup menus
  const [popups, setPopups] = useState<string>("none");

  // Logic for the subjects lists
  const [subjects, setSubjects] = useState<string[]>([]);

  const updateSubjects = () => {
    fetchSubjects()
      .then(setSubjects)
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    updateSubjects();
  }, []);

  // Logic for logging sessions
  const handleLog = async ({
    subject,
    duration,
  }: {
    subject: string;
    duration: number;
  }) => {
    if (!subject) {
      alert("No subject chosen");
      return;
    }
    if (duration == 0) {
      alert("Duration can't be 0");
      return;
    }
    const res = await checkSubject(subject);
    if (!res) {
      alert("Subject not in your list. Please add it to your list first.");
      return;
    } else {
      const res = await logSession(subject, duration);
      alert(res.message);
    }
  };

  // Dashboard component
  return (
    <Layout>
      {popups == "none" ? (
        ""
      ) : popups == "addSubject" ? (
        <AddSubjectPopup
          controller={setPopups}
          refreshSubjects={updateSubjects}
        />
      ) : popups == "stats1" || popups == "stats2" ? (
        <StatsPopup popupType={popups} controller={setPopups} />
      ) : (
        <TimerPopup popupType={popups} controller={setPopups} />
      )}

      <div className="">
        <Greeting />
        <div className="lg:max-w-screen-2xl mx-auto grid grid-cols-2 gap-7">
          <div>
            <Streaks />
            <Subjects
              addSubBtn={() =>
                setPopups((prev) => (prev == "none" ? "addSubject" : "none"))
              }
              subjects={subjects}
              updateSubjects={updateSubjects}
            />
          </div>
          <div>
            <Log
              subjects={subjects}
              handleLog={handleLog}
              controller={setPopups}
            />
            <StatsBtns controller={setPopups} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
