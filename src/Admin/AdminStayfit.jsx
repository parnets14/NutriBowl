// // // // "use client"

// // // // import { useState } from "react"
// // // // import { Button } from "../components/ui/button"
// // // // import { Input } from "../components/ui/input"
// // // // import { Label } from "../components/ui/label"
// // // // import { Textarea } from "../components/ui/textarea"
// // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
// // // // import {
// // // //   Dialog,
// // // //   DialogContent,
// // // //   DialogDescription,
// // // //   DialogFooter,
// // // //   DialogHeader,
// // // //   DialogTitle,
// // // //   DialogTrigger,
// // // // } from "../components/ui/dialog"
// // // // import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
// // // // import { Badge } from "../components/ui/badge"
// // // // import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
// // // // import { Plus, Edit, Trash2, UtensilsCrossed } from "lucide-react"

// // // // const initialStayFitMeals = [
// // // //   {
// // // //     id: "1",
// // // //     day: "DAY - 1",
// // // //     mealType: "VEG MEAL",
// // // //     mealTime: "Lunch",
// // // //     items: [
// // // //       {
// // // //         id: "1",
// // // //         course: "Starter",
// // // //         item: "Steamed Veg Momos (Wheat Wrapper)",
// // // //         calories: 180,
// // // //         protein: 6,
// // // //         carbs: 24,
// // // //         fat: 4,
// // // //         ingredients: "Cabbage – 40g, carrot – 30g, wheat flour – 40g, ginger – 2g, garlic – 2g, lemon – 1 tsp",
// // // //         benefits: "Low-fat starter; good fiber and digestive support.",
// // // //       },
// // // //       {
// // // //         id: "2",
// // // //         course: "Main",
// // // //         item: "Brown Rice Vegetable Pulao",
// // // //         calories: 390,
// // // //         protein: 8,
// // // //         carbs: 50,
// // // //         fat: 12,
// // // //         ingredients: "Brown rice – 60g, peas – 30g, carrot – 30g, onion – 20g, oil – 1 tsp, cumin – ½ tsp",
// // // //         benefits: "Balanced energy meal with fiber, vitamins, and steady carbs.",
// // // //       },
// // // //     ],
// // // //   },
// // // // ]

// // // // export default function StayFitMealManager() {
// // // //   const [meals, setMeals] = useState(initialStayFitMeals)
// // // //   const [isDialogOpen, setIsDialogOpen] = useState(false)
// // // //   const [editingMeal, setEditingMeal] = useState(null)
// // // //   const [selectedTab, setSelectedTab] = useState("meals")
// // // //   const [formData, setFormData] = useState({
// // // //     day: "DAY - 1",
// // // //     mealType: "VEG MEAL",
// // // //     mealTime: "Lunch",
// // // //     items: [],
// // // //   })

// // // //   const [itemFormData, setItemFormData] = useState({
// // // //     course: "Starter",
// // // //     item: "",
// // // //     calories: 0,
// // // //     protein: 0,
// // // //     carbs: 0,
// // // //     fat: 0,
// // // //     ingredients: "",
// // // //     benefits: "",
// // // //   })

// // // //   const handleSubmit = (e) => {
// // // //     e.preventDefault()

// // // //     const mealWithIds = {
// // // //       ...formData,
// // // //       items: formData.items.map((item, index) => ({
// // // //         ...item,
// // // //         id: Date.now().toString() + index,
// // // //       })),
// // // //     }

// // // //     if (editingMeal) {
// // // //       setMeals(meals.map((meal) => (meal.id === editingMeal.id ? { ...meal, ...mealWithIds } : meal)))
// // // //     } else {
// // // //       const newMeal = {
// // // //         id: Date.now().toString(),
// // // //         ...mealWithIds,
// // // //       }
// // // //       setMeals([...meals, newMeal])
// // // //     }

// // // //     resetForm()
// // // //   }

// // // //   const handleEdit = (meal) => {
// // // //     setEditingMeal(meal)
// // // //     setFormData({
// // // //       day: meal.day,
// // // //       mealType: meal.mealType,
// // // //       mealTime: meal.mealTime,
// // // //       items: meal.items.map(({ id, ...item }) => item),
// // // //     })
// // // //     setIsDialogOpen(true)
// // // //   }

// // // //   const handleDelete = (id) => {
// // // //     setMeals(meals.filter((meal) => meal.id !== id))
// // // //   }

// // // //   const addItemToMeal = () => {
// // // //     setFormData({
// // // //       ...formData,
// // // //       items: [...formData.items, itemFormData],
// // // //     })
// // // //     setItemFormData({
// // // //       course: "Starter",
// // // //       item: "",
// // // //       calories: 0,
// // // //       protein: 0,
// // // //       carbs: 0,
// // // //       fat: 0,
// // // //       ingredients: "",
// // // //       benefits: "",
// // // //     })
// // // //   }

// // // //   const removeItemFromMeal = (index) => {
// // // //     setFormData({
// // // //       ...formData,
// // // //       items: formData.items.filter((_, i) => i !== index),
// // // //     })
// // // //   }

// // // //   const resetForm = () => {
// // // //     setFormData({
// // // //       day: "DAY - 1",
// // // //       mealType: "VEG MEAL",
// // // //       mealTime: "Lunch",
// // // //       items: [],
// // // //     })
// // // //     setItemFormData({
// // // //       course: "Starter",
// // // //       item: "",
// // // //       calories: 0,
// // // //       protein: 0,
// // // //       carbs: 0,
// // // //       fat: 0,
// // // //       ingredients: "",
// // // //       benefits: "",
// // // //     })
// // // //     setEditingMeal(null)
// // // //     setIsDialogOpen(false)
// // // //   }

// // // //   const getCourseColor = (course) => {
// // // //     switch (course) {
// // // //       case "Starter":
// // // //         return "bg-green-100 text-green-800"
// // // //       case "Main":
// // // //         return "bg-blue-100 text-blue-800"
// // // //       case "Salad":
// // // //         return "bg-purple-100 text-purple-800"
// // // //       default:
// // // //         return "bg-gray-100 text-gray-800"
// // // //     }
// // // //   }

// // // //   const getMealTypeColor = (type) => {
// // // //     return type === "VEG MEAL" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
// // // //   }

// // // //   return (
// // // //     <div className="space-y-6">
// // // //       <Card>
// // // //         <CardHeader>
// // // //           <div className="flex justify-between items-center">
// // // //             <div>
// // // //               <CardTitle className="flex items-center space-x-2 text-green-700">
// // // //                 <UtensilsCrossed className="w-5 h-5" />
// // // //                 <span>Stay Fit Meal Plans Management</span>
// // // //               </CardTitle>
// // // //               <CardDescription>Manage detailed meal plans for fitness maintenance</CardDescription>
// // // //             </div>
// // // //             <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
// // // //               <DialogTrigger asChild>
// // // //                 <Button onClick={() => resetForm()} className="bg-green-600 hover:bg-green-700">
// // // //                   <Plus className="w-4 h-4 mr-2" />
// // // //                   Add Meal Plan
// // // //                 </Button>
// // // //               </DialogTrigger>
// // // //               <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
// // // //                 <DialogHeader>
// // // //                   <DialogTitle>{editingMeal ? "Edit Meal Plan" : "Add New Meal Plan"}</DialogTitle>
// // // //                   <DialogDescription>
// // // //                     {editingMeal ? "Update meal plan information" : "Create a new stay fit meal plan"}
// // // //                   </DialogDescription>
// // // //                 </DialogHeader>
// // // //                 <form onSubmit={handleSubmit}>
// // // //                   <div className="grid gap-4 py-4">
// // // //                     <div className="grid grid-cols-3 gap-4">
// // // //                       <div className="space-y-2">
// // // //                         <Label htmlFor="day">Day</Label>
// // // //                         <select
// // // //                           id="day"
// // // //                           value={formData.day}
// // // //                           onChange={(e) => setFormData({ ...formData, day: e.target.value })}
// // // //                           className="w-full p-2 border border-gray-300 rounded-md"
// // // //                           required
// // // //                         >
// // // //                           <option value="DAY - 1">Day 1</option>
// // // //                           <option value="DAY - 2">Day 2</option>
// // // //                           <option value="DAY - 3">Day 3</option>
// // // //                           <option value="DAY - 4">Day 4</option>
// // // //                           <option value="DAY - 5">Day 5</option>
// // // //                           <option value="DAY - 6">Day 6</option>
// // // //                           <option value="DAY - 7">Day 7</option>
// // // //                         </select>
// // // //                       </div>
// // // //                       <div className="space-y-2">
// // // //                         <Label htmlFor="mealType">Meal Type</Label>
// // // //                         <select
// // // //                           id="mealType"
// // // //                           value={formData.mealType}
// // // //                           onChange={(e) =>
// // // //                             setFormData({ ...formData, mealType: e.target.value })
// // // //                           }
// // // //                           className="w-full p-2 border border-gray-300 rounded-md"
// // // //                           required
// // // //                         >
// // // //                           <option value="VEG MEAL">Vegetarian</option>
// // // //                           <option value="NON-VEG MEAL">Non-Vegetarian</option>
// // // //                         </select>
// // // //                       </div>
// // // //                       <div className="space-y-2">
// // // //                         <Label htmlFor="mealTime">Meal Time</Label>
// // // //                         <select
// // // //                           id="mealTime"
// // // //                           value={formData.mealTime}
// // // //                           onChange={(e) =>
// // // //                             setFormData({ ...formData, mealTime: e.target.value })
// // // //                           }
// // // //                           className="w-full p-2 border border-gray-300 rounded-md"
// // // //                           required
// // // //                         >
// // // //                           <option value="Lunch">Lunch</option>
// // // //                           <option value="Dinner">Dinner</option>
// // // //                         </select>
// // // //                       </div>
// // // //                     </div>

// // // //                     {/* Add Meal Items Section */}
// // // //                     <div className="border-t pt-4">
// // // //                       <h4 className="text-lg font-medium mb-4">Add Meal Items</h4>
// // // //                       <div className="grid grid-cols-2 gap-4 mb-4">
// // // //                         <div className="space-y-2">
// // // //                           <Label htmlFor="course">Course</Label>
// // // //                           <select
// // // //                             id="course"
// // // //                             value={itemFormData.course}
// // // //                             onChange={(e) =>
// // // //                               setItemFormData({ ...itemFormData, course: e.target.value })
// // // //                             }
// // // //                             className="w-full p-2 border border-gray-300 rounded-md"
// // // //                           >
// // // //                             <option value="Starter">Starter</option>
// // // //                             <option value="Main">Main</option>
// // // //                             <option value="Salad">Salad</option>
// // // //                           </select>
// // // //                         </div>
// // // //                         <div className="space-y-2">
// // // //                           <Label htmlFor="item">Item Name</Label>
// // // //                           <Input
// // // //                             id="item"
// // // //                             value={itemFormData.item}
// // // //                             onChange={(e) => setItemFormData({ ...itemFormData, item: e.target.value })}
// // // //                             placeholder="Steamed Veg Momos"
// // // //                           />
// // // //                         </div>
// // // //                       </div>

// // // //                       <div className="grid grid-cols-4 gap-4 mb-4">
// // // //                         <div className="space-y-2">
// // // //                           <Label htmlFor="calories">Calories</Label>
// // // //                           <Input
// // // //                             id="calories"
// // // //                             type="number"
// // // //                             value={itemFormData.calories}
// // // //                             onChange={(e) =>
// // // //                               setItemFormData({ ...itemFormData, calories: parseInt(e.target.value) })
// // // //                             }
// // // //                             placeholder="180"
// // // //                           />
// // // //                         </div>
// // // //                         <div className="space-y-2">
// // // //                           <Label htmlFor="protein">Protein (g)</Label>
// // // //                           <Input
// // // //                             id="protein"
// // // //                             type="number"
// // // //                             value={itemFormData.protein}
// // // //                             onChange={(e) =>
// // // //                               setItemFormData({ ...itemFormData, protein: parseInt(e.target.value) })
// // // //                             }
// // // //                             placeholder="6"
// // // //                           />
// // // //                         </div>
// // // //                         <div className="space-y-2">
// // // //                           <Label htmlFor="carbs">Carbs (g)</Label>
// // // //                           <Input
// // // //                             id="carbs"
// // // //                             type="number"
// // // //                             value={itemFormData.carbs}
// // // //                             onChange={(e) =>
// // // //                               setItemFormData({ ...itemFormData, carbs: parseInt(e.target.value) })
// // // //                             }
// // // //                             placeholder="24"
// // // //                           />
// // // //                         </div>
// // // //                         <div className="space-y-2">
// // // //                           <Label htmlFor="fat">Fat (g)</Label>
// // // //                           <Input
// // // //                             id="fat"
// // // //                             type="number"
// // // //                             value={itemFormData.fat}
// // // //                             onChange={(e) => setItemFormData({ ...itemFormData, fat: parseInt(e.target.value) })}
// // // //                             placeholder="4"
// // // //                           />
// // // //                         </div>
// // // //                       </div>

// // // //                       <div className="grid grid-cols-2 gap-4 mb-4">
// // // //                         <div className="space-y-2">
// // // //                           <Label htmlFor="ingredients">Ingredients</Label>
// // // //                           <Textarea
// // // //                             id="ingredients"
// // // //                             value={itemFormData.ingredients}
// // // //                             onChange={(e) => setItemFormData({ ...itemFormData, ingredients: e.target.value })}
// // // //                             placeholder="Cabbage – 40g, carrot – 30g..."
// // // //                           />
// // // //                         </div>
// // // //                         <div className="space-y-2">
// // // //                           <Label htmlFor="benefits">Benefits</Label>
// // // //                           <Textarea
// // // //                             id="benefits"
// // // //                             value={itemFormData.benefits}
// // // //                             onChange={(e) => setItemFormData({ ...itemFormData, benefits: e.target.value })}
// // // //                             placeholder="Low-fat starter; good fiber..."
// // // //                           />
// // // //                         </div>
// // // //                       </div>

// // // //                       <Button type="button" onClick={addItemToMeal} variant="outline" className="mb-4 bg-transparent">
// // // //                         <Plus className="w-4 h-4 mr-2" />
// // // //                         Add Item to Meal
// // // //                       </Button>

// // // //                       {/* Display Added Items */}
// // // //                       {formData.items.length > 0 && (
// // // //                         <div className="space-y-2">
// // // //                           <h5 className="font-medium">Added Items:</h5>
// // // //                           {formData.items.map((item, index) => (
// // // //                             <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
// // // //                               <span>
// // // //                                 {item.course}: {item.item} ({item.calories} kcal)
// // // //                               </span>
// // // //                               <Button
// // // //                                 type="button"
// // // //                                 variant="destructive"
// // // //                                 size="sm"
// // // //                                 onClick={() => removeItemFromMeal(index)}
// // // //                               >
// // // //                                 <Trash2 className="w-4 h-4" />
// // // //                               </Button>
// // // //                             </div>
// // // //                           ))}
// // // //                         </div>
// // // //                       )}
// // // //                     </div>
// // // //                   </div>
// // // //                   <DialogFooter>
// // // //                     <Button type="button" variant="outline" onClick={resetForm}>
// // // //                       Cancel
// // // //                     </Button>
// // // //                     <Button type="submit" className="bg-green-600 hover:bg-green-700">
// // // //                       {editingMeal ? "Update" : "Add"} Meal Plan
// // // //                     </Button>
// // // //                   </DialogFooter>
// // // //                 </form>
// // // //               </DialogContent>
// // // //             </Dialog>
// // // //           </div>
// // // //         </CardHeader>
// // // //         <CardContent>
// // // //           <Tabs value={selectedTab} onValueChange={setSelectedTab}>
// // // //             <TabsList>
// // // //               <TabsTrigger value="meals">Meal Plans</TabsTrigger>
// // // //               <TabsTrigger value="analytics">Analytics</TabsTrigger>
// // // //             </TabsList>

// // // //             <TabsContent value="meals">
// // // //               <Table>
// // // //                 <TableHeader>
// // // //                   <TableRow>
// // // //                     <TableHead>Day</TableHead>
// // // //                     <TableHead>Type</TableHead>
// // // //                     <TableHead>Meal Time</TableHead>
// // // //                     <TableHead>Items Count</TableHead>
// // // //                     <TableHead>Total Calories</TableHead>
// // // //                     <TableHead className="text-right">Actions</TableHead>
// // // //                   </TableRow>
// // // //                 </TableHeader>
// // // //                 <TableBody>
// // // //                   {meals.map((meal) => (
// // // //                     <TableRow key={meal.id}>
// // // //                       <TableCell className="font-medium">{meal.day}</TableCell>
// // // //                       <TableCell>
// // // //                         <Badge className={getMealTypeColor(meal.mealType)}>
// // // //                           {meal.mealType.replace("MEAL", "").trim()}
// // // //                         </Badge>
// // // //                       </TableCell>
// // // //                       <TableCell>{meal.mealTime}</TableCell>
// // // //                       <TableCell>{meal.items.length} items</TableCell>
// // // //                       <TableCell>{meal.items.reduce((total, item) => total + item.calories, 0)} kcal</TableCell>
// // // //                       <TableCell className="text-right">
// // // //                         <div className="flex justify-end space-x-2">
// // // //                           <Button variant="outline" size="sm" onClick={() => handleEdit(meal)}>
// // // //                             <Edit className="w-4 h-4" />
// // // //                           </Button>
// // // //                           <Button variant="destructive" size="sm" onClick={() => handleDelete(meal.id)}>
// // // //                             <Trash2 className="w-4 h-4" />
// // // //                           </Button>
// // // //                         </div>
// // // //                       </TableCell>
// // // //                     </TableRow>
// // // //                   ))}
// // // //                 </TableBody>
// // // //               </Table>
// // // //             </TabsContent>

// // // //             <TabsContent value="analytics">
// // // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // //                 <Card>
// // // //                   <CardHeader>
// // // //                     <CardTitle className="text-sm">Total Meal Plans</CardTitle>
// // // //                   </CardHeader>
// // // //                   <CardContent>
// // // //                     <div className="text-2xl font-bold text-green-600">{meals.length}</div>
// // // //                   </CardContent>
// // // //                 </Card>
// // // //                 <Card>
// // // //                   <CardHeader>
// // // //                     <CardTitle className="text-sm">Vegetarian Plans</CardTitle>
// // // //                   </CardHeader>
// // // //                   <CardContent>
// // // //                     <div className="text-2xl font-bold text-green-600">
// // // //                       {meals.filter((m) => m.mealType === "VEG MEAL").length}
// // // //                     </div>
// // // //                   </CardContent>
// // // //                 </Card>
// // // //                 <Card>
// // // //                   <CardHeader>
// // // //                     <CardTitle className="text-sm">Non-Veg Plans</CardTitle>
// // // //                   </CardHeader>
// // // //                   <CardContent>
// // // //                     <div className="text-2xl font-bold text-orange-600">
// // // //                       {meals.filter((m) => m.mealType === "NON-VEG MEAL").length}
// // // //                     </div>
// // // //                   </CardContent>
// // // //                 </Card>
// // // //               </div>
// // // //             </TabsContent>
// // // //           </Tabs>
// // // //         </CardContent>
// // // //       </Card>
// // // //     </div>
// // // //   )
// // // // }

// // // "use client"

// // // import { useState, useEffect } from "react"
// // // import { Button } from "../components/ui/button"
// // // import { Input } from "../components/ui/input"
// // // import { Label } from "../components/ui/label"
// // // import { Textarea } from "../components/ui/textarea"
// // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
// // // import {
// // //   Dialog,
// // //   DialogContent,
// // //   DialogDescription,
// // //   DialogFooter,
// // //   DialogHeader,
// // //   DialogTitle,
// // //   DialogTrigger,
// // // } from "../components/ui/dialog"
// // // import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
// // // import { Badge } from "../components/ui/badge"
// // // import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
// // // import { Plus, Edit, Trash2, UtensilsCrossed } from "lucide-react"

// // // const API_URL = "http://localhost:5001/api/meals" // <-- Change this to your API base URL

// // // // Helper API functions
// // // async function fetchMeals() {
// // //   const res = await fetch(API_URL)
// // //   if (!res.ok) throw new Error("Failed to fetch meals")
// // //   return res.json()
// // // }

// // // async function createMealApi(meal) {
// // //   const res = await fetch(API_URL, {
// // //     method: "POST",
// // //     headers: { "Content-Type": "application/json" },
// // //     body: JSON.stringify(meal),
// // //   })
// // //   if (!res.ok) throw new Error("Failed to create meal")
// // //   return res.json()
// // // }

// // // async function updateMealApi(id, meal) {
// // //   const res = await fetch(`${API_URL}/${id}`, {
// // //     method: "PUT",
// // //     headers: { "Content-Type": "application/json" },
// // //     body: JSON.stringify(meal),
// // //   })
// // //   if (!res.ok) throw new Error("Failed to update meal")
// // //   return res.json()
// // // }

// // // async function deleteMealApi(id) {
// // //   const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" })
// // //   if (!res.ok) throw new Error("Failed to delete meal")
// // // }

// // // export default function StayFitMealManager() {
// // //   const [meals, setMeals] = useState([])
// // //   const [isDialogOpen, setIsDialogOpen] = useState(false)
// // //   const [editingMeal, setEditingMeal] = useState(null)
// // //   const [selectedTab, setSelectedTab] = useState("meals")

// // //   const [formData, setFormData] = useState({
// // //     day: "DAY - 1",
// // //     mealType: "VEG MEAL",
// // //     mealTime: "Lunch",
// // //     items: [],
// // //   })

// // //   const [itemFormData, setItemFormData] = useState({
// // //     course: "Starter",
// // //     item: "",
// // //     calories: 0,
// // //     protein: 0,
// // //     carbs: 0,
// // //     fat: 0,
// // //     ingredients: "",
// // //     benefits: "",
// // //   })

// // //   // Load meals from API on mount
// // //   useEffect(() => {
// // //     async function loadMeals() {
// // //       try {
// // //         const apiMeals = await fetchMeals()
// // //         // Map _id to id for React usage
// // //         const mappedMeals = apiMeals.map((meal) => ({
// // //           ...meal,
// // //           id: meal._id,
// // //         }))
// // //         setMeals(mappedMeals)
// // //       } catch (error) {
// // //         console.error("Error loading meals:", error)
// // //       }
// // //     }
// // //     loadMeals()
// // //   }, [])

// // //   const resetForm = () => {
// // //     setFormData({
// // //       day: "DAY - 1",
// // //       mealType: "VEG MEAL",
// // //       mealTime: "Lunch",
// // //       items: [],
// // //     })
// // //     setItemFormData({
// // //       course: "Starter",
// // //       item: "",
// // //       calories: 0,
// // //       protein: 0,
// // //       carbs: 0,
// // //       fat: 0,
// // //       ingredients: "",
// // //       benefits: "",
// // //     })
// // //     setEditingMeal(null)
// // //     setIsDialogOpen(false)
// // //   }

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault()

// // //     // Assign IDs for new items if missing (use item.id if editing)
// // //     const mealWithIds = {
// // //       ...formData,
// // //       items: formData.items.map((item, index) => ({
// // //         ...item,
// // //         id: item.id || Date.now().toString() + index,
// // //       })),
// // //     }

// // //     try {
// // //       let updatedMeal
// // //       if (editingMeal) {
// // //         updatedMeal = await updateMealApi(editingMeal.id, mealWithIds)
// // //         setMeals(meals.map((meal) => (meal.id === editingMeal.id ? { ...updatedMeal, id: updatedMeal._id } : meal)))
// // //       } else {
// // //         updatedMeal = await createMealApi(mealWithIds)
// // //         setMeals([...meals, { ...updatedMeal, id: updatedMeal._id }])
// // //       }
// // //       resetForm()
// // //     } catch (error) {
// // //       console.error("Error saving meal plan:", error)
// // //     }
// // //   }

// // //   const handleEdit = (meal) => {
// // //     setEditingMeal(meal)
// // //     // Remove id from items to avoid duplication on submit (MongoDB _id stays on meal only)
// // //     setFormData({
// // //       day: meal.day,
// // //       mealType: meal.mealType,
// // //       mealTime: meal.mealTime,
// // //       items: meal.items.map(({ id, _id, ...rest }) => rest),
// // //     })
// // //     setIsDialogOpen(true)
// // //   }

// // //   const handleDelete = async (id) => {
// // //     try {
// // //       await deleteMealApi(id)
// // //       setMeals(meals.filter((meal) => meal.id !== id))
// // //     } catch (error) {
// // //       console.error("Error deleting meal plan:", error)
// // //     }
// // //   }

// // //   const addItemToMeal = () => {
// // //     setFormData({
// // //       ...formData,
// // //       items: [...formData.items, itemFormData],
// // //     })
// // //     setItemFormData({
// // //       course: "Starter",
// // //       item: "",
// // //       calories: 0,
// // //       protein: 0,
// // //       carbs: 0,
// // //       fat: 0,
// // //       ingredients: "",
// // //       benefits: "",
// // //     })
// // //   }

// // //   const removeItemFromMeal = (index) => {
// // //     setFormData({
// // //       ...formData,
// // //       items: formData.items.filter((_, i) => i !== index),
// // //     })
// // //   }

// // //   const getCourseColor = (course) => {
// // //     switch (course) {
// // //       case "Starter":
// // //         return "bg-green-100 text-green-800"
// // //       case "Main":
// // //         return "bg-blue-100 text-blue-800"
// // //       case "Salad":
// // //         return "bg-purple-100 text-purple-800"
// // //       default:
// // //         return "bg-gray-100 text-gray-800"
// // //     }
// // //   }

// // //   const getMealTypeColor = (type) => {
// // //     return type === "VEG MEAL" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
// // //   }

// // //   return (
// // //     <div className="space-y-6">
// // //       <Card>
// // //         <CardHeader>
// // //           <div className="flex justify-between items-center">
// // //             <div>
// // //               <CardTitle className="flex items-center space-x-2 text-green-700">
// // //                 <UtensilsCrossed className="w-5 h-5" />
// // //                 <span>Stay Fit Meal Plans Management</span>
// // //               </CardTitle>
// // //               <CardDescription>Manage detailed meal plans for fitness maintenance</CardDescription>
// // //             </div>
// // //             <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
// // //               <DialogTrigger asChild>
// // //                 <Button onClick={resetForm} className="bg-green-600 hover:bg-green-700">
// // //                   <Plus className="w-4 h-4 mr-2" />
// // //                   Add Meal Plan
// // //                 </Button>
// // //               </DialogTrigger>
// // //               <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
// // //                 <DialogHeader>
// // //                   <DialogTitle>{editingMeal ? "Edit Meal Plan" : "Add New Meal Plan"}</DialogTitle>
// // //                   <DialogDescription>
// // //                     {editingMeal ? "Update meal plan information" : "Create a new stay fit meal plan"}
// // //                   </DialogDescription>
// // //                 </DialogHeader>
// // //                 <form onSubmit={handleSubmit}>
// // //                   <div className="grid gap-4 py-4">
// // //                     <div className="grid grid-cols-3 gap-4">
// // //                       <div className="space-y-2">
// // //                         <Label htmlFor="day">Day</Label>
// // //                         <select
// // //                           id="day"
// // //                           value={formData.day}
// // //                           onChange={(e) => setFormData({ ...formData, day: e.target.value })}
// // //                           className="w-full p-2 border border-gray-300 rounded-md"
// // //                           required
// // //                         >
// // //                           <option value="DAY - 1">Day 1</option>
// // //                           <option value="DAY - 2">Day 2</option>
// // //                           <option value="DAY - 3">Day 3</option>
// // //                           <option value="DAY - 4">Day 4</option>
// // //                           <option value="DAY - 5">Day 5</option>
// // //                           <option value="DAY - 6">Day 6</option>
// // //                           <option value="DAY - 7">Day 7</option>
// // //                         </select>
// // //                       </div>
// // //                       <div className="space-y-2">
// // //                         <Label htmlFor="mealType">Meal Type</Label>
// // //                         <select
// // //                           id="mealType"
// // //                           value={formData.mealType}
// // //                           onChange={(e) => setFormData({ ...formData, mealType: e.target.value })}
// // //                           className="w-full p-2 border border-gray-300 rounded-md"
// // //                           required
// // //                         >
// // //                           <option value="VEG MEAL">Vegetarian</option>
// // //                           <option value="NON-VEG MEAL">Non-Vegetarian</option>
// // //                         </select>
// // //                       </div>
// // //                       <div className="space-y-2">
// // //                         <Label htmlFor="mealTime">Meal Time</Label>
// // //                         <select
// // //                           id="mealTime"
// // //                           value={formData.mealTime}
// // //                           onChange={(e) => setFormData({ ...formData, mealTime: e.target.value })}
// // //                           className="w-full p-2 border border-gray-300 rounded-md"
// // //                           required
// // //                         >
// // //                           <option value="Lunch">Lunch</option>
// // //                           <option value="Dinner">Dinner</option>
// // //                         </select>
// // //                       </div>
// // //                     </div>

