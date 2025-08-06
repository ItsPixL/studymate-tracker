// import React from 'react'
import Layout from "../components/Layout";
import Subjects from "../components/Subjects";
import Greeting from "../components/Greeting";
import Streaks from "../components/Streaks";
import Log from "../components/Log";
import AddSubject from "../components/AddSubject";

import { useState } from "react";

export default function Dashboard() {
  const [addSubjectScreen, changeAddSubjectScreen] = useState(true);

  return (
    <Layout>
      {addSubjectScreen ? <AddSubject /> : ""}
      <div className="">
        <Greeting />
        <div className="lg:max-w-screen-2xl mx-auto grid grid-cols-2 gap-7">
          <div>
            <Streaks />
            <Subjects
              addSubBtn={() => changeAddSubjectScreen((prev) => !prev)}
            />
          </div>
          <div>
            <Log />
          </div>
        </div>
      </div>
    </Layout>
  );
}
