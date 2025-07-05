// import React from 'react'
import Layout from '../components/Layout'

// TEMPORARY
const name = "Neer"

function Greeting() {
  const today = new Date()

  const days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', ];
  const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', ];
  const day = days[today.getDay()];
  const date = today.getDate();
  const month = months[today.getMonth()];
  const year = today.getFullYear()

  return (
    <div className='bg-gradient-to-r from-sky-500 to-purple-700 px-12 py-10 grid grid-cols-2 rounded-3xl drop-shadow-2xl lg:max-w-screen-2xl mx-auto'>
      <div>
        <h1 className='text-3xl font-bold'>Welcome back, {name} 👋</h1>
        <p className='text-xl'>{day} {date} {month}, {year}</p>
      </div>
      <div className='flex justify-end items-center'>
        <p className='text-xl max-w-64 text-right'>“Small steps every day lead to big results”</p>
      </div>
    </div>
  )
}

function Stats() {
  const longest = 6
  const current = 3

  return (
    <div className='bg-slate-900/80 backdrop-blur-lg rounded-2xl border-white border-2 my-6 p-5'>
      <span className='text-2xl font-bold'>Stats</span>
      <div className='mt-2 backdrop-blur-lg bg-slate-700 p-2 text-2xl rounded-lg'><strong>Your longest streak:</strong> 🔥{longest}</div>
      <div className='mt-2 backdrop-blur-lg bg-slate-700 p-2 text-2xl rounded-lg'><strong>Your current streak:</strong> 🔥{current}</div>
    </div>
  )
}

function Subjects() {
  // Temporary
  // Long list
  // const subjects = [
  //   "Math",
  //   "English",
  //   "Biology",
  //   "Chemistry",
  //   "Physics",
  //   "History",
  //   "Geography",
  //   "Art",
  //   "Music",
  //   "Physical Education",
  //   "Computer Science",
  //   "Economics",
  //   "Philosophy",
  //   "Psychology",
  //   "Drama",
  //   "Environmental Science",
  //   "Political Science"
  // ];
  
  // Short list
  const subjects = [
    "Math",
    "English",
    "Science",
    "Visual Arts",
  ];

  const colors = [
    "bg-red-600/80",
    "bg-orange-600/80",
    "bg-yellow-600/80",
    "bg-lime-600/80",
    "bg-emerald-600/80",
    "bg-teal-600/80",
    "bg-cyan-600/80",
    "bg-blue-600/80",
    "bg-violet-600/80",
    "bg-fuchsia-600/80",
    "bg-pink-600/80"
  ]

  return (
    <div className='bg-slate-900/80 backdrop-blur-lg rounded-2xl border-white border-2 my-6 p-5'>
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold">Subjects</span>
        <span className="material-symbols-outlined cursor-pointer text-3xl">add</span>
      </div>
      <div className='flex flex-col gap-3 mt-2'>
        {subjects.map((subject, index) => {
          return (
            <div key={index} className='flex justify-between items-center w-full'>
              <div
                className={`flex justify-between items-center w-full backdrop-blur-lg p-2 text-2xl rounded-lg ${colors[index % colors.length]}`}
              >
                <span>{subject}</span>
                <span className="material-symbols-outlined cursor-pointer text-3xl">delete</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <Layout>
      <Greeting />
      <div className='lg:max-w-screen-2xl mx-auto grid grid-cols-2 gap-10'>
        <div className='flex flex-col'>
          <Stats />
          <Subjects />
        </div>
        <div className=''>
          <Subjects />
        </div>
      </div>
    </Layout>
  )
}

