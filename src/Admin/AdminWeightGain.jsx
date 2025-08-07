
// // "use client"

// // import React, { useState, useEffect } from "react"
// // import { Button } from "../components/ui/button"
// // import { Input } from "../components/ui/input"
// // import { Label } from "../components/ui/label"
// // import { Textarea } from "../components/ui/textarea"
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogDescription,
// //   DialogFooter,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogTrigger,
// // } from "../components/ui/dialog"
// // import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
// // import { Badge } from "../components/ui/badge"
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
// // import { Plus, Edit, Trash2, TrendingUp } from "lucide-react"

// // const API_URL = "http://localhost:5001/api/weight-gain-meals" // Change to your API url

// // // API helper functions:

// // async function fetchMeals() {
// //   const res = await fetch(API_URL)
// //   if (!res.ok) throw new Error("Failed to fetch weight gain meals")
// //   return res.json()
// // }

// // async function createMealApi(meal) {
// //   const res = await fetch(API_URL, {
// //     method: "POST",
// //     headers: { "Content-Type": "application/json" },
// //     body: JSON.stringify(meal),
// //   })
// //   if (!res.ok) throw new Error("Failed to create meal")
// //   return res.json()
// // }

// // async function updateMealApi(id, meal) {
// //   const res = await fetch(`${API_URL}/${id}`, {
// //     method: "PUT",
// //     headers: { "Content-Type": "application/json" },
// //     body: JSON.stringify(meal),
// //   })
// //   if (!res.ok) throw new Error("Failed to update meal")
// //   return res.json()
// // }

// // async function deleteMealApi(id) {
// //   const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" })
// //   if (!res.ok) throw new Error("Failed to delete meal")
// // }

// // export default function WeightGainMealManager() {
// //   const [meals, setMeals] = useState([])
// //   const [isDialogOpen, setIsDialogOpen] = useState(false)
// //   const [editingMeal, setEditingMeal] = useState(null)
// //   const [selectedTab, setSelectedTab] = useState("meals")
// //   const [formData, setFormData] = useState({
// //     day: "DAY - 1",
// //     mealType: "VEG MEAL",
// //     mealTime: "Lunch",
// //     items: [],
// //   })

// //   const [itemFormData, setItemFormData] = useState({
// //     course: "Starter",
// //     item: "",
// //     calories: 0,
// //     protein: 0,
// //     carbs: 0,
// //     fat: 0,
// //     ingredients: "",
// //     benefits: "",
// //   })

// //   useEffect(() => {
// //     async function loadMeals() {
// //       try {
// //         const apiMeals = await fetchMeals()
// //         // Map MongoDB _id to id
// //         const mappedMeals = apiMeals.map((meal) => ({
// //           ...meal,
// //           id: meal._id,
// //         }))
// //         setMeals(mappedMeals)
// //       } catch (error) {
// //         console.error("Error loading meals:", error)
// //       }
// //     }
// //     loadMeals()
// //   }, [])

// //   const resetForm = () => {
// //     setFormData({
// //       day: "DAY - 1",
// //       mealType: "VEG MEAL",
// //       mealTime: "Lunch",
// //       items: [],
// //     })
// //     setItemFormData({
// //       course: "Starter",
// //       item: "",
// //       calories: 0,
// //       protein: 0,
// //       carbs: 0,
// //       fat: 0,
// //       ingredients: "",
// //       benefits: "",
// //     })
// //     setEditingMeal(null)
// //     setIsDialogOpen(false)
// //   }

// //   const handleSubmit = async (e) => {
// //     e.preventDefault()

// //     const mealWithIds = {
// //       ...formData,
// //       items: formData.items.map((item, index) => ({
// //         ...item,
// //         // Keep existing id or assign temporary id for UI
// //         id: item.id || Date.now().toString() + index,
// //       })),
// //     }

