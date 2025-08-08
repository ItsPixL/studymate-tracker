import Layout from "../components/Layout";
import Subjects from "../components/Subjects";
import Greeting from "../components/Greeting";
import Streaks from "../components/Streaks";
import Log from "../components/Log";
import AddSubject from "../components/AddSubject";
import StatsBtns from "../components/StatsBtns";
import StatsPopup from "../components/StatsPopup";
import { fetchSubjects } from "../api";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [popups, setPopups] = useState<string>("none");
  const [subjects, setSubjects] = useState<string[]>([]);

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
      ) : (
        <StatsPopup popupType={popups} controller={setPopups} />
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
            <Log subjects={subjects} />
            <StatsBtns controller={setPopups} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
