
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const apiUrl = 'http://localhost:5001/api/mealplan';
// const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// const COURSE_OPTIONS = ['Starter', 'Main', 'Salad'];

// const defaultMealItem = {
//   Course: COURSE_OPTIONS[0],
//   Item: '',
//   Calories: '',
//   Protein: '',
//   Carbs: '',
//   Fat: '',
//   Ingredients: '',
//   Benefits: '',
// };

// const defaultMeal = { Lunch: [defaultMealItem], Dinner: [defaultMealItem] };

// function CollapsibleMealItem({ idx, item, onChange, onRemove, mealType, isVeg }) {
//   const [open, setOpen] = useState(false);

//   const handleChange = (field, value) => {
//     onChange(idx, field, value);
//   };

//   return (
//     <div
//       style={{
//         border: '1px solid #ccc',
//         borderRadius: 6,
//         padding: 12,
//         marginBottom: 12,
//         backgroundColor: '#fdfdfd',
//         boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
//       }}
//     >
//       <div
//         onClick={() => setOpen(!open)}
//         style={{
//           cursor: 'pointer',
//           fontWeight: 600,
//           marginBottom: open ? 12 : 0,
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           userSelect: 'none',
//           fontSize: 16,
//           color: '#222',
//         }}
//         aria-expanded={open}
//         aria-controls={`${mealType}-${isVeg ? 'veg' : 'nonveg'}-item-${idx}`}
//       >
//         <span>{item.Course || 'Course'} - {item.Item || 'Item'}</span>
//         <button
//           type="button"
//           aria-label={`Remove ${mealType} item`}
//           onClick={(e) => {
//             e.stopPropagation();
//             onRemove(idx);
//           }}
//           style={{
//             backgroundColor: '#e74c3c',
//             border: 'none',
//             color: 'white',
//             borderRadius: 4,
//             padding: '4px 8px',
//             cursor: 'pointer',
//             fontWeight: 700,
//             fontSize: 16,
//             lineHeight: 1,
//           }}
//         >
//           &times;
//         </button>
//       </div>

//       {open && (
//         <div style={{ marginTop: 10, fontSize: 14, color: '#444' }}>
//           {/* Course Dropdown */}
//           <div style={{ marginBottom: 10 }}>
//             <label htmlFor={`course-${mealType}-${idx}`} style={{ fontWeight: 600, display: 'block', marginBottom: 4 }}>
//               Course:
//             </label>
//             <select
//               id={`course-${mealType}-${idx}`}
//               value={item.Course}
//               onChange={(e) => handleChange('Course', e.target.value)}
//               style={{
//                 width: '100%',
//                 padding: 8,
//                 borderRadius: 4,
//                 border: '1px solid #ccc',
//                 fontSize: 14,
//                 appearance: 'none',
//                 cursor: 'pointer',
//                 backgroundColor: 'white',
//               }}
//             >
//               {COURSE_OPTIONS.map((c) => (
//                 <option key={c} value={c}>{c}</option>
//               ))}
//             </select>
//           </div>

//           {['Item', 'Calories', 'Protein', 'Carbs', 'Fat', 'Ingredients', 'Benefits'].map((field) => (
//             <div key={field} style={{ marginBottom: 10 }}>
//               <label style={{ fontWeight: 600, display: 'block', marginBottom: 4 }}>{field}:</label>
//               <input
//                 type="text"
//                 value={item[field]}
//                 onChange={(e) => handleChange(field, e.target.value)}
//                 placeholder={`Enter ${field}`}
//                 style={{
//                   width: '100%',
//                   padding: 8,
//                   borderRadius: 4,
//                   border: '1px solid #ccc',
//                   fontSize: 14,
//                   boxSizing: 'border-box',
//                 }}
//               />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// function Modal({ isOpen, onClose, onAdd }) {
//   const [mealCategory, setMealCategory] = useState('Vegetarian');
//   const [mealTime, setMealTime] = useState('Lunch');
//   const [course, setCourse] = useState(COURSE_OPTIONS[0]);