// //     try {
// //       if (editingMeal) {
// //         const updatedMeal = await updateMealApi(editingMeal.id, mealWithIds)
// //         setMeals(
// //           meals.map((meal) =>
// //             meal.id === editingMeal.id ? { ...updatedMeal, id: updatedMeal._id } : meal
// //           )
// //         )
// //       } else {
// //         const newMeal = await createMealApi(mealWithIds)
// //         setMeals([...meals, { ...newMeal, id: newMeal._id }])
// //       }
// //       resetForm()
// //     } catch (error) {
// //       console.error("Error saving meal:", error)
// //     }
// //   }

// //   const handleEdit = (meal) => {
// //     setEditingMeal(meal)
// //     setFormData({
// //       day: meal.day,
// //       mealType: meal.mealType,
// //       mealTime: meal.mealTime,
// //       // strip out any _id/id from items
// //       items: meal.items.map(({ id, _id, ...rest }) => rest),
// //     })
// //     setIsDialogOpen(true)
// //   }

// //   const handleDelete = async (id) => {
// //     try {
// //       await deleteMealApi(id)
// //       setMeals(meals.filter((meal) => meal.id !== id))
// //     } catch (error) {
// //       console.error("Error deleting meal:", error)
// //     }
// //   }

// //   const addItemToMeal = () => {
// //     // Avoid adding empty item
// //     if (!itemFormData.item.trim()) return

// //     setFormData({
// //       ...formData,
// //       items: [...formData.items, itemFormData],
// //     })
// //     setItemFormData({
// //       course: "Starter",
// //       item: "",
// //       calories: 0,
// //       protein: 0,
// //       carbs: 0,
// //       fat: 0,
// //       ingredients: "",
// //       benefits: "",
// //     })
// //   }

// //   const removeItemFromMeal = (index) => {
// //     setFormData({
// //       ...formData,
// //       items: formData.items.filter((_, i) => i !== index),
// //     })
// //   }

// //   const getCourseColor = (course) => {
// //     switch (course) {
// //       case "Starter":
// //         return "bg-purple-100 text-purple-800"
// //       case "Main":
// //         return "bg-purple-200 text-purple-900"
// //       case "Salad":
// //         return "bg-purple-300 text-purple-900"
// //       default:
// //         return "bg-gray-100 text-gray-800"
// //     }
// //   }

// //   const getMealTypeColor = (type) => {
// //     return type === "VEG MEAL" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
// //   }

// //   return (
// //     <div className="space-y-6">
// //       <Card>
// //         <CardHeader>
// //           <div className="flex justify-between items-center">
// //             <div>
// //               <CardTitle className="flex items-center space-x-2 text-purple-700">
// //                 <TrendingUp className="w-5 h-5" />
// //                 <span>Weight Gain Meal Plans Management</span>
// //               </CardTitle>
// //               <CardDescription>Manage high-calorie meal plans for healthy weight gain</CardDescription>
// //             </div>
// //             <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
// //               <DialogTrigger asChild>
// //                 <Button onClick={resetForm} className="bg-purple-600 hover:bg-purple-700">
// //                   <Plus className="w-4 h-4 mr-2" />
// //                   Add Weight Gain Plan
// //                 </Button>
// //               </DialogTrigger>

// //               <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
// //                 <DialogHeader>
// //                   <DialogTitle>{editingMeal ? "Edit Weight Gain Plan" : "Add New Weight Gain Plan"}</DialogTitle>
// //                   <DialogDescription>
// //                     {editingMeal ? "Update weight gain meal plan" : "Create a new high-calorie meal plan"}
// //                   </DialogDescription>
// //                 </DialogHeader>

