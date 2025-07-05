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

function Subjects() {
  const subjects = [
    "Math",
    "English",
    "Biology",
    "Chemistry",
    "Physics",
    "History",
    "Geography",
    "Art",
    "Music",
    "Physical Education",
    "Computer Science",
    "Economics",
    "Philosophy",
    "Psychology",
    "Drama",
    "Environmental Science",
    "Political Science"
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
      <span className='text-2xl font-bold'>Subjects</span>
      <div className='flex flex-col gap-3 mt-2'>
        {subjects.map((subject, index) => { return (
            <div
              key={index}
              className={`backdrop-blur-lg p-2 text-xl ${colors[index % colors.length]}`}
            >
              {subject}
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
        <div className=''>
          <Subjects />
        </div>
        <div className=''>
          <Subjects />
        </div>
      </div>
    </Layout>
  )
}