//   const [itemData, setItemData] = useState({
//     Item: '',
//     Calories: '',
//     Protein: '',
//     Carbs: '',
//     Fat: '',
//     Ingredients: '',
//     Benefits: '',
//   });

//   useEffect(() => {
//     if (isOpen) {
//       setMealCategory('Vegetarian');
//       setMealTime('Lunch');
//       setCourse(COURSE_OPTIONS[0]);
//       setItemData({
//         Item: '',
//         Calories: '',
//         Protein: '',
//         Carbs: '',
//         Fat: '',
//         Ingredients: '',
//         Benefits: '',
//       });
//     }
//   }, [isOpen]);

//   const handleInputChange = (field, value) => {
//     setItemData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!itemData.Item.trim()) {
//       alert('Please enter an Item name.');
//       return;
//     }

//     const newItem = {
//       Course: course,
//       ...itemData,
//     };

//     onAdd(mealCategory, mealTime, newItem);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div
//       role="dialog"
//       aria-modal="true"
//       aria-labelledby="modal-title"
//       tabIndex={-1}
//       style={{
//         position: 'fixed',
//         inset: 0,
//         backgroundColor: 'rgba(0,0,0,0.45)',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         zIndex: 2000,
//       }}
//       onClick={onClose}
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         style={{
//           backgroundColor: 'white',
//           borderRadius: 8,
//           maxWidth: 460,
//           width: '90%',
//           maxHeight: '90vh',
//           overflowY: 'auto',
//           boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
//           padding: 24,
//           fontSize: 14,
//           color: '#333',
//         }}
//       >
//         <h2 id="modal-title" style={{ marginBottom: 20, fontWeight: 700, fontSize: 22, color: '#2c3e50' }}>
//           Add New Meal Item
//         </h2>
//         <form onSubmit={handleSubmit}>

//           {/* Meal Category */}
//           <div style={{ marginBottom: 16 }}>
//             <label htmlFor="mealCategory" style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>
//               Meal Category:
//             </label>
//             <select
//               id="mealCategory"
//               value={mealCategory}
//               onChange={(e) => setMealCategory(e.target.value)}
//               required
//               style={{
//                 width: '100%',
//                 padding: 10,
//                 fontSize: 14,
//                 borderRadius: 5,
//                 border: '1px solid #bbb',
//                 cursor: 'pointer',
//                 backgroundColor: 'white',
//               }}
//             >
//               <option value="Vegetarian">Vegetarian</option>
//               <option value="Non-Vegetarian">Non-Vegetarian</option>
//             </select>
//           </div>

//           {/* Meal Time */}
//           <div style={{ marginBottom: 16 }}>
//             <label htmlFor="mealTime" style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>
//               Meal Time:
//             </label>
//             <select
//               id="mealTime"
//               value={mealTime}
//               onChange={(e) => setMealTime(e.target.value)}
//               required
//               style={{
//                 width: '100%',
//                 padding: 10,
//                 fontSize: 14,
//                 borderRadius: 5,
//                 border: '1px solid #bbb',
//                 cursor: 'pointer',
//                 backgroundColor: 'white',
//               }}
//             >
//               <option value="Lunch">Lunch</option>
//               <option value="Dinner">Dinner</option>
//             </select>
//           </div>

//           {/* Course */}
//           <div style={{ marginBottom: 16 }}>
//             <label htmlFor="course" style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>
//               Course:
//             </label>
//             <select
//               id="course"
//               value={course}
//               onChange={(e) => setCourse(e.target.value)}
//               required
//               style={{
//                 width: '100%',
//                 padding: 10,
//                 fontSize: 14,
//                 borderRadius: 5,
//                 border: '1px solid #bbb',
//                 cursor: 'pointer',
//                 backgroundColor: 'white',
//               }}
//             >
//               {COURSE_OPTIONS.map((opt) => (
//                 <option key={opt} value={opt}>
//                   {opt}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Other Inputs */}
//           {['Item', 'Calories', 'Protein', 'Carbs', 'Fat', 'Ingredients', 'Benefits'].map((field) => (
//             <div key={field} style={{ marginBottom: 16 }}>
//               <label htmlFor={field} style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>
//                 {field}:
//               </label>
//               <input
//                 id={field}
//                 type="text"
//                 value={itemData[field]}
//                 onChange={(e) => handleInputChange(field, e.target.value)}
//                 placeholder={`Enter ${field}`}
//                 required={field === 'Item'}
//                 style={{
//                   width: '100%',
//                   padding: 10,
//                   fontSize: 14,
//                   borderRadius: 5,
//                   border: '1px solid #bbb',
//                   boxSizing: 'border-box',
//                 }}
//               />
//             </div>
//           ))}

//           <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
//             <button
//               type="button"
//               onClick={onClose}
//               style={{
//                 backgroundColor: '#bbb',
//                 border: 'none',
//                 padding: '10px 18px',
//                 borderRadius: 6,
//                 cursor: 'pointer',
//                 fontWeight: 600,
//               }}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               style={{
//                 backgroundColor: '#27ae60',
//                 color: 'white',
//                 border: 'none',
//                 padding: '10px 18px',
//                 borderRadius: 6,
//                 cursor: 'pointer',
//                 fontWeight: 700,
//               }}
//             >
//               Add Item
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// function MealPlanAdmin() {
//   const [mealPlans, setMealPlans] = useState([]);
//   const [day, setDay] = useState('');
//   const [vegMeal, setVegMeal] = useState(defaultMeal);
//   const [nonVegMeal, setNonVegMeal] = useState(defaultMeal);
//   const [editMode, setEditMode] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     fetchMealPlans();
//   }, []);

//   const fetchMealPlans = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(apiUrl);
//       setMealPlans(res.data);
//     } catch (err) {
//       alert('Error fetching meal plans: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleMealItemChange = (setter, mealKey, idx, field, value) => {
//     setter((prev) => {
//       const updatedArray = [...prev[mealKey]];
//       updatedArray[idx] = { ...updatedArray[idx], [field]: value };
//       return { ...prev, [mealKey]: updatedArray };
//     });
//   };

//   const addMealItemToState = (category, mealTime, newItem) => {
//     if (category === 'Vegetarian') {
//       setVegMeal(prev => ({ ...prev, [mealTime]: [...prev[mealTime], newItem] }));
//     } else {
//       setNonVegMeal(prev => ({ ...prev, [mealTime]: [...prev[mealTime], newItem] }));
//     }
//   };

//   const addMealItem = (setter, mealKey) => {
//     setter((prev) => ({ ...prev, [mealKey]: [...prev[mealKey], defaultMealItem] }));
//   };

//   const removeMealItem = (setter, mealKey, idx) => {
//     setter((prev) => {
//       const updated = [...prev[mealKey]];
//       updated.splice(idx, 1);
//       return { ...prev, [mealKey]: updated.length ? updated : [defaultMealItem] };
//     });
//   };

//   const resetForm = () => {
//     setDay('');
//     setVegMeal(defaultMeal);
//     setNonVegMeal(defaultMeal);
//     setEditMode(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!day.trim()) {
//       alert('Please select a valid day.');
//       return;
//     }
//     setLoading(true);
//     try {
//       if (editMode) {
//         await axios.put(`${apiUrl}/${day}`, { vegMeal, nonVegMeal });
//         alert('Meal plan updated successfully!');
//       } else {
//         await axios.post(apiUrl, { day, vegMeal, nonVegMeal });
//         alert('Meal plan created successfully!');
//       }
//       resetForm();
//       await fetchMealPlans();
//     } catch (err) {
//       alert('Error saving meal plan: ' + (err.response?.data?.error || err.message));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (plan) => {
//     setDay(plan.day);
//     setVegMeal(plan.vegMeal || defaultMeal);
//     setNonVegMeal(plan.nonVegMeal || defaultMeal);
//     setEditMode(true);
//   };

//   const handleDelete = async (dayToDelete) => {
//     if (!window.confirm(`Are you sure you want to delete the meal plan for "${dayToDelete}"?`)) return;
//     setLoading(true);
//     try {
//       await axios.delete(`${apiUrl}/${dayToDelete}`);
//       alert('Deleted successfully');
//       if (dayToDelete === day) resetForm();
//       await fetchMealPlans();
//     } catch (err) {
//       alert('Error deleting meal plan: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 900, margin: '30px auto', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
//       <h1 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: 20 }}>Meal Plan Admin Panel</h1>

//       <div style={{ textAlign: 'right', marginBottom: 16 }}>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           style={{
//             backgroundColor: '#27ae60',
//             color: 'white',
//             border: 'none',
//             padding: '12px 28px',
//             borderRadius: 6,
//             cursor: 'pointer',
//             fontWeight: '700',
//             fontSize: 16,
//             boxShadow: '0 2px 6px rgba(39,174,96,0.5)',
//             transition: 'background-color 0.2s',
//           }}
//           onMouseOver={e => e.currentTarget.style.backgroundColor = '#219150'}
//           onMouseOut={e => e.currentTarget.style.backgroundColor = '#27ae60'}
//           aria-label="Add new meal item"
//         >
//           + Add Meal Item
//         </button>
//       </div>

//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={addMealItemToState} />

//       <form
//         onSubmit={handleSubmit}
//         style={{
//           backgroundColor: '#fff',
//           padding: 24,
//           borderRadius: 8,
//           boxShadow: '0 4px 18px rgba(0,0,0,0.1)',
//           marginBottom: 40,
//         }}
//       >
//         <h2 style={{ marginBottom: 18, fontWeight: '700', fontSize: 24, color: '#34495e' }}>
//           {editMode ? 'Edit Meal Plan' : 'Add New Meal Plan'}
//         </h2>

//         <div style={{ marginBottom: 22 }}>
//           <label htmlFor="day" style={{ fontWeight: 700, fontSize: 16 }}>
//             Day:
//           </label>
//           <select
//             id="day"
//             value={day}
//             disabled={editMode}
//             onChange={e => setDay(e.target.value)}
//             required
//             style={{
//               width: '100%',
//               padding: 12,
//               marginTop: 8,
//               borderRadius: 6,
//               border: '1.5px solid #aaa',
//               fontSize: 16,
//               cursor: 'pointer',
//               boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
//               transition: 'border-color 0.2s',
//             }}
//             onFocus={e => e.currentTarget.style.borderColor = '#27ae60'}
//             onBlur={e => e.currentTarget.style.borderColor = '#aaa'}
//           >
//             <option value="">Select Day</option>
//             {DAYS.map((d) => (
//               <option key={d} value={d}>
//                 {d}
//               </option>
//             ))}
//           </select>
//         </div>

//         {[{ title: 'Vegetarian Meal', mealState: vegMeal, setter: setVegMeal, isVeg: true },
//           { title: 'Non-Vegetarian Meal', mealState: nonVegMeal, setter: setNonVegMeal, isVeg: false }].map(({ title, mealState, setter, isVeg }) => (
//           <section
//             key={title}
//             style={{
//               marginBottom: 36,
//               backgroundColor: '#fafafa',
//               padding: '18px 28px',
//               borderRadius: 10,
//               boxShadow: 'inset 0 0 12px #ddd',
//             }}
//           >
//             <h3 style={{ color: isVeg ? '#27ae60' : '#c0392b', marginBottom: 20, fontWeight: 700, fontSize: 20 }}>
//               {title}
//             </h3>
//             {['Lunch', 'Dinner'].map(mealType => (
//               <div key={mealType} style={{ marginBottom: 26 }}>
//                 <h4 style={{ marginBottom: 12, color: '#34495e', fontWeight: 600, fontSize: 18 }}>
//                   {mealType}
//                   <button
//                     type="button"
//                     onClick={() => addMealItem(setter, mealType)}
//                     style={{
//                       marginLeft: 12,
//                       color: '#2980b9',
//                       background: 'none',
//                       border: 'none',
//                       cursor: 'pointer',
//                       fontWeight: '700',
//                       fontSize: 20,
//                       userSelect: 'none',
//                       transition: 'color 0.2s',
//                     }}
//                     onMouseOver={e => e.currentTarget.style.color = '#1c5980'}
//                     onMouseOut={e => e.currentTarget.style.color = '#2980b9'}
//                     aria-label={`Add ${mealType} item`}
//                   >
//                     ＋ Add Item
//                   </button>
//                 </h4>
//                 {mealState[mealType].map((item, index) => (
//                   <CollapsibleMealItem
//                     key={`${mealType}-${isVeg ? 'veg' : 'nonveg'}-${index}`}
//                     idx={index}
//                     item={item}
//                     onChange={(i, field, value) => handleMealItemChange(setter, mealType, i, field, value)}
//                     onRemove={i => removeMealItem(setter, mealType, i)}
//                     mealType={mealType}
//                     isVeg={isVeg}
//                   />
//                 ))}
//               </div>
//             ))}
//           </section>
//         ))}

//         <button
//           type="submit"
//           disabled={loading}
//           style={{
//             backgroundColor: '#2980b9',
//             color: 'white',
//             padding: '14px 36px',
//             borderRadius: 8,
//             fontSize: 18,
//             fontWeight: '700',
//             cursor: loading ? 'not-allowed' : 'pointer',
//             border: 'none',
//             marginRight: 20,
//             boxShadow: '0 3px 8px rgb(41 128 185 / 0.6)',
//             transition: 'background-color 0.2s',
//           }}
//           onMouseOver={e => !loading && (e.currentTarget.style.backgroundColor = '#1f6391')}
//           onMouseOut={e => !loading && (e.currentTarget.style.backgroundColor = '#2980b9')}
//         >
//           {editMode ? (loading ? 'Updating...' : 'Update Meal Plan') : loading ? 'Creating...' : 'Create Meal Plan'}
//         </button>
//         {editMode && (
//           <button
//             type="button"
//             onClick={resetForm}
//             disabled={loading}
//             style={{
//               backgroundColor: '#7f8c8d',
//               color: 'white',
//               padding: '14px 36px',
//               borderRadius: 8,
//               fontSize: 18,
//               fontWeight: '700',
//               cursor: loading ? 'not-allowed' : 'pointer',
//               border: 'none',
//               boxShadow: '0 3px 8px rgb(127 140 141 / 0.6)',
//               transition: 'background-color 0.2s',
//             }}
//             onMouseOver={e => !loading && (e.currentTarget.style.backgroundColor = '#626c6f')}
//             onMouseOut={e => !loading && (e.currentTarget.style.backgroundColor = '#7f8c8d')}
//           >
//             Cancel
//           </button>
//         )}
//       </form>

//       <h2 style={{ marginBottom: 18, textAlign: 'center', color: '#2c3e50', fontSize: 22, fontWeight: 700 }}>
//         {loading ? 'Loading Meal Plans...' : 'Existing Meal Plans'}
//       </h2>

//       {!loading && (
//         <table
//           style={{
//             width: '100%',
//             borderCollapse: 'collapse',
//             boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
//           }}
//           aria-label="Existing meal plans"
//         >
//           <thead style={{ backgroundColor: '#2980b9', color: 'white' }}>
//             <tr>
//               <th style={{ padding: 14, fontSize: 16 }}>Day</th>
//               <th style={{ padding: 14, fontSize: 16 }}>Veg Lunch</th>
//               <th style={{ padding: 14, fontSize: 16 }}>Veg Dinner</th>
//               <th style={{ padding: 14, fontSize: 16 }}>NonVeg Lunch</th>
//               <th style={{ padding: 14, fontSize: 16 }}>NonVeg Dinner</th>
//               <th style={{ padding: 14, fontSize: 16 }}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {mealPlans.length ? (
//               mealPlans.map(plan => (
//                 <tr
//                   key={plan.day}
//                   style={{
//                     borderBottom: '1px solid #d2d2d2',
//                     backgroundColor: plan.day === day && editMode ? '#d6f5d6' : 'white',
//                     fontSize: 15,
//                   }}
//                 >
//                   <td style={{ padding: 12, fontWeight: 700 }}>{plan.day}</td>
//                   <td style={{ padding: 12 }}>{plan.vegMeal?.Lunch?.map(i => i.Item).filter(Boolean).join(', ') || 'N/A'}</td>
//                   <td style={{ padding: 12 }}>{plan.vegMeal?.Dinner?.map(i => i.Item).filter(Boolean).join(', ') || 'N/A'}</td>
//                   <td style={{ padding: 12 }}>{plan.nonVegMeal?.Lunch?.map(i => i.Item).filter(Boolean).join(', ') || 'N/A'}</td>
//                   <td style={{ padding: 12 }}>{plan.nonVegMeal?.Dinner?.map(i => i.Item).filter(Boolean).join(', ') || 'N/A'}</td>
//                   <td style={{ padding: 12 }}>
//                     <button
//                       onClick={() => handleEdit(plan)}
//                       style={{
//                         backgroundColor: '#27ae60',
//                         border: 'none',
//                         color: 'white',
//                         padding: '8px 14px',
//                         borderRadius: 6,
//                         cursor: 'pointer',
//                         marginRight: 8,
//                         fontWeight: 600,
//                         fontSize: 14,
//                         transition: 'background-color 0.2s',
//                       }}
//                       onMouseOver={e => (e.currentTarget.style.backgroundColor = '#1f8a3e')}
//                       onMouseOut={e => (e.currentTarget.style.backgroundColor = '#27ae60')}
//                       aria-label={`Edit meal plan for ${plan.day}`}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(plan.day)}
//                       style={{
//                         backgroundColor: '#c0392b',
//                         border: 'none',
//                         color: 'white',
//                         padding: '8px 14px',
//                         borderRadius: 6,
//                         cursor: 'pointer',
//                         fontWeight: 600,
//                         fontSize: 14,
//                         transition: 'background-color 0.2s',
//                       }}
//                       onMouseOver={e => (e.currentTarget.style.backgroundColor = '#8f281e')}
//                       onMouseOut={e => (e.currentTarget.style.backgroundColor = '#c0392b')}
//                       aria-label={`Delete meal plan for ${plan.day}`}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={6} style={{ padding: 20, textAlign: 'center', fontStyle: 'italic', fontSize: 16 }}>
//                   No meal plans found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default MealPlanAdmin;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../components/ui/dialog";
import { ChevronDown, ChevronUp, Plus, X } from "lucide-react";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";

const apiUrl = 'http://localhost:5001/api/mealplan';
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const COURSE_OPTIONS = ['Starter', 'Main', 'Salad'];

const defaultMealItem = {
  Course: COURSE_OPTIONS[0],
  Item: '',
  Calories: '',
  Protein: '',
  Carbs: '',
  Fat: '',
  Ingredients: '',
  Benefits: '',
};

const defaultMeal = { Lunch: [defaultMealItem], Dinner: [defaultMealItem] };

function CollapsibleMealItem({ idx, item, onChange, onRemove, mealType, isVeg }) {
  const [open, setOpen] = useState(false);

  const handleChange = (field, value) => {
    onChange(idx, field, value);
  };

  return (
    <Card className="mb-4">
      <CardHeader 
        className="flex flex-row items-center justify-between p-4 cursor-pointer" 
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center space-x-2">
          {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          <span className="font-semibold">
            {item.Course || 'Course'} - {item.Item || 'Item'}
          </span>
          <Badge variant={isVeg ? "success" : "destructive"}>
            {isVeg ? "Veg" : "Non-Veg"}
          </Badge>
        </div>
        <Button
          variant="destructive"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(idx);
          }}
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      {open && (
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor={`course-${mealType}-${idx}`}>Course</Label>
              <Select
                value={item.Course}
                onValueChange={(value) => handleChange('Course', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {COURSE_OPTIONS.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {['Item', 'Calories', 'Protein', 'Carbs', 'Fat', 'Ingredients', 'Benefits'].map((field) => (
              <div key={field}>
                <Label htmlFor={`${field}-${mealType}-${idx}`}>{field}</Label>
                <Input
                  id={`${field}-${mealType}-${idx}`}
                  type="text"
                  value={item[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                  placeholder={`Enter ${field}`}
                />
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

function AddMealItemModal({ isOpen, onClose, onAdd }) {
  const [mealCategory, setMealCategory] = useState('Vegetarian');
  const [mealTime, setMealTime] = useState('Lunch');
  const [course, setCourse] = useState(COURSE_OPTIONS[0]);
  const [itemData, setItemData] = useState({
    Item: '',
    Calories: '',
    Protein: '',
    Carbs: '',
    Fat: '',
    Ingredients: '',
    Benefits: '',
  });

  useEffect(() => {
    if (isOpen) {
      setMealCategory('Vegetarian');
      setMealTime('Lunch');
      setCourse(COURSE_OPTIONS[0]);
      setItemData({
        Item: '',
        Calories: '',
        Protein: '',
        Carbs: '',
        Fat: '',
        Ingredients: '',
        Benefits: '',
      });
    }
  }, [isOpen]);

  const handleInputChange = (field, value) => {
    setItemData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!itemData.Item.trim()) {
      alert('Please enter an Item name.');
      return;
    }

    const newItem = {
      Course: course,
      ...itemData,
    };

    onAdd(mealCategory, mealTime, newItem);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Meal Item</DialogTitle>
          <DialogDescription>
            Fill in the details for the new meal item.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="mealCategory">Meal Category</Label>
              <Select
                value={mealCategory}
                onValueChange={setMealCategory}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="Non-Vegetarian">Non-Vegetarian</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="mealTime">Meal Time</Label>
              <Select
                value={mealTime}
                onValueChange={setMealTime}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select meal time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lunch">Lunch</SelectItem>
                  <SelectItem value="Dinner">Dinner</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="course">Course</Label>
              <Select
                value={course}
                onValueChange={setCourse}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {COURSE_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {['Item', 'Calories', 'Protein', 'Carbs', 'Fat', 'Ingredients', 'Benefits'].map((field) => (
              <div key={field}>
                <Label htmlFor={field}>{field}</Label>
                <Input
                  id={field}
                  type="text"
                  value={itemData[field]}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  placeholder={`Enter ${field}`}
                  required={field === 'Item'}
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Add Item
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function MealPlanAdmin() {
  const [mealPlans, setMealPlans] = useState([]);
  const [day, setDay] = useState('');
  const [vegMeal, setVegMeal] = useState(defaultMeal);
  const [nonVegMeal, setNonVegMeal] = useState(defaultMeal);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchMealPlans();
  }, []);

  const fetchMealPlans = async () => {
    setLoading(true);
    try {
      const res = await axios.get(apiUrl);
      setMealPlans(res.data);
    } catch (err) {
      alert('Error fetching meal plans: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMealItemChange = (setter, mealKey, idx, field, value) => {
    setter((prev) => {
      const updatedArray = [...prev[mealKey]];
      updatedArray[idx] = { ...updatedArray[idx], [field]: value };
      return { ...prev, [mealKey]: updatedArray };
    });
  };

  const addMealItemToState = (category, mealTime, newItem) => {
    if (category === 'Vegetarian') {
      setVegMeal(prev => ({ ...prev, [mealTime]: [...prev[mealTime], newItem] }));
    } else {
      setNonVegMeal(prev => ({ ...prev, [mealTime]: [...prev[mealTime], newItem] }));
    }
  };

  const addMealItem = (setter, mealKey) => {
    setter((prev) => ({ ...prev, [mealKey]: [...prev[mealKey], defaultMealItem] }));
  };

  const removeMealItem = (setter, mealKey, idx) => {
    setter((prev) => {
      const updated = [...prev[mealKey]];
      updated.splice(idx, 1);
      return { ...prev, [mealKey]: updated.length ? updated : [defaultMealItem] };
    });
  };

  const resetForm = () => {
    setDay('');
    setVegMeal(defaultMeal);
    setNonVegMeal(defaultMeal);
    setEditMode(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!day.trim()) {
      alert('Please select a valid day.');
      return;
    }
    setLoading(true);
    try {
      if (editMode) {
        await axios.put(`${apiUrl}/${day}`, { vegMeal, nonVegMeal });
        alert('Meal plan updated successfully!');
      } else {
        await axios.post(apiUrl, { day, vegMeal, nonVegMeal });
        alert('Meal plan created successfully!');
      }
      resetForm();
      await fetchMealPlans();
    } catch (err) {
      alert('Error saving meal plan: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (plan) => {
    setDay(plan.day);
    setVegMeal(plan.vegMeal || defaultMeal);
    setNonVegMeal(plan.nonVegMeal || defaultMeal);
    setEditMode(true);
  };

  const handleDelete = async (dayToDelete) => {
    if (!window.confirm(`Are you sure you want to delete the meal plan for "${dayToDelete}"?`)) return;
    setLoading(true);
    try {
      await axios.delete(`${apiUrl}/${dayToDelete}`);
      alert('Deleted successfully');
      if (dayToDelete === day) resetForm();
      await fetchMealPlans();
    } catch (err) {
      alert('Error deleting meal plan: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Meal Plan Admin Panel</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-end">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Meal Item
              </Button>
            </DialogTrigger>
            <AddMealItemModal 
              isOpen={isModalOpen} 
              onClose={() => setIsModalOpen(false)} 
              onAdd={addMealItemToState} 
            />
          </Dialog>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editMode ? 'Edit Meal Plan' : 'Add New Meal Plan'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="day">Day</Label>
              <Select
                value={day}
                onValueChange={setDay}
                disabled={editMode}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  {DAYS.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {[
              { title: 'Vegetarian Meal', mealState: vegMeal, setter: setVegMeal, isVeg: true },
              { title: 'Non-Vegetarian Meal', mealState: nonVegMeal, setter: setNonVegMeal, isVeg: false }
            ].map(({ title, mealState, setter, isVeg }) => (
              <Card key={title}>
                <CardHeader>
                  <CardTitle className={isVeg ? "text-green-600" : "text-red-600"}>
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {['Lunch', 'Dinner'].map(mealType => (
                    <div key={mealType} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{mealType}</h3>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addMealItem(setter, mealType)}
                        >
                          <Plus className="mr-2 h-4 w-4" /> Add Item
                        </Button>
                      </div>
                      {mealState[mealType].map((item, index) => (
                        <CollapsibleMealItem
                          key={`${mealType}-${isVeg ? 'veg' : 'nonveg'}-${index}`}
                          idx={index}
                          item={item}
                          onChange={(i, field, value) => handleMealItemChange(setter, mealType, i, field, value)}
                          onRemove={i => removeMealItem(setter, mealType, i)}
                          mealType={mealType}
                          isVeg={isVeg}
                        />
                      ))}
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}

            <div className="flex space-x-4">
              <Button type="submit" disabled={loading}>
                {editMode ? (loading ? 'Updating...' : 'Update Meal Plan') : loading ? 'Creating...' : 'Create Meal Plan'}
              </Button>
              {editMode && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  disabled={loading}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            {loading ? 'Loading Meal Plans...' : 'Existing Meal Plans'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Day</TableHead>
                <TableHead>Veg Lunch</TableHead>
                <TableHead>Veg Dinner</TableHead>
                <TableHead>NonVeg Lunch</TableHead>
                <TableHead>NonVeg Dinner</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mealPlans.length ? (
                mealPlans.map(plan => (
                  <TableRow
                    key={plan.day}
                    className={plan.day === day && editMode ? "bg-green-50" : ""}
                  >
                    <TableCell className="font-medium">{plan.day}</TableCell>
                    <TableCell>{plan.vegMeal?.Lunch?.map(i => i.Item).filter(Boolean).join(', ') || 'N/A'}</TableCell>
                    <TableCell>{plan.vegMeal?.Dinner?.map(i => i.Item).filter(Boolean).join(', ') || 'N/A'}</TableCell>
                    <TableCell>{plan.nonVegMeal?.Lunch?.map(i => i.Item).filter(Boolean).join(', ') || 'N/A'}</TableCell>
                    <TableCell>{plan.nonVegMeal?.Dinner?.map(i => i.Item).filter(Boolean).join(', ') || 'N/A'}</TableCell>
                    <TableCell className="space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(plan)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(plan.day)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No meal plans found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default MealPlanAdmin;