// // //                     {/* Add Meal Items Section */}
// // //                     <div className="border-t pt-4">
// // //                       <h4 className="text-lg font-medium mb-4">Add Meal Items</h4>
// // //                       <div className="grid grid-cols-2 gap-4 mb-4">
// // //                         <div className="space-y-2">
// // //                           <Label htmlFor="course">Course</Label>
// // //                           <select
// // //                             id="course"
// // //                             value={itemFormData.course}
// // //                             onChange={(e) =>
// // //                               setItemFormData({ ...itemFormData, course: e.target.value })
// // //                             }
// // //                             className="w-full p-2 border border-gray-300 rounded-md"
// // //                           >
// // //                             <option value="Starter">Starter</option>
// // //                             <option value="Main">Main</option>
// // //                             <option value="Salad">Salad</option>
// // //                           </select>
// // //                         </div>
// // //                         <div className="space-y-2">
// // //                           <Label htmlFor="item">Item Name</Label>
// // //                           <Input
// // //                             id="item"
// // //                             value={itemFormData.item}
// // //                             onChange={(e) => setItemFormData({ ...itemFormData, item: e.target.value })}
// // //                             placeholder="Steamed Veg Momos"
// // //                           />
// // //                         </div>
// // //                       </div>

// // //                       <div className="grid grid-cols-4 gap-4 mb-4">
// // //                         <div className="space-y-2">
// // //                           <Label htmlFor="calories">Calories</Label>
// // //                           <Input
// // //                             id="calories"
// // //                             type="number"
// // //                             min={0}
// // //                             value={itemFormData.calories}
// // //                             onChange={(e) =>
// // //                               setItemFormData({ ...itemFormData, calories: parseInt(e.target.value) || 0 })
// // //                             }
// // //                             placeholder="180"
// // //                           />
// // //                         </div>
// // //                         <div className="space-y-2">
// // //                           <Label htmlFor="protein">Protein (g)</Label>
// // //                           <Input
// // //                             id="protein"
// // //                             type="number"
// // //                             min={0}
// // //                             value={itemFormData.protein}
// // //                             onChange={(e) =>
// // //                               setItemFormData({ ...itemFormData, protein: parseInt(e.target.value) || 0 })
// // //                             }
// // //                             placeholder="6"
// // //                           />
// // //                         </div>
// // //                         <div className="space-y-2">
// // //                           <Label htmlFor="carbs">Carbs (g)</Label>
// // //                           <Input
// // //                             id="carbs"
// // //                             type="number"
// // //                             min={0}
// // //                             value={itemFormData.carbs}
// // //                             onChange={(e) =>
// // //                               setItemFormData({ ...itemFormData, carbs: parseInt(e.target.value) || 0 })
// // //                             }
// // //                             placeholder="24"
// // //                           />
// // //                         </div>
// // //                         <div className="space-y-2">
// // //                           <Label htmlFor="fat">Fat (g)</Label>
// // //                           <Input
// // //                             id="fat"
// // //                             type="number"
// // //                             min={0}
// // //                             value={itemFormData.fat}
// // //                             onChange={(e) =>
// // //                               setItemFormData({ ...itemFormData, fat: parseInt(e.target.value) || 0 })
// // //                             }
// // //                             placeholder="4"
// // //                           />
// // //                         </div>
// // //                       </div>

// // //                       <div className="grid grid-cols-2 gap-4 mb-4">
// // //                         <div className="space-y-2">
// // //                           <Label htmlFor="ingredients">Ingredients</Label>
// // //                           <Textarea
// // //                             id="ingredients"
// // //                             value={itemFormData.ingredients}
// // //                             onChange={(e) => setItemFormData({ ...itemFormData, ingredients: e.target.value })}
// // //                             placeholder="Cabbage – 40g, carrot – 30g..."
// // //                           />
// // //                         </div>
// // //                         <div className="space-y-2">
// // //                           <Label htmlFor="benefits">Benefits</Label>
// // //                           <Textarea
// // //                             id="benefits"
// // //                             value={itemFormData.benefits}
// // //                             onChange={(e) => setItemFormData({ ...itemFormData, benefits: e.target.value })}
// // //                             placeholder="Low-fat starter; good fiber..."
// // //                           />
// // //                         </div>
// // //                       </div>

// // //                       <Button type="button" onClick={addItemToMeal} variant="outline" className="mb-4 bg-transparent" disabled={!itemFormData.item.trim()}>
// // //                         <Plus className="w-4 h-4 mr-2" />
// // //                         Add Item to Meal
// // //                       </Button>

// // //                       {/* Display Added Items */}
// // //                       {formData.items.length > 0 && (
// // //                         <div className="space-y-2">
// // //                           <h5 className="font-medium">Added Items:</h5>
// // //                           {formData.items.map((item, index) => (
// // //                             <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
// // //                               <span>
// // //                                 {item.course}: {item.item} ({item.calories} kcal)
// // //                               </span>
// // //                               <Button
// // //                                 type="button"
// // //                                 variant="destructive"
// // //                                 size="sm"
// // //                                 onClick={() => removeItemFromMeal(index)}
// // //                               >
// // //                                 <Trash2 className="w-4 h-4" />
// // //                               </Button>
// // //                             </div>
// // //                           ))}
// // //                         </div>
// // //                       )}
// // //                     </div>
// // //                   </div>
// // //                   <DialogFooter>
// // //                     <Button type="button" variant="outline" onClick={resetForm}>
// // //                       Cancel
// // //                     </Button>
// // //                     <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={formData.items.length === 0}>
// // //                       {editingMeal ? "Update" : "Add"} Meal Plan
// // //                     </Button>
// // //                   </DialogFooter>
// // //                 </form>
// // //               </DialogContent>
// // //             </Dialog>
// // //           </div>
// // //         </CardHeader>
// // //         <CardContent>
// // //           <Tabs value={selectedTab} onValueChange={setSelectedTab}>
// // //             <TabsList>
// // //               <TabsTrigger value="meals">Meal Plans</TabsTrigger>
// // //               <TabsTrigger value="analytics">Analytics</TabsTrigger>
// // //             </TabsList>

// // //             <TabsContent value="meals">
// // //               <Table>
// // //                 <TableHeader>
// // //                   <TableRow>
// // //                     <TableHead>Day</TableHead>
// // //                     <TableHead>Type</TableHead>
// // //                     <TableHead>Meal Time</TableHead>
// // //                     <TableHead>Items Count</TableHead>
// // //                     <TableHead>Total Calories</TableHead>
// // //                     <TableHead className="text-right">Actions</TableHead>
// // //                   </TableRow>
// // //                 </TableHeader>
// // //                 <TableBody>
// // //                   {meals.map((meal) => (
// // //                     <TableRow key={meal.id}>
// // //                       <TableCell className="font-medium">{meal.day}</TableCell>
// // //                       <TableCell>
// // //                         <Badge className={getMealTypeColor(meal.mealType)}>
// // //                           {meal.mealType.replace("MEAL", "").trim()}
// // //                         </Badge>
// // //                       </TableCell>
// // //                       <TableCell>{meal.mealTime}</TableCell>
// // //                       <TableCell>{meal.items.length} items</TableCell>
// // //                       <TableCell>{meal.items.reduce((total, item) => total + item.calories, 0)} kcal</TableCell>
// // //                       <TableCell className="text-right">
// // //                         <div className="flex justify-end space-x-2">
// // //                           <Button variant="outline" size="sm" onClick={() => handleEdit(meal)}>
// // //                             <Edit className="w-4 h-4" />
// // //                           </Button>
// // //                           <Button variant="destructive" size="sm" onClick={() => handleDelete(meal.id)}>
// // //                             <Trash2 className="w-4 h-4" />
// // //                           </Button>
// // //                         </div>
// // //                       </TableCell>
// // //                     </TableRow>
// // //                   ))}
// // //                 </TableBody>
// // //               </Table>
// // //             </TabsContent>

// // //             <TabsContent value="analytics">
// // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // //                 <Card>
// // //                   <CardHeader>
// // //                     <CardTitle className="text-sm">Total Meal Plans</CardTitle>
// // //                   </CardHeader>
// // //                   <CardContent>
// // //                     <div className="text-2xl font-bold text-green-600">{meals.length}</div>
// // //                   </CardContent>
// // //                 </Card>
// // //                 <Card>
// // //                   <CardHeader>
// // //                     <CardTitle className="text-sm">Vegetarian Plans</CardTitle>
// // //                   </CardHeader>
// // //                   <CardContent>
// // //                     <div className="text-2xl font-bold text-green-600">
// // //                       {meals.filter((m) => m.mealType === "VEG MEAL").length}
// // //                     </div>
// // //                   </CardContent>
// // //                 </Card>
// // //                 <Card>
// // //                   <CardHeader>
// // //                     <CardTitle className="text-sm">Non-Veg Plans</CardTitle>
// // //                   </CardHeader>
// // //                   <CardContent>
// // //                     <div className="text-2xl font-bold text-orange-600">
// // //                       {meals.filter((m) => m.mealType === "NON-VEG MEAL").length}
// // //                     </div>
// // //                   </CardContent>
// // //                 </Card>
// // //               </div>
// // //             </TabsContent>
// // //           </Tabs>
// // //         </CardContent>
// // //       </Card>
// // //     </div>
// // //   )
// // // }
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // const apiUrl = 'http://localhost:5001/api/mealplan'; // Replace PORT with your backend port

// // const defaultMealItem = {
// //   Course: '',
// //   Item: '',
// //   Calories: '',
// //   Protein: '',
// //   Carbs: '',
// //   Fat: '',
// //   Ingredients: '',
// //   Benefits: '',
// // };