// //                 <form onSubmit={handleSubmit}>
// //                   <div className="grid gap-4 py-4">
// //                     <div className="grid grid-cols-3 gap-4">
// //                       {/* Day */}
// //                       <div className="space-y-2">
// //                         <Label htmlFor="day">Day</Label>
// //                         <select
// //                           id="day"
// //                           value={formData.day}
// //                           onChange={(e) => setFormData({ ...formData, day: e.target.value })}
// //                           className="w-full p-2 border border-gray-300 rounded-md"
// //                           required
// //                         >
// //                           <option value="DAY - 1">Day 1</option>
// //                           <option value="DAY - 2">Day 2</option>
// //                           <option value="DAY - 3">Day 3</option>
// //                           <option value="DAY - 4">Day 4</option>
// //                           <option value="DAY - 5">Day 5</option>
// //                           <option value="DAY - 6">Day 6</option>
// //                           <option value="DAY - 7">Day 7</option>
// //                         </select>
// //                       </div>
// //                       {/* Meal Type */}
// //                       <div className="space-y-2">
// //                         <Label htmlFor="mealType">Meal Type</Label>
// //                         <select
// //                           id="mealType"
// //                           value={formData.mealType}
// //                           onChange={(e) => setFormData({ ...formData, mealType: e.target.value })}
// //                           className="w-full p-2 border border-gray-300 rounded-md"
// //                           required
// //                         >
// //                           <option value="VEG MEAL">Vegetarian</option>
// //                           <option value="NON-VEG MEAL">Non-Vegetarian</option>
// //                         </select>
// //                       </div>
// //                       {/* Meal Time */}
// //                       <div className="space-y-2">
// //                         <Label htmlFor="mealTime">Meal Time</Label>
// //                         <select
// //                           id="mealTime"
// //                           value={formData.mealTime}
// //                           onChange={(e) => setFormData({ ...formData, mealTime: e.target.value })}
// //                           className="w-full p-2 border border-gray-300 rounded-md"
// //                           required
// //                         >
// //                           <option value="Lunch">Lunch</option>
// //                           <option value="Dinner">Dinner</option>
// //                         </select>
// //                       </div>
// //                     </div>

// //                     {/* Add Meal Items Section */}
// //                     <div className="border-t pt-4">
// //                       <h4 className="text-lg font-medium mb-4">Add High-Calorie Meal Items</h4>
// //                       <div className="grid grid-cols-2 gap-4 mb-4">
// //                         <div className="space-y-2">
// //                           <Label htmlFor="course">Course</Label>
// //                           <select
// //                             id="course"
// //                             value={itemFormData.course}
// //                             onChange={(e) => setItemFormData({ ...itemFormData, course: e.target.value })}
// //                             className="w-full p-2 border border-gray-300 rounded-md"
// //                           >
// //                             <option value="Starter">Starter</option>
// //                             <option value="Main">Main</option>
// //                             <option value="Salad">Salad</option>
// //                           </select>
// //                         </div>
// //                         <div className="space-y-2">
// //                           <Label htmlFor="item">Item Name</Label>
// //                           <Input
// //                             id="item"
// //                             value={itemFormData.item}
// //                             onChange={(e) => setItemFormData({ ...itemFormData, item: e.target.value })}
// //                             placeholder="Methi Tomato Clear Soup"
// //                           />
// //                         </div>
// //                       </div>

