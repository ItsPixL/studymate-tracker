import { motion } from "motion/react";

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

// Subject
function Subject({ subject, index }: { subject: string; index: number }) {
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
    "bg-pink-600/80",
  ];

  return (
    <motion.div
      key={index}
      className="flex justify-between items-center w-full"
      variants={itemVariants}
    >
      <div
        className={`flex justify-between items-center w-full backdrop-blur-lg py-2.5 px-5 text-2xl rounded-lg ${
          colors[index % colors.length]
        }`}
      >
        <span>{subject}</span>
        <span className="material-symbols-outlined cursor-pointer text-3xl">
          delete
        </span>
      </div>
    </motion.div>
  );
}

// Subjects
export default function Subjects() {
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
  const subjects = ["Math", "English", "Science", "Visual Arts"];

  return (
    <motion.div
      className="bg-slate-900/60 backdrop-blur-lg rounded-3xl border-white border-2 my-6 p-5"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      transition={{ when: "beforeChildren", delay: 1.5, staggerChildren: 0.1 }}
    >
      <motion.div
        className="flex justify-between items-center"
        variants={itemVariants}
      >
        <span className="text-2xl font-bold">Subjects</span>
        <span className="material-symbols-outlined cursor-pointer text-3xl">
          add
        </span>
      </motion.div>
      <div className="flex flex-col gap-3 mt-2">
        {subjects.map((subject, index) => {
          return <Subject subject={subject} index={index} />;
        })}
      </div>
    </motion.div>
  );
}