// // const defaultMeal = { Lunch: [defaultMealItem], Dinner: [defaultMealItem] };

// // function CollapsibleMealItem({ idx, item, onChange, onRemove, mealType, isVeg }) {
// //   const [open, setOpen] = useState(false);

// //   const handleChange = (field, value) => {
// //     onChange(idx, field, value);
// //   };

// //   return (
// //     <div
// //       style={{
// //         border: '1px solid #ccc',
// //         borderRadius: '6px',
// //         padding: '10px',
// //         marginBottom: '10px',
// //         backgroundColor: '#f9f9f9',
// //       }}
// //     >
// //       <div
// //         onClick={() => setOpen(!open)}
// //         style={{
// //           cursor: 'pointer',
// //           fontWeight: 'bold',
// //           marginBottom: open ? 10 : 0,
// //           display: 'flex',
// //           justifyContent: 'space-between',
// //           alignItems: 'center',
// //           userSelect: 'none',
// //         }}
// //         aria-expanded={open}
// //         aria-controls={`${mealType}-${isVeg ? 'veg' : 'nonveg'}-item-${idx}`}>
// //         <span>
// //           {item.Course || 'Course'} - {item.Item || 'Item'}
// //         </span>
// //         <button
// //           type="button"
// //           aria-label={`Remove ${mealType} item`}
// //           onClick={(e) => {
// //             e.stopPropagation();
// //             onRemove(idx);
// //           }}
// //           style={{
// //             backgroundColor: '#e74c3c',
// //             border: 'none',
// //             color: 'white',
// //             borderRadius: '4px',
// //             padding: '2px 6px',
// //             cursor: 'pointer',
// //             fontWeight: '600',
// //           }}>
// //           &times;
// //         </button>
// //       </div>
// //       {open && (
// //         <div style={{ marginTop: 8 }}>
// //           {[
// //             { label: 'Course', field: 'Course' },
// //             { label: 'Item', field: 'Item' },
// //             { label: 'Calories', field: 'Calories' },
// //             { label: 'Protein', field: 'Protein' },
// //             { label: 'Carbs', field: 'Carbs' },
// //             { label: 'Fat', field: 'Fat' },
// //             { label: 'Ingredients', field: 'Ingredients' },
// //             { label: 'Benefits', field: 'Benefits' },
// //           ].map(({ label, field }) => (
// //             <div key={field} style={{ marginBottom: 6 }}>
// //               <label style={{ fontWeight: '600' }}>{label}:</label>
// //               <input
// //                 type="text"
// //                 value={item[field]}
// //                 onChange={(e) => handleChange(field, e.target.value)}
// //                 style={{
// //                   width: '100%',
// //                   padding: '6px 8px',
// //                   marginTop: '4px',
// //                   borderRadius: '4px',
// //                   border: '1px solid #ccc',
// //                 }}
// //                 placeholder={`Enter ${label}`}
// //               />
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // function MealPlanAdmin() {
// //   const [mealPlans, setMealPlans] = useState([]);
// //   const [day, setDay] = useState('');
// //   const [vegMeal, setVegMeal] = useState(defaultMeal);
// //   const [nonVegMeal, setNonVegMeal] = useState(defaultMeal);
// //   const [editMode, setEditMode] = useState(false);
// //   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     fetchMealPlans();
// //   }, []);

// //   const fetchMealPlans = async () => {
// //     setLoading(true);
// //     try {
// //       const res = await axios.get(apiUrl);
// //       setMealPlans(res.data);
// //     } catch (err) {
// //       alert('Error fetching meal plans: ' + err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleMealItemChange = (setter, mealKey, idx, field, value) => {
// //     setter((prev) => {
// //       const updatedArray = [...prev[mealKey]];
// //       updatedArray[idx] = { ...updatedArray[idx], [field]: value };
// //       return { ...prev, [mealKey]: updatedArray };
// //     });
// //   };

// //   const addMealItem = (setter, mealKey) => {
// //     setter((prev) => ({ ...prev, [mealKey]: [...prev[mealKey], defaultMealItem] }));
// //   };

// //   const removeMealItem = (setter, mealKey, idx) => {
// //     setter((prev) => {
// //       const updated = [...prev[mealKey]];
// //       updated.splice(idx, 1);
// //       return { ...prev, [mealKey]: updated.length > 0 ? updated : [defaultMealItem] };
// //     });
// //   };

// //   const resetForm = () => {
// //     setDay('');
// //     setVegMeal(defaultMeal);
// //     setNonVegMeal(defaultMeal);
// //     setEditMode(false);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!day.trim()) {
// //       alert('Please enter a valid day.');
// //       return;
// //     }
// //     setLoading(true);
// //     try {
// //       if (editMode) {
// //         await axios.put(`${apiUrl}/${day}`, { vegMeal, nonVegMeal });
// //         alert('Meal plan updated successfully!');
// //       } else {
// //         await axios.post(apiUrl, { day, vegMeal, nonVegMeal });
// //         alert('Meal plan created successfully!');
// //       }
// //       resetForm();
// //       await fetchMealPlans();
// //     } catch (err) {
// //       alert('Error saving meal plan: ' + (err.response?.data?.error || err.message));
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleEdit = (plan) => {
// //     setDay(plan.day);
// //     setVegMeal(plan.vegMeal || defaultMeal);
// //     setNonVegMeal(plan.nonVegMeal || defaultMeal);
// //     setEditMode(true);
// //   };

// //   const handleDelete = async (dayToDelete) => {
// //     if (!window.confirm(`Are you sure you want to delete the meal plan for "${dayToDelete}"?`)) return;
// //     setLoading(true);
// //     try {
// //       await axios.delete(`${apiUrl}/${dayToDelete}`);
// //       alert('Deleted successfully');
// //       if (dayToDelete === day) resetForm();
// //       await fetchMealPlans();
// //     } catch (err) {
// //       alert('Error deleting meal plan: ' + err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div style={{ maxWidth: 900, margin: '30px auto', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
// //       <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>Meal Plan Admin Panel</h1>
// //       <form
// //         onSubmit={handleSubmit}
// //         style={{
// //           backgroundColor: '#fff',
// //           padding: '20px',
// //           borderRadius: '8px',
// //           boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
// //           marginBottom: 30,
// //         }}>
// //         <h2 style={{ marginBottom: 12 }}>{editMode ? 'Edit Meal Plan' : 'Add New Meal Plan'}</h2>
// //         <div style={{ marginBottom: 20 }}>
// //           <label htmlFor="day" style={{ fontWeight: '700' }}>
// //             Day:
// //           </label>
// //           <input
// //             id="day"
// //             type="text"
// //             value={day}
// //             disabled={editMode}
// //             onChange={(e) => setDay(e.target.value)}
// //             placeholder="e.g. Monday"
// //             required
// //             style={{
// //               width: '100%',
// //               padding: '10px',
// //               marginTop: '6px',
// //               borderRadius: '6px',
// //               border: '1px solid #ccc',
// //               fontSize: '1rem',
// //             }}
// //           />
// //         </div>

// //         {[
// //           { title: 'Vegetarian Meal', mealState: vegMeal, setter: setVegMeal, isVeg: true },
// //           { title: 'Non-Vegetarian Meal', mealState: nonVegMeal, setter: setNonVegMeal, isVeg: false },
// //         ].map(({ title, mealState, setter, isVeg }) => (
// //           <section
// //             key={title}
// //             style={{
// //               marginBottom: 30,
// //               backgroundColor: '#f7f9fc',
// //               padding: '15px 20px',
// //               borderRadius: '8px',
// //               boxShadow: 'inset 0 0 5px #ddd',
// //             }}>
// //             <h3 style={{ color: isVeg ? '#27ae60' : '#c0392b', marginBottom: 12 }}>{title}</h3>
// //             {['Lunch', 'Dinner'].map((mealType) => (
// //               <div key={mealType} style={{ marginBottom: 20 }}>
// //                 <h4 style={{ marginBottom: 8, color: '#34495e' }}>
// //                   {mealType}
// //                   <button
// //                     type="button"
// //                     onClick={() => addMealItem(setter, mealType)}
// //                     style={{
// //                       marginLeft: 15,
// //                       color: '#2980b9',
// //                       background: 'none',
// //                       border: 'none',
// //                       cursor: 'pointer',
// //                       fontWeight: '700',
// //                       fontSize: '1.1rem',
// //                       userSelect: 'none',
// //                     }}
// //                     aria-label={`Add ${mealType} item`}>
// //                     ＋ Add Item
// //                   </button>
// //                 </h4>
// //                 {mealState[mealType].map((item, index) => (
// //                   <CollapsibleMealItem
// //                     key={`${mealType}-${isVeg ? 'veg' : 'nonveg'}-${index}`}
// //                     idx={index}
// //                     item={item}
// //                     onChange={(i, field, value) => handleMealItemChange(setter, mealType, i, field, value)}
// //                     onRemove={(i) => removeMealItem(setter, mealType, i)}
// //                     mealType={mealType}
// //                     isVeg={isVeg}
// //                   />
// //                 ))}
// //               </div>
// //             ))}
// //           </section>
// //         ))}

// //         <button
// //           type="submit"
// //           disabled={loading}
// //           style={{
// //             backgroundColor: '#2980b9',
// //             color: 'white',
// //             padding: '12px 24px',
// //             borderRadius: '6px',
// //             fontSize: '1rem',
// //             cursor: loading ? 'not-allowed' : 'pointer',
// //             border: 'none',
// //             marginRight: '15px',
// //           }}>
// //           {editMode ? (loading ? 'Updating...' : 'Update Meal Plan') : loading ? 'Creating...' : 'Create Meal Plan'}
// //         </button>
// //         {editMode && (
// //           <button
// //             type="button"
// //             onClick={resetForm}
// //             disabled={loading}
// //             style={{
// //               backgroundColor: '#7f8c8d',
// //               color: 'white',
// //               padding: '12px 24px',
// //               borderRadius: '6px',
// //               fontSize: '1rem',
// //               cursor: loading ? 'not-allowed' : 'pointer',
// //               border: 'none',
// //             }}>
// //             Cancel
// //           </button>
// //         )}
// //       </form>

// //       <h2 style={{ marginBottom: 15, textAlign: 'center', color: '#2c3e50' }}>
// //         {loading ? 'Loading Meal Plans...' : 'Existing Meal Plans'}
// //       </h2>
// //       {!loading && (
// //         <table
// //           style={{
// //             width: '100%',
// //             borderCollapse: 'collapse',
// //             boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
// //           }}
// //         >
// //           <thead style={{ backgroundColor: '#2980b9', color: 'white' }}>
// //             <tr>
// //               <th style={{ padding: '12px' }}>Day</th>
// //               <th style={{ padding: '12px' }}>Veg Lunch</th>
// //               <th style={{ padding: '12px' }}>Veg Dinner</th>
// //               <th style={{ padding: '12px' }}>NonVeg Lunch</th>
// //               <th style={{ padding: '12px' }}>NonVeg Dinner</th>
// //               <th style={{ padding: '12px' }}>Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {mealPlans.length > 0 ? (
// //               mealPlans.map((plan) => (
// //                 <tr
// //                   key={plan.day}
// //                   style={{
// //                     borderBottom: '1px solid #ddd',
// //                     backgroundColor: plan.day === day && editMode ? '#d6f5d6' : 'white',
// //                   }}
// //                 >
// //                   <td style={{ padding: '10px', fontWeight: '700' }}>{plan.day}</td>
// //                   <td style={{ padding: '10px' }}>
// //                     {plan.vegMeal?.Lunch?.map((i) => i.Item).filter(Boolean).join(', ') || 'N/A'}
// //                   </td>
// //                   <td style={{ padding: '10px' }}>
// //                     {plan.vegMeal?.Dinner?.map((i) => i.Item).filter(Boolean).join(', ') || 'N/A'}
// //                   </td>
// //                   <td style={{ padding: '10px' }}>
// //                     {plan.nonVegMeal?.Lunch?.map((i) => i.Item).filter(Boolean).join(', ') || 'N/A'}
// //                   </td>
// //                   <td style={{ padding: '10px' }}>
// //                     {plan.nonVegMeal?.Dinner?.map((i) => i.Item).filter(Boolean).join(', ') || 'N/A'}
// //                   </td>
// //                   <td style={{ padding: '10px' }}>
// //                     <button
// //                       onClick={() => handleEdit(plan)}
// //                       style={{
// //                         backgroundColor: '#27ae60',
// //                         border: 'none',
// //                         color: 'white',
// //                         padding: '6px 12px',
// //                         borderRadius: '4px',
// //                         cursor: 'pointer',
// //                         marginRight: '8px',
// //                       }}
// //                       aria-label={`Edit meal plan for ${plan.day}`}
// //                     >
// //                       Edit
// //                     </button>
// //                     <button
// //                       onClick={() => handleDelete(plan.day)}
// //                       style={{
// //                         backgroundColor: '#c0392b',
// //                         border: 'none',
// //                         color: 'white',
// //                         padding: '6px 12px',
// //                         borderRadius: '4px',
// //                         cursor: 'pointer',
// //                       }}
// //                       aria-label={`Delete meal plan for ${plan.day}`}
// //                     >
// //                       Delete
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))
// //             ) : (
// //               <tr>
// //                 <td colSpan="6" style={{ padding: '15px', textAlign: 'center', fontStyle: 'italic' }}>
// //                   No meal plans found.
// //                 </td>
// //               </tr>
// //             )}
// //           </tbody>
// //         </table>
// //       )}
// //     </div>
// //   );
// // }