// //                       <div className="grid grid-cols-4 gap-4 mb-4">
// //                         <div className="space-y-2">
// //                           <Label htmlFor="calories">Calories</Label>
// //                           <Input
// //                             id="calories"
// //                             type="number"
// //                             min={0}
// //                             value={itemFormData.calories}
// //                             onChange={(e) =>
// //                               setItemFormData({ ...itemFormData, calories: Number.parseInt(e.target.value) || 0 })
// //                             }
// //                             placeholder="260"
// //                           />
// //                         </div>
// //                         <div className="space-y-2">
// //                           <Label htmlFor="protein">Protein (g)</Label>
// //                           <Input
// //                             id="protein"
// //                             type="number"
// //                             min={0}
// //                             value={itemFormData.protein}
// //                             onChange={(e) =>
// //                               setItemFormData({ ...itemFormData, protein: Number.parseInt(e.target.value) || 0 })
// //                             }
// //                             placeholder="8"
// //                           />
// //                         </div>
// //                         <div className="space-y-2">
// //                           <Label htmlFor="carbs">Carbs (g)</Label>
// //                           <Input
// //                             id="carbs"
// //                             type="number"
// //                             min={0}
// //                             value={itemFormData.carbs}
// //                             onChange={(e) =>
// //                               setItemFormData({ ...itemFormData, carbs: Number.parseInt(e.target.value) || 0 })
// //                             }
// //                             placeholder="42"
// //                           />
// //                         </div>
// //                         <div className="space-y-2">
// //                           <Label htmlFor="fat">Fat (g)</Label>
// //                           <Input
// //                             id="fat"
// //                             type="number"
// //                             min={0}
// //                             value={itemFormData.fat}
// //                             onChange={(e) =>
// //                               setItemFormData({ ...itemFormData, fat: Number.parseInt(e.target.value) || 0 })
// //                             }
// //                             placeholder="7"
// //                           />
// //                         </div>
// //                       </div>

// //                       <div className="grid grid-cols-2 gap-4 mb-4">
// //                         <div className="space-y-2">
// //                           <Label htmlFor="ingredients">Ingredients</Label>
// //                           <Textarea
// //                             id="ingredients"
// //                             value={itemFormData.ingredients}
// //                             onChange={(e) => setItemFormData({ ...itemFormData, ingredients: e.target.value })}
// //                             placeholder="Rolled oats – 60g, carrot – 30g..."
// //                           />
// //                         </div>
// //                         <div className="space-y-2">
// //                           <Label htmlFor="benefits">Benefits</Label>
// //                           <Textarea
// //                             id="benefits"
// //                             value={itemFormData.benefits}
// //                             onChange={(e) => setItemFormData({ ...itemFormData, benefits: e.target.value })}
// //                             placeholder="Soluble fiber-rich; reduces cholesterol..."
// //                           />
// //                         </div>
// //                       </div>

// //                       <Button
// //                         type="button"
// //                         onClick={addItemToMeal}
// //                         variant="outline"
// //                         className="mb-4 bg-transparent"
// //                         disabled={!itemFormData.item.trim()}
// //                       >
// //                         <Plus className="w-4 h-4 mr-2" />
// //                         Add Item to Meal
// //                       </Button>

// //                       {/* Display Added Items */}
// //                       {formData.items.length > 0 && (
// //                         <div className="space-y-2">
// //                           <h5 className="font-medium">Added Items:</h5>
// //                           {formData.items.map((item, index) => (
// //                             <div key={index} className="flex items-center justify-between p-2 bg-purple-50 rounded">
// //                               <span>
// //                                 {item.course}: {item.item} ({item.calories} kcal)
// //                               </span>
// //                               <Button
// //                                 type="button"
// //                                 variant="destructive"
// //                                 size="sm"
// //                                 onClick={() => removeItemFromMeal(index)}
// //                               >
// //                                 <Trash2 className="w-4 h-4" />
// //                               </Button>
// //                             </div>
// //                           ))}
// //                         </div>
// //                       )}
// //                     </div>
// //                   </div>
// //                   <DialogFooter>
// //                     <Button type="button" variant="outline" onClick={resetForm}>
// //                       Cancel
// //                     </Button>
// //                     <Button type="submit" className="bg-purple-600 hover:bg-purple-700" disabled={formData.items.length === 0}>
// //                       {editingMeal ? "Update" : "Add"} Weight Gain Plan
// //                     </Button>
// //                   </DialogFooter>
// //                 </form>
// //               </DialogContent>
// //             </Dialog>
// //           </div>
// //         </CardHeader>

// //         <CardContent>
// //           <Tabs value={selectedTab} onValueChange={setSelectedTab}>
// //             <TabsList>
// //               <TabsTrigger value="meals">Weight Gain Plans</TabsTrigger>
// //               <TabsTrigger value="analytics">Analytics</TabsTrigger>
// //             </TabsList>

