// ./dashboard.tsx

// Import Modules
import { fetchSubjects, logSession, checkSubject } from "./api";
import { useState, useEffect } from "react";

// Import Page Elements
import Layout from "./components/Layout";
import Subjects from "./pages/Subjects";
import Greeting from "./pages/Greeting";
import Streaks from "./pages/Streaks";
import Log from "./pages/Log";
import AddSubject from "./pages/AddSubject";

// Import Components
import StatsBtns from "./components/StatsBtns";
import StatsPopup from "./components/StatsPopup";

// Export Dashboard
export default function Dashboard() {
  const [popups, setPopups] = useState<string>("none");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [chosenSubject, setChosenSubject] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);

  const handleLog = async () => {
    if (!chosenSubject) {
      alert("No subject chosen");
      return;
    }
    if (duration == 0) {
      alert("Duration can't be 0");
      return;
    }

    const res = await checkSubject(chosenSubject);
    if (!res) {
      alert("Subject not in your list. Please add it to your list first.");
      return;
    } else {
      const res = await logSession(chosenSubject, duration * 60);
      alert(res.message);
    }
  };

  const updateSubjects = () => {
    fetchSubjects()
      .then(setSubjects)
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    updateSubjects();
  }, []);

  return (
    <Layout>
      {popups == "none" ? (
        ""
      ) : popups == "addSubject" ? (
        <AddSubject controller={setPopups} refreshSubjects={updateSubjects} />
      ) : popups == "stats1" || popups == "stats2" ? (
        <StatsPopup popupType={popups} controller={setPopups} />
      ) : popups == "Timer" ? (
        ""
      ) : (
        ""
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
              setChosenSubject={setChosenSubject}
              duration={duration}
              setDuration={setDuration}
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
