import { motion } from "motion/react";

const name = "Neer";

// Motion Varients
const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0 },
};

// Greeting
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
  const day = days[today.getDay()];
  const date = today.getDate();
  const month = months[today.getMonth()];
  const year = today.getFullYear();

  return (
    <motion.div
      className="bg-gradient-to-r from-lightBlue to-lightPurple px-12 py-10 grid grid-cols-2 rounded-3xl drop-shadow-2xl lg:max-w-screen-2xl mx-auto h-max w-full"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      transition={{ when: "beforeChildren", delay: 0.5, staggerChildren: 0.1 }}
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold">Welcome back, {name} 👋</h1>
        <p className="text-xl">
          {day} {date} {month}, {year}
        </p>
      </motion.div>
      <motion.div
        className="flex justify-end items-center"
        variants={itemVariants}
      >
        <p className="text-xl max-w-64 text-right">
          “Small steps every day lead to big results”
        </p>
      </motion.div>
    </motion.div>
  );
}