// //             <TabsContent value="meals">
// //               <Table>
// //                 <TableHeader>
// //                   <TableRow>
// //                     <TableHead>Day</TableHead>
// //                     <TableHead>Type</TableHead>
// //                     <TableHead>Meal Time</TableHead>
// //                     <TableHead>Items Count</TableHead>
// //                     <TableHead>Total Calories</TableHead>
// //                     <TableHead className="text-right">Actions</TableHead>
// //                   </TableRow>
// //                 </TableHeader>

// //                 <TableBody>
// //                   {meals.map((meal) => (
// //                     <TableRow key={meal.id}>
// //                       <TableCell className="font-medium">{meal.day}</TableCell>
// //                       <TableCell>
// //                         <Badge className={getMealTypeColor(meal.mealType)}>
// //                           {meal.mealType.replace("MEAL", "").trim()}
// //                         </Badge>
// //                       </TableCell>
// //                       <TableCell>{meal.mealTime}</TableCell>
// //                       <TableCell>{meal.items.length} items</TableCell>
// //                       <TableCell className="font-semibold text-purple-600">
// //                         {meal.items.reduce((total, item) => total + item.calories, 0)} kcal
// //                       </TableCell>
// //                       <TableCell className="text-right">
// //                         <div className="flex justify-end space-x-2">
// //                           <Button variant="outline" size="sm" onClick={() => handleEdit(meal)}>
// //                             <Edit className="w-4 h-4" />
// //                           </Button>
// //                           <Button variant="destructive" size="sm" onClick={() => handleDelete(meal.id)}>
// //                             <Trash2 className="w-4 h-4" />
// //                           </Button>
// //                         </div>
// //                       </TableCell>
// //                     </TableRow>
// //                   ))}
// //                 </TableBody>
// //               </Table>
// //             </TabsContent>

// //             <TabsContent value="analytics">
// //               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle className="text-sm">Total Plans</CardTitle>
// //                   </CardHeader>
// //                   <CardContent>
// //                     <div className="text-2xl font-bold text-purple-600">{meals.length}</div>
// //                   </CardContent>
// //                 </Card>

// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle className="text-sm">Avg Calories/Meal</CardTitle>
// //                   </CardHeader>
// //                   <CardContent>
// //                     <div className="text-2xl font-bold text-purple-600">
// //                       {Math.round(
// //                         meals.reduce(
// //                           (total, meal) => total + meal.items.reduce((mTotal, item) => mTotal + item.calories, 0),
// //                           0
// //                         ) / meals.length || 0
// //                       )}
// //                     </div>
// //                   </CardContent>
// //                 </Card>

// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle className="text-sm">Vegetarian Plans</CardTitle>
// //                   </CardHeader>
// //                   <CardContent>
// //                     <div className="text-2xl font-bold text-green-600">
// //                       {meals.filter((m) => m.mealType === "VEG MEAL").length}
// //                     </div>
// //                   </CardContent>
// //                 </Card>

// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle className="text-sm">Non-Veg Plans</CardTitle>
// //                   </CardHeader>
// //                   <CardContent>
// //                     <div className="text-2xl font-bold text-orange-600">
// //                       {meals.filter((m) => m.mealType === "NON-VEG MEAL").length}
// //                     </div>
// //                   </CardContent>
// //                 </Card>
// //               </div>
// //             </TabsContent>
// //           </Tabs>
// //         </CardContent>
// //       </Card>
// //     </div>
// //   )
// // }

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const apiUrl = 'http://localhost:5001/api/weight-gain-meals';


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

// function AdminWeightGain() {
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

// export default AdminWeightGain;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '../components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../components/ui/select';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '../components/ui/table';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from '../components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '../components/ui/dropdown-menu';
import { ChevronDown, ChevronUp, Plus, Trash2, Edit, MoreHorizontal } from 'lucide-react';

