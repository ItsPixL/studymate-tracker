// ./pages/Greeting.tsx

// Import Modules
import { motion } from "motion/react";

// Import Varients
import { containerVariants, itemVariants } from "../animation/varients";

// Export Greeting
export default function Greeting() {
  const today = new Date();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const studyQuotes: string[] = [
    "Small steps every day lead to big results.",
    "Success is the sum of small efforts repeated day in and day out.",
    "Don’t watch the clock; do what it does. Keep going.",
    "The secret of getting ahead is getting started.",
    "Push yourself, because no one else is going to do it for you.",
    "It always seems impossible until it’s done.",
    "You don’t have to be great to start, but you have to start to be great.",
    "Discipline is the bridge between goals and accomplishment.",
    "Stay focused. Stay determined. Stay on track.",
    "Dreams don’t work unless you do.",
  ];

  const day = days[today.getDay()];
  const date = today.getDate();
  const month = months[today.getMonth()];
  const year = today.getFullYear();
  const randomQuote =
    studyQuotes[Math.floor(Math.random() * studyQuotes.length)];

  return (
    <motion.div
      className="bg-gradient-to-r from-lightBlue to-lightPurple px-12 py-10 grid grid-cols-2 rounded-3xl drop-shadow-2xl lg:max-w-screen-2xl mx-auto h-max w-full"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      transition={{ when: "beforeChildren", delay: 0.5, staggerChildren: 0.1 }}
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold">Welcome back 👋</h1>
        <p className="text-xl">
          {day} {date} {month}, {year}
        </p>
      </motion.div>
      <motion.div
        className="flex justify-end items-center"
        variants={itemVariants}
      >
        <p className="text-xl max-w-64 text-right">{randomQuote}</p>
      </motion.div>
    </motion.div>
  );
}
