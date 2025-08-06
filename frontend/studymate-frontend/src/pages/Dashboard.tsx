import Layout from "../components/Layout";
import Subjects from "../components/Subjects";
import Greeting from "../components/Greeting";
import Streaks from "../components/Streaks";
import Log from "../components/Log";
import AddSubject from "../components/AddSubject";
import StatsBtns from "../components/StatsBtns";
import StatsPopup from "../components/StatsPopup";

import { useState } from "react";

export default function Dashboard() {
  const [addSubjectScreen, setAddSubjectScreen] = useState(false);
  const [statsPopup, setStatsPopup] = useState(0);

  return (
    <Layout>
      {addSubjectScreen ? <AddSubject /> : ""}
      {statsPopup == 0 ? (
        ""
      ) : (
        <StatsPopup type={statsPopup} controller={setStatsPopup} />
      )}
      <div className="">
        <Greeting />
        <div className="lg:max-w-screen-2xl mx-auto grid grid-cols-2 gap-7">
          <div>
            <Streaks />
            <Subjects addSubBtn={() => setAddSubjectScreen((prev) => !prev)} />
          </div>
          <div>
            <Log />
            <StatsBtns controller={setStatsPopup} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