const apiUrl = 'http://localhost:5001/api/weight-gain-meals';

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
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className="flex items-center justify-between p-4">
          <CollapsibleTrigger asChild>
            <div className="flex items-center space-x-4 cursor-pointer">
              {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              <div>
                <h4 className="font-semibold">
                  {item.Course || 'Course'} - {item.Item || 'Item'}
                </h4>
              </div>
            </div>
          </CollapsibleTrigger>
          <Button
            variant="destructive"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(idx);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="grid gap-4">
              <div className="grid gap-2">
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
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {['Item', 'Calories', 'Protein', 'Carbs', 'Fat', 'Ingredients', 'Benefits'].map((field) => (
                <div key={field} className="grid gap-2">
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
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

function MealItemModal({ isOpen, onClose, onAdd }) {
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
    alert('Meal item added successfully!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Meal Item</DialogTitle>
            <DialogDescription>
              Fill out the form to add a new meal item to the plan.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
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
              <div className="grid gap-2">
                <Label htmlFor="mealTime">Meal Time</Label>
                <Select
                  value={mealTime}
                  onValueChange={setMealTime}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lunch">Lunch</SelectItem>
                    <SelectItem value="Dinner">Dinner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
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
              <div key={field} className="grid gap-2">
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
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              <Plus className="mr-2 h-4 w-4" /> Add Item
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function AdminWeightGain() {
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
          <CardTitle className="text-2xl font-bold">Meal Plan Admin Panel</CardTitle>
          <CardDescription>
            Manage weight gain meal plans for the week
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="flex justify-end mb-6">
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Meal Item
        </Button>
      </div>

      <MealItemModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={addMealItemToState} />

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editMode ? 'Edit Meal Plan' : 'Add New Meal Plan'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="day">Day</Label>
              <Select
                value={day}
                disabled={editMode}
                onValueChange={setDay}
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

            {[
              { title: 'Vegetarian Meal', mealState: vegMeal, setter: setVegMeal, isVeg: true },
              { title: 'Non-Vegetarian Meal', mealState: nonVegMeal, setter: setNonVegMeal, isVeg: false },
            ].map(({ title, mealState, setter, isVeg }) => (
              <Card key={title}>
                <CardHeader>
                  <CardTitle className={isVeg ? 'text-green-600' : 'text-red-600'}>
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {['Lunch', 'Dinner'].map((mealType) => (
                    <div key={mealType} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold capitalize">{mealType}</h3>
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
                          onChange={(i, field, value) =>
                            handleMealItemChange(setter, mealType, i, field, value)
                          }
                          onRemove={(i) => removeMealItem(setter, mealType, i)}
                          mealType={mealType}
                          isVeg={isVeg}
                        />
                      ))}
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}

            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                {editMode
                  ? loading
                    ? 'Updating...'
                    : 'Update Meal Plan'
                  : loading
                  ? 'Creating...'
                  : 'Create Meal Plan'}
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
          <CardTitle>Existing Meal Plans</CardTitle>
          {loading && <CardDescription>Loading meal plans...</CardDescription>}
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
                mealPlans.map((plan) => (
                  <TableRow
                    key={plan.day}
                    className={
                      plan.day === day && editMode ? 'bg-green-50' : ''
                    }
                  >
                    <TableCell className="font-medium">{plan.day}</TableCell>
                    <TableCell>
                      {plan.vegMeal?.Lunch?.map((i) => i.Item)
                        .filter(Boolean)
                        .join(', ') || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {plan.vegMeal?.Dinner?.map((i) => i.Item)
                        .filter(Boolean)
                        .join(', ') || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {plan.nonVegMeal?.Lunch?.map((i) => i.Item)
                        .filter(Boolean)
                        .join(', ') || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {plan.nonVegMeal?.Dinner?.map((i) => i.Item)
                        .filter(Boolean)
                        .join(', ') || 'N/A'}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => handleEdit(plan)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDelete(plan.day)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-muted-foreground"
                  >
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

export default AdminWeightGain;