// // export default MealPlanAdmin;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// // Backend API URL
// const apiUrl = 'http://localhost:5001/api/mealplan';

// // Fixed list of days for dropdown selection
// const DAYS = [
//   'Monday',
//   'Tuesday',
//   'Wednesday',
//   'Thursday',
//   'Friday',
//   'Saturday',
//   'Sunday',
// ];

// // Default empty meal item
// const defaultMealItem = {
//   Course: '',
//   Item: '',
//   Calories: '',
//   Protein: '',
//   Carbs: '',
//   Fat: '',
//   Ingredients: '',
//   Benefits: '',
// };

// // Default meal structure with one empty item in Lunch and Dinner
// const defaultMeal = { Lunch: [defaultMealItem], Dinner: [defaultMealItem] };

// // Collapsible meal item for editing individual meal entries
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
//         padding: 10,
//         marginBottom: 10,
//         backgroundColor: '#f9f9f9',
//       }}
//     >
//       <div
//         onClick={() => setOpen(!open)}
//         style={{
//           cursor: 'pointer',
//           fontWeight: 'bold',
//           marginBottom: open ? 10 : 0,
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           userSelect: 'none',
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
//             padding: '2px 6px',
//             cursor: 'pointer',
//             fontWeight: '600',
//           }}
//         >
//           &times;
//         </button>
//       </div>
//       {open && (
//         <div style={{ marginTop: 8 }}>
//           {[
//             { label: 'Course', field: 'Course' },
//             { label: 'Item', field: 'Item' },
//             { label: 'Calories', field: 'Calories' },
//             { label: 'Protein', field: 'Protein' },
//             { label: 'Carbs', field: 'Carbs' },
//             { label: 'Fat', field: 'Fat' },
//             { label: 'Ingredients', field: 'Ingredients' },
//             { label: 'Benefits', field: 'Benefits' },
//           ].map(({ label, field }) => (
//             <div key={field} style={{ marginBottom: 6 }}>
//               <label style={{ fontWeight: '600' }}>{label}:</label>
//               <input
//                 type="text"
//                 value={item[field]}
//                 onChange={(e) => handleChange(field, e.target.value)}
//                 style={{
//                   width: '100%',
//                   padding: '6px 8px',
//                   marginTop: 4,
//                   borderRadius: 4,
//                   border: '1px solid #ccc',
//                 }}
//                 placeholder={`Enter ${label}`}
//               />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // Modal component for adding new meal items
// function Modal({ isOpen, onClose, onAdd }) {
//   const [mealCategory, setMealCategory] = useState('Vegetarian'); // Veg or NonVeg
//   const [mealTime, setMealTime] = useState('Lunch');             // Lunch or Dinner
//   const [course, setCourse] = useState('Main');                   // Course type

//   const [itemData, setItemData] = useState({
//     Item: '',
//     Calories: '',
//     Protein: '',
//     Carbs: '',
//     Fat: '',
//     Ingredients: '',
//     Benefits: '',
//   });

