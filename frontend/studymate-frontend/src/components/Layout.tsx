// import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
// import { motion } from 'motion/react'

function Clock() {
  const [time, setTime] = React.useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
  <div className='text-white text-2xl'>
    {time.toLocaleTimeString(
      'en-US', 
      {hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true})}
  </div>)
}

export default function Layout({ children }: { children: React.ReactNode }) {
  //  IF NEEDED, OTHERWISE REMOVE
  // const linkClasses =
  //   'text-white hover:bg-blue-700 font-light text-xl bg-slate-950 px-4 py-2 rounded-xl transition-colors';

  // const MotionLink = motion(Link);

  // function LinkButton({ to, children }: { to: string; children: React.ReactNode }) {
  //   return (
  //     <MotionLink
  //       to={to}
  //       className={linkClasses}
  //       initial={{ scale: 1 }}
  //       whileHover={{ scale: 1.1 }}
  //       whileTap={{ scale: 0.95 }}
  //     >
  //       {children}
  //     </MotionLink>
  //   );
  // }
  const logged_in = true
  const username = "Neer Sheth"
  const pfp = false

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-900 to-fuchsia-900 flex flex-col'>
      <div className='backdrop-blur-lg bg-slate-900/80 border-b-2 border-white py-3 px-8'>
        <nav className='grid grid-cols-3 items-center lg:max-w-screen-2xl mx-auto'>
          <div className='text-cyan-500 text-3xl font-light'>📚 StudyMate</div>
          <div className='flex justify-center'>{<Clock />}</div>
          {logged_in ?
            <div className='flex justify-end text-white gap-2'>
              {pfp ? "pfp" : <span className="material-symbols-outlined">account_circle</span>}
              <span>{username}</span>
              <span className="material-symbols-outlined">arrow_drop_down</span>
            </div>
          : <div className='flex justify-end text-white gap-2'>
              not logged in
            </div>}
        </nav>
      </div>
      <div className=''>
        <main className='flex-1 p-6 text-white'>{children}</main>
      </div>
    </div>
  );
}