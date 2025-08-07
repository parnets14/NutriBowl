// "use client";

// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Solution } from "../Solution";
// import { FaUserMd } from "react-icons/fa";

// // Card component reused
// const ProblemCard = ({ icon, title, description, image, index, hoveredCard, setHoveredCard }) => {
//   return (
//     <motion.div
//       className="relative group overflow-hidden rounded-2xl h-full shadow-lg"
//       onMouseEnter={() => setHoveredCard(index)}
//       onMouseLeave={() => setHoveredCard(null)}
//       whileHover={{ y: -5 }}
//     >
//       <div className="h-full bg-white border border-gray-200 rounded-xl transition-all duration-300 group-hover:border-green-300 flex flex-col">
//         <div className="relative h-40 overflow-hidden">
//           <img 
//             src={image} 
//             alt={title}
//             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
//             <div className={`text-2xl ${hoveredCard === index ? 'text-green-500' : 'text-white'} transition-colors duration-300`}>
//               {React.cloneElement(icon, { className: "text-2xl" })}
//             </div>
//             <h3 className="ml-2 text-lg font-bold text-white">{title}</h3>
//           </div>
//         </div>
//         <div className="p-6 flex-grow">
//           <p className="text-gray-600">{description}</p>
//         </div>
//         <div className={`absolute bottom-0 left-0 right-0 h-1 bg-green-500 transition-all duration-500 ${hoveredCard === index ? 'w-full' : 'w-0'}`}></div>
//       </div>
//     </motion.div>
//   );
// };

// const WeightGainProblems = () => {
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [problems, setProblems] = useState([]);
//   const navigate = useNavigate();

//   const API_URL = "http://localhost:5001/api/problem";

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         const res = await axios.get(API_URL);
//         const filtered = res.data.filter(
//           (item) => item.category?.toLowerCase().replace(/\s|_/g, "-") === "weight-loss"
//         );
//         setProblems(filtered);
//       } catch (err) {
//         console.error("Failed to fetch problems:", err);
//       }
//     };

//     fetchProblems();
//   }, []);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//         ease: "easeOut",
//       },
//     },
//   };

//   return (
//     <section className="relative pt-10 bg-gradient-to-b from-green-50 to-white">
//       <div className="relative z-10 container mx-auto px-5 sm:px-6 lg:px-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-green-600 bg-green-100 rounded-full">
//             WEIGHT GAIN CHALLENGES
//           </span>
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight">
//             Common <span className="text-green-600">Problems</span> Faced
//           </h2>
//           <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             Understand the challenges that people face when trying to gain healthy weight.
//           </p>
//         </motion.div>

//         {/* Problem Cards */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
//         >
//           {problems.map((problem, index) => (
//             <motion.div key={problem._id || index} variants={itemVariants}>
//               <ProblemCard
//                 icon={<FaUserMd />}
//                 title={problem.title}
//                 description={problem.description}
//                 image={`http://localhost:5001/uploads/${problem.image}`}
//                 index={index}
//                 hoveredCard={hoveredCard}
//                 setHoveredCard={setHoveredCard}
//               />
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* Solutions */}
//         <Solution />
//       </div>
//     </section>
//   );
// };

// export default WeightGainProblems;
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Solution } from "../Solution";
import { FaUserMd } from "react-icons/fa";

// Reuse your existing ProblemCard
const ProblemCard = ({ icon, title, description, image, index, hoveredCard, setHoveredCard }) => {
  return (
    <motion.div
      className={`relative group overflow-hidden rounded-2xl h-full shadow-lg`}
      onMouseEnter={() => setHoveredCard(index)}
      onMouseLeave={() => setHoveredCard(null)}
      whileHover={{ y: -5 }}
    >
      <div className="h-full bg-white border border-gray-200 rounded-xl transition-all duration-300 group-hover:border-green-300 flex flex-col">
        <div className="relative h-40 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
            <div className={`text-2xl ${hoveredCard === index ? 'text-green-500' : 'text-white'} transition-colors duration-300`}>
              {React.cloneElement(icon, { className: "text-2xl" })}
            </div>
            <h3 className="ml-2 text-lg font-bold text-white">{title}</h3>
          </div>
        </div>
        <div className="p-6 flex-grow">
          <p className="text-gray-600">{description}</p>
        </div>
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-green-500 transition-all duration-500 ${hoveredCard === index ? 'w-full' : 'w-0'}`}></div>
      </div>
    </motion.div>
  );
};

const WeightGainProblems = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();

  const API_URL = "http://localhost:5001/api/problem";

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await axios.get(API_URL);
        // Filter problems with category "weightloss"
        const filtered = res.data.filter((item) => item.category.toLowerCase() === "weight-gain");
        setProblems(filtered);
      } catch (err) {
        console.error("Failed to fetch problems:", err);
      }
    };

    fetchProblems();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative pt-10 bg-gradient-to-b from-green-50 to-white">
      <div className="relative z-10 container mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-green-600 bg-green-100 rounded-full">
            WEIGHT GAIN CHALLENGES
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight">
           Weight Gain Common <span className="text-green-600">Problems</span> Faced
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Understanding these challenges is the first step toward overcoming them
          </p>
        </motion.div>

        {/* Problem Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {problems.map((problem, index) => (
            <motion.div key={problem._id || index} variants={itemVariants}>
              <ProblemCard
                icon={<FaUserMd />} // Placeholder icon, could be dynamic
                title={problem.title}
                description={problem.description}
                image={`http://localhost:5001/uploads/${problem.image}`}
                index={index}
                hoveredCard={hoveredCard}
                setHoveredCard={setHoveredCard}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Solutions */}
        <Solution />

        {/* CTA or Footer (Optional) */}
      </div>
    </section>
  );
};

export default WeightGainProblems;