//   // Reset form data when modal is opened
//   useEffect(() => {
//     if (isOpen) {
//       setMealCategory('Vegetarian');
//       setMealTime('Lunch');
//       setCourse('Main');
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
//     setItemData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Basic required validation: Item name is required
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
//         backgroundColor: 'rgba(0,0,0,0.5)',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         zIndex: 1000,
//       }}
//       onClick={onClose}
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         style={{
//           backgroundColor: 'white',
//           borderRadius: 8,
//           maxWidth: 450,
//           width: '90%',
//           padding: 20,
//           boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
//           maxHeight: '90vh',
//           overflowY: 'auto',
//         }}
//       >
//         <h2 id="modal-title" style={{ marginBottom: 16, fontSize: '1.25rem' }}>Add New Meal Item</h2>
//         <form onSubmit={handleSubmit}>
//           <div style={{ marginBottom: 12 }}>
//             <label htmlFor="mealCategory" style={{ display: 'block', fontWeight: '600', marginBottom: 4 }}>Meal Category:</label>
//             <select
//               id="mealCategory"
//               value={mealCategory}
//               onChange={e => setMealCategory(e.target.value)}
//               required
//               style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
//             >
//               <option value="Vegetarian">Vegetarian</option>
//               <option value="Non-Vegetarian">Non-Vegetarian</option>
//             </select>
//           </div>

//           <div style={{ marginBottom: 12 }}>
//             <label htmlFor="mealTime" style={{ display: 'block', fontWeight: '600', marginBottom: 4 }}>Meal Time:</label>
//             <select
//               id="mealTime"
//               value={mealTime}
//               onChange={e => setMealTime(e.target.value)}
//               required
//               style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
//             >
//               <option value="Lunch">Lunch</option>
//               <option value="Dinner">Dinner</option>
//             </select>
//           </div>

//           <div style={{ marginBottom: 12 }}>
//             <label htmlFor="course" style={{ display: 'block', fontWeight: '600', marginBottom: 4 }}>Course:</label>
//             <select
//               id="course"
//               value={course}
//               onChange={e => setCourse(e.target.value)}
//               required
//               style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
//             >
//               <option value="Main">Main</option>
//               <option value="Starter">Starter</option>
//               <option value="Salad">Salad</option>
//             </select>
//           </div>

//           {['Item', 'Calories', 'Protein', 'Carbs', 'Fat', 'Ingredients', 'Benefits'].map(field => (
//             <div key={field} style={{ marginBottom: 12 }}>
//               <label htmlFor={field} style={{ display: 'block', fontWeight: '600', marginBottom: 4 }}>{field}:</label>
//               <input
//                 id={field}
//                 type="text"
//                 value={itemData[field]}
//                 onChange={e => handleInputChange(field, e.target.value)}
//                 placeholder={`Enter ${field}`}
//                 required={field === 'Item'}
//                 style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
//               />
//             </div>
//           ))}

//           <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
//             <button
//               type="button"
//               onClick={onClose}
//               style={{
//                 backgroundColor: '#ccc',
//                 border: 'none',
//                 padding: '8px 16px',
//                 borderRadius: 4,
//                 cursor: 'pointer',
//               }}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               style={{
//                 backgroundColor: '#2980b9',
//                 color: 'white',
//                 border: 'none',
//                 padding: '8px 16px',
//                 borderRadius: 4,
//                 cursor: 'pointer',
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

//   // Add new meal item from modal to the appropriate meal array state
//   const addMealItemToState = (category, mealTime, newItem) => {
//     if (category === 'Vegetarian') {
//       setVegMeal(prev => {
//         const updatedItems = [...prev[mealTime], newItem];
//         return { ...prev, [mealTime]: updatedItems };
//       });
//     } else {
//       setNonVegMeal(prev => {
//         const updatedItems = [...prev[mealTime], newItem];
//         return { ...prev, [mealTime]: updatedItems };
//       });
//     }
//   };

//   const addMealItem = (setter, mealKey) => {
//     setter((prev) => ({ ...prev, [mealKey]: [...prev[mealKey], defaultMealItem] }));
//   };

//   const removeMealItem = (setter, mealKey, idx) => {
//     setter((prev) => {
//       const updated = [...prev[mealKey]];
//       updated.splice(idx, 1);
//       return { ...prev, [mealKey]: updated.length > 0 ? updated : [defaultMealItem] };
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
//       <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>Meal Plan Admin Panel</h1>

//       {/* Add button to open modal */}
//       <div style={{ textAlign: 'right', marginBottom: 12 }}>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           style={{
//             backgroundColor: '#27ae60',
//             color: 'white',
//             border: 'none',
//             padding: '10px 20px',
//             borderRadius: 6,
//             cursor: 'pointer',
//             fontWeight: '700',
//           }}
//           aria-label="Add new meal item"
//         >
//           + Add Meal Item
//         </button>
//       </div>

//       {/* Modal */}
//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onAdd={addMealItemToState}
//       />

//       {/* Day selection dropdown */}
//       <form
//         onSubmit={handleSubmit}
//         style={{
//           backgroundColor: '#fff',
//           padding: 20,
//           borderRadius: 8,
//           boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
//           marginBottom: 30,
//         }}
//       >
//         <h2 style={{ marginBottom: 12 }}>{editMode ? 'Edit Meal Plan' : 'Add New Meal Plan'}</h2>

//         <div style={{ marginBottom: 20 }}>
//           <label htmlFor="day" style={{ fontWeight: '700' }}>
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
//               padding: 10,
//               marginTop: 6,
//               borderRadius: 6,
//               border: '1px solid #ccc',
//               fontSize: '1rem',
//             }}
//           >
//             <option value="">Select Day</option>
//             {DAYS.map(d => (
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
//               marginBottom: 30,
//               backgroundColor: '#f7f9fc',
//               padding: '15px 20px',
//               borderRadius: 8,
//               boxShadow: 'inset 0 0 5px #ddd',
//             }}
//           >
//             <h3 style={{ color: isVeg ? '#27ae60' : '#c0392b', marginBottom: 12 }}>{title}</h3>
//             {['Lunch', 'Dinner'].map(mealType => (
//               <div key={mealType} style={{ marginBottom: 20 }}>
//                 <h4 style={{ marginBottom: 8, color: '#34495e' }}>
//                   {mealType}
//                   <button
//                     type="button"
//                     onClick={() => addMealItem(setter, mealType)}
//                     style={{
//                       marginLeft: 15,
//                       color: '#2980b9',
//                       background: 'none',
//                       border: 'none',
//                       cursor: 'pointer',
//                       fontWeight: '700',
//                       fontSize: '1.1rem',
//                       userSelect: 'none',
//                     }}
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
//             padding: '12px 24px',
//             borderRadius: 6,
//             fontSize: '1rem',
//             cursor: loading ? 'not-allowed' : 'pointer',
//             border: 'none',
//             marginRight: 15,
//           }}
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
//               padding: '12px 24px',
//               borderRadius: 6,
//               fontSize: '1rem',
//               cursor: loading ? 'not-allowed' : 'pointer',
//               border: 'none',
//             }}
//           >
//             Cancel
//           </button>
//         )}
//       </form>

//       <h2 style={{ marginBottom: 15, textAlign: 'center', color: '#2c3e50' }}>
//         {loading ? 'Loading Meal Plans...' : 'Existing Meal Plans'}
//       </h2>

//       {!loading && (
//         <table
//           style={{
//             width: '100%',
//             borderCollapse: 'collapse',
//             boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//           }}
//         >
//           <thead style={{ backgroundColor: '#2980b9', color: 'white' }}>
//             <tr>
//               <th style={{ padding: 12 }}>Day</th>
//               <th style={{ padding: 12 }}>Veg Lunch</th>
//               <th style={{ padding: 12 }}>Veg Dinner</th>
//               <th style={{ padding: 12 }}>NonVeg Lunch</th>
//               <th style={{ padding: 12 }}>NonVeg Dinner</th>
//               <th style={{ padding: 12 }}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {mealPlans.length > 0 ? (
//               mealPlans.map(plan => (
//                 <tr
//                   key={plan.day}
//                   style={{
//                     borderBottom: '1px solid #ddd',
//                     backgroundColor: plan.day === day && editMode ? '#d6f5d6' : 'white',
//                   }}
//                 >
//                   <td style={{ padding: 10, fontWeight: '700' }}>{plan.day}</td>
//                   <td style={{ padding: 10 }}>{plan.vegMeal?.Lunch?.map(i => i.Item).filter(Boolean).join(', ') || 'N/A'}</td>
//                   <td style={{ padding: 10 }}>{plan.vegMeal?.Dinner?.map(i => i.Item).filter(Boolean).join(', ') || 'N/A'}</td>
//                   <td style={{ padding: 10 }}>{plan.nonVegMeal?.Lunch?.map(i => i.Item).filter(Boolean).join(', ') || 'N/A'}</td>
//                   <td style={{ padding: 10 }}>{plan.nonVegMeal?.Dinner?.map(i => i.Item).filter(Boolean).join(', ') || 'N/A'}</td>
//                   <td style={{ padding: 10 }}>
//                     <button
//                       onClick={() => handleEdit(plan)}
//                       style={{
//                         backgroundColor: '#27ae60',
//                         border: 'none',
//                         color: 'white',
//                         padding: '6px 12px',
//                         borderRadius: 4,
//                         cursor: 'pointer',
//                         marginRight: 8,
//                       }}
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
//                         padding: '6px 12px',
//                         borderRadius: 4,
//                         cursor: 'pointer',
//                       }}
//                       aria-label={`Delete meal plan for ${plan.day}`}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={6} style={{ padding: 15, textAlign: 'center', fontStyle: 'italic' }}>
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
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: 6,
        padding: 12,
        marginBottom: 12,
        backgroundColor: '#fdfdfd',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      }}
    >
      <div
        onClick={() => setOpen(!open)}
        style={{
          cursor: 'pointer',
          fontWeight: 600,
          marginBottom: open ? 12 : 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          userSelect: 'none',
          fontSize: 16,
          color: '#222',
        }}
        aria-expanded={open}
        aria-controls={`${mealType}-${isVeg ? 'veg' : 'nonveg'}-item-${idx}`}
      >
        <span>{item.Course || 'Course'} - {item.Item || 'Item'}</span>
        <button
          type="button"
          aria-label={`Remove ${mealType} item`}
          onClick={(e) => {
            e.stopPropagation();
            onRemove(idx);
          }}
          style={{
            backgroundColor: '#e74c3c',
            border: 'none',
            color: 'white',
            borderRadius: 4,
            padding: '4px 8px',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: 16,
            lineHeight: 1,
          }}
        >
          &times;
        </button>
      </div>

      {open && (
        <div style={{ marginTop: 10, fontSize: 14, color: '#444' }}>
          {/* Course Dropdown */}
          <div style={{ marginBottom: 10 }}>
            <label htmlFor={`course-${mealType}-${idx}`} style={{ fontWeight: 600, display: 'block', marginBottom: 4 }}>
              Course:
            </label>
            <select
              id={`course-${mealType}-${idx}`}
              value={item.Course}
              onChange={(e) => handleChange('Course', e.target.value)}
              style={{
                width: '100%',
                padding: 8,
                borderRadius: 4,
                border: '1px solid #ccc',
                fontSize: 14,
                appearance: 'none',
                cursor: 'pointer',
                backgroundColor: 'white',
              }}
            >
              {COURSE_OPTIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {['Item', 'Calories', 'Protein', 'Carbs', 'Fat', 'Ingredients', 'Benefits'].map((field) => (
            <div key={field} style={{ marginBottom: 10 }}>
              <label style={{ fontWeight: 600, display: 'block', marginBottom: 4 }}>{field}:</label>
              <input
                type="text"
                value={item[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                placeholder={`Enter ${field}`}
                style={{
                  width: '100%',
                  padding: 8,
                  borderRadius: 4,
                  border: '1px solid #ccc',
                  fontSize: 14,
                  boxSizing: 'border-box',
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Modal({ isOpen, onClose, onAdd }) {
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

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex={-1}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.45)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2000,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'white',
          borderRadius: 8,
          maxWidth: 460,
          width: '90%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          padding: 24,
          fontSize: 14,
          color: '#333',
        }}
      >
        <h2 id="modal-title" style={{ marginBottom: 20, fontWeight: 700, fontSize: 22, color: '#2c3e50' }}>
          Add New Meal Item
        </h2>
        <form onSubmit={handleSubmit}>

          {/* Meal Category */}
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="mealCategory" style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>
              Meal Category:
            </label>
            <select
              id="mealCategory"
              value={mealCategory}
              onChange={(e) => setMealCategory(e.target.value)}
              required
              style={{
                width: '100%',
                padding: 10,
                fontSize: 14,
                borderRadius: 5,
                border: '1px solid #bbb',
                cursor: 'pointer',
                backgroundColor: 'white',
              }}
            >
              <option value="Vegetarian">Vegetarian</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
            </select>
          </div>

          {/* Meal Time */}
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="mealTime" style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>
              Meal Time:
            </label>
            <select
              id="mealTime"
              value={mealTime}
              onChange={(e) => setMealTime(e.target.value)}
              required
              style={{
                width: '100%',
                padding: 10,
                fontSize: 14,
                borderRadius: 5,
                border: '1px solid #bbb',
                cursor: 'pointer',
                backgroundColor: 'white',
              }}
            >
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
          </div>

          {/* Course */}
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="course" style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>
              Course:
            </label>
            <select
              id="course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
              style={{
                width: '100%',
                padding: 10,
                fontSize: 14,
                borderRadius: 5,
                border: '1px solid #bbb',
                cursor: 'pointer',
                backgroundColor: 'white',
              }}
            >
              {COURSE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Other Inputs */}
          {['Item', 'Calories', 'Protein', 'Carbs', 'Fat', 'Ingredients', 'Benefits'].map((field) => (
            <div key={field} style={{ marginBottom: 16 }}>
              <label htmlFor={field} style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>
                {field}:
              </label>
              <input
                id={field}
                type="text"
                value={itemData[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
                placeholder={`Enter ${field}`}
                required={field === 'Item'}
                style={{
                  width: '100%',
                  padding: 10,
                  fontSize: 14,
                  borderRadius: 5,
                  border: '1px solid #bbb',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          ))}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                backgroundColor: '#bbb',
                border: 'none',
                padding: '10px 18px',
                borderRadius: 6,
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                backgroundColor: '#27ae60',
                color: 'white',
                border: 'none',
                padding: '10px 18px',
                borderRadius: 6,
                cursor: 'pointer',
                fontWeight: 700,
              }}
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
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
    <div style={{ maxWidth: 900, margin: '30px auto', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: 20 }}>Meal Plan Admin Panel</h1>

      <div style={{ textAlign: 'right', marginBottom: 16 }}>
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            backgroundColor: '#27ae60',
            color: 'white',
            border: 'none',
            padding: '12px 28px',
            borderRadius: 6,
            cursor: 'pointer',
            fontWeight: '700',
            fontSize: 16,
            boxShadow: '0 2px 6px rgba(39,174,96,0.5)',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#219150'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#27ae60'}
          aria-label="Add new meal item"
        >
          + Add Meal Item
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={addMealItemToState} />

      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#fff',
          padding: 24,
          borderRadius: 8,
          boxShadow: '0 4px 18px rgba(0,0,0,0.1)',
          marginBottom: 40,
        }}
      >
        <h2 style={{ marginBottom: 18, fontWeight: '700', fontSize: 24, color: '#34495e' }}>
          {editMode ? 'Edit Meal Plan' : 'Add New Meal Plan'}
        </h2>

        <div style={{ marginBottom: 22 }}>
          <label htmlFor="day" style={{ fontWeight: 700, fontSize: 16 }}>
            Day:
          </label>
          <select
            id="day"
            value={day}
            disabled={editMode}
            onChange={e => setDay(e.target.value)}
            required
            style={{
              width: '100%',
              padding: 12,
              marginTop: 8,
              borderRadius: 6,
              border: '1.5px solid #aaa',
              fontSize: 16,
              cursor: 'pointer',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => e.currentTarget.style.borderColor = '#27ae60'}
            onBlur={e => e.currentTarget.style.borderColor = '#aaa'}
          >
            <option value="">Select Day</option>
            {DAYS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {[{ title: 'Vegetarian Meal', mealState: vegMeal, setter: setVegMeal, isVeg: true },
          { title: 'Non-Vegetarian Meal', mealState: nonVegMeal, setter: setNonVegMeal, isVeg: false }].map(({ title, mealState, setter, isVeg }) => (
          <section
            key={title}
            style={{
              marginBottom: 36,
              backgroundColor: '#fafafa',
              padding: '18px 28px',
              borderRadius: 10,
              boxShadow: 'inset 0 0 12px #ddd',
            }}
          >
            <h3 style={{ color: isVeg ? '#27ae60' : '#c0392b', marginBottom: 20, fontWeight: 700, fontSize: 20 }}>
              {title}
            </h3>
            {['Lunch', 'Dinner'].map(mealType => (
              <div key={mealType} style={{ marginBottom: 26 }}>
                <h4 style={{ marginBottom: 12, color: '#34495e', fontWeight: 600, fontSize: 18 }}>
                  {mealType}
                  <button
                    type="button"
                    onClick={() => addMealItem(setter, mealType)}
                    style={{
                      marginLeft: 12,
                      color: '#2980b9',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: '700',
                      fontSize: 20,
                      userSelect: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseOver={e => e.currentTarget.style.color = '#1c5980'}
                    onMouseOut={e => e.currentTarget.style.color = '#2980b9'}
                    aria-label={`Add ${mealType} item`}
                  >
                    ＋ Add Item
                  </button>
                </h4>
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
          </section>
        ))}

        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: '#2980b9',
            color: 'white',
            padding: '14px 36px',
            borderRadius: 8,
            fontSize: 18,
            fontWeight: '700',
            cursor: loading ? 'not-allowed' : 'pointer',
            border: 'none',
            marginRight: 20,
            boxShadow: '0 3px 8px rgb(41 128 185 / 0.6)',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={e => !loading && (e.currentTarget.style.backgroundColor = '#1f6391')}
          onMouseOut={e => !loading && (e.currentTarget.style.backgroundColor = '#2980b9')}
        >
          {editMode ? (loading ? 'Updating...' : 'Update Meal Plan') : loading ? 'Creating...' : 'Create Meal Plan'}
        </button>
        {editMode && (
          <button
            type="button"
            onClick={resetForm}
            disabled={loading}
            style={{
              backgroundColor: '#7f8c8d',
              color: 'white',
              padding: '14px 36px',
              borderRadius: 8,
              fontSize: 18,
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              border: 'none',
              boxShadow: '0 3px 8px rgb(127 140 141 / 0.6)',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={e => !loading && (e.currentTarget.style.backgroundColor = '#626c6f')}
            onMouseOut={e => !loading && (e.currentTarget.style.backgroundColor = '#7f8c8d')}
          >
            Cancel
          </button>
        )}
      </form>

      <h2 style={{ marginBottom: 18, textAlign: 'center', color: '#2c3e50', fontSize: 22, fontWeight: 700 }}>
        {loading ? 'Loading Meal Plans...' : 'Existing Meal Plans'}
      </h2>

      {!loading && (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
          }}
          aria-label="Existing meal plans"
        >
          <thead style={{ backgroundColor: '#2980b9', color: 'white' }}>
            <tr>
              <th style={{ padding: 14, fontSize: 16 }}>Day</th>
              <th style={{ padding: 14, fontSize: 16 }}>Veg Lunch</th>
              <th style={{ padding: 14, fontSize: 16 }}>Veg Dinner</th>
              <th style={{ padding: 14, fontSize: 16 }}>NonVeg Lunch</th>
              <th style={{ padding: 14, fontSize: 16 }}>NonVeg Dinner</th>
              <th style={{ padding: 14, fontSize: 16 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mealPlans.length ? (
              mealPlans.map(plan => (
                <tr
                  key={plan.day}
                  style={{
                    borderBottom: '1px solid #d2d2d2',
                    backgroundColor: plan.day === day && editMode ? '#d6f5d6' : 'white',
                    fontSize: 15,
                  }}
                >
                  <td style={{ padding: 12, fontWeight: 700 }}>{plan.day}</td>
                  <td style={{ padding: 12 }}>{plan.vegMeal?.Lunch?.map(i => i.Item).filter(Boolean).join(', ') || 'N/A'}</td>
                  <td style={{ padding: 12 }}>{plan.vegMeal?.Dinner?.map(i => i.Item).filter(Boolean).join(', ') || 'N/A'}</td>
                  <td style={{ padding: 12 }}>{plan.nonVegMeal?.Lunch?.map(i => i.Item).filter(Boolean).join(', ') || 'N/A'}</td>
                  <td style={{ padding: 12 }}>{plan.nonVegMeal?.Dinner?.map(i => i.Item).filter(Boolean).join(', ') || 'N/A'}</td>
                  <td style={{ padding: 12 }}>
                    <button
                      onClick={() => handleEdit(plan)}
                      style={{
                        backgroundColor: '#27ae60',
                        border: 'none',
                        color: 'white',
                        padding: '8px 14px',
                        borderRadius: 6,
                        cursor: 'pointer',
                        marginRight: 8,
                        fontWeight: 600,
                        fontSize: 14,
                        transition: 'background-color 0.2s',
                      }}
                      onMouseOver={e => (e.currentTarget.style.backgroundColor = '#1f8a3e')}
                      onMouseOut={e => (e.currentTarget.style.backgroundColor = '#27ae60')}
                      aria-label={`Edit meal plan for ${plan.day}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(plan.day)}
                      style={{
                        backgroundColor: '#c0392b',
                        border: 'none',
                        color: 'white',
                        padding: '8px 14px',
                        borderRadius: 6,
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: 14,
                        transition: 'background-color 0.2s',
                      }}
                      onMouseOver={e => (e.currentTarget.style.backgroundColor = '#8f281e')}
                      onMouseOut={e => (e.currentTarget.style.backgroundColor = '#c0392b')}
                      aria-label={`Delete meal plan for ${plan.day}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ padding: 20, textAlign: 'center', fontStyle: 'italic', fontSize: 16 }}>
                  No meal plans found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MealPlanAdmin;
