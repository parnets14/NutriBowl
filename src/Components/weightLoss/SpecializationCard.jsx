// import React from "react";
// import { FaWeight, FaDumbbell, FaWhatsapp, FaCalendarAlt, FaUtensils, FaHeartbeat } from "react-icons/fa";
// import { motion } from "framer-motion";

// const SpecializationCard = ({ icon, title, items, color, index }) => {
//   return (
//     <motion.div
//       className="h-full bg-gray-800 rounded-xl p-6 transition-all duration-300 hover:bg-gray-750"
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: index * 0.1 }}
//       viewport={{ once: true }}
//       whileHover={{ y: -5 }}
//     >
//       <div className={`text-3xl mb-4 ${color.replace('border', 'text')}`}>
//         {icon}
//       </div>
      
//       <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      
//       <ul className="space-y-3">
//         {items.map((item, i) => (
//           <li key={i} className="flex items-start">
//             <span className={`inline-block w-2 h-2 rounded-full mt-2 mr-3 ${color.replace('border', 'bg')}`}></span>
//             <span className="text-gray-300 text-sm">{item}</span>
//           </li>
//         ))}
//       </ul>
//     </motion.div>
//   );
// };

// const OurSpecialization = () => {
//   const specializations = [
//     {
//       icon: <FaWeight />,
//       title: "Custom Nutrition Plans",
//       items: [
//         "Personalized weight management",
//         "Muscle gain meal plans",
//         "Body composition analysis"
//       ],
//       color: "text-green-400"
//     },
//     {
//       icon: <FaDumbbell />,
//       title: "Fitness Integration",
//       items: [
//         "Trainer collaborations",
//         "Workout nutrition timing",
//         "Recovery meal plans"
//       ],
//       color: "text-blue-400"
//     },
//     {
//       icon: <FaWhatsapp />,
//       title: "Seamless Support",
//       items: [
//         "Instant meal customization",
//         "Nutritionist chat support",
//         "Daily menu adjustments"
//       ],
//       color: "text-purple-400"
//     },
//     {
//       icon: <FaCalendarAlt />,
//       title: "Flexible Subscriptions",
//       items: [
//         "Daily fresh meal delivery",
//         "Short & long-term plans",
//         "Pause or modify anytime"
//       ],
//       color: "text-yellow-400"
//     },
//     {
//       icon: <FaUtensils />,
//       title: "Gourmet Nutrition",
//       items: [
//         "Chef-designed meals",
//         "Clean ingredients only",
//         "Restaurant-quality taste"
//       ],
//       color: "text-red-400"
//     },
//     {
//       icon: <FaHeartbeat />,
//       title: "Health First",
//       items: [
//         "Medical condition support",
//         "Allergy-friendly options",
//         "Metabolic health plans"
//       ],
//       color: "text-pink-400"
//     }
//   ];

//   return (
//     <section className="relative py-16 md:py-20 bg-gray-900">
//       <div className="container mx-auto px-5 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-green-400 bg-gray-800 rounded-full">
//             OUR SPECIALTIES
//           </span>
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
//             NutriBowl <span className="text-green-400">Solutions</span>
//           </h2>
//           <p className="text-lg text-gray-300 max-w-3xl mx-auto">
//             Simple, effective nutrition tailored to your needs
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {specializations.map((spec, index) => (
//             <SpecializationCard 
//               key={index}
//               icon={spec.icon}
//               title={spec.title}
//               items={spec.items}
//               color={spec.color}
//               index={index}
//             />
//           ))}
//         </div>

//         <div className="mt-16 text-center">
//           <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition">
//             Explore Programs
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default OurSpecialization;