// import React from 'react'
import Layout from "../components/Layout";
import Subjects from "../components/Subjects";
import Greeting from "../components/Greeting";
import Stats from "../components/Stats";
import Log from "../components/Log";

export default function Dashboard() {
  return (
    <Layout>
      <div className="">
        <Greeting />
        <div className="lg:max-w-screen-2xl mx-auto grid grid-cols-2 gap-7">
          <div>
            <Stats />
            <Subjects />
          </div>
          <div>
            <Log />
          </div>
        </div>
      </div>
    </Layout>
  );
}
