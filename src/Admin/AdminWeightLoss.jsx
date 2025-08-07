
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardFooter,
// } from "../components/ui/card";
// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import { Label } from "../components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../components/ui/select";
// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
// } from "../components/ui/table";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "../components/ui/dialog";
// import {
//   Accordion,
//   AccordionItem,
//   AccordionTrigger,
//   AccordionContent,
// } from "../components/ui/accordion";
// import { Separator } from "../components/ui/separator";
// import { Badge } from "../components/ui/badge";
// import { useToast } from "../components/ui/use-toast";

// const apiUrl = 'http://localhost:5001/api/weight-loss-meals';

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
//   const handleChange = (field, value) => {
//     onChange(idx, field, value);
//   };

//   return (
//     <AccordionItem value={`item-${idx}`} className="border rounded-lg mb-4">
//       <AccordionTrigger className="px-4 py-3 hover:no-underline">
//         <div className="flex justify-between items-center w-full">
//           <span className="font-medium">
//             {item.Course || 'Course'} - {item.Item || 'Item'}
//           </span>
//           <Button
//             variant="destructive"
//             size="sm"
//             onClick={(e) => {
//               e.stopPropagation();
//               onRemove(idx);
//             }}
//             className="ml-2"
//           >
//             Remove
//           </Button>
//         </div>
//       </AccordionTrigger>
//       <AccordionContent className="p-4">
//         <div className="space-y-4">
//           <div>
//             <Label htmlFor={`course-${mealType}-${idx}`}>Course:</Label>
//             <Select
//               value={item.Course}
//               onValueChange={(value) => handleChange('Course', value)}
//             >
//               <SelectTrigger className="w-full mt-1">
//                 <SelectValue placeholder="Select course" />
//               </SelectTrigger>
//               <SelectContent>
//                 {COURSE_OPTIONS.map((c) => (
//                   <SelectItem key={c} value={c}>{c}</SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           {['Item', 'Calories', 'Protein', 'Carbs', 'Fat', 'Ingredients', 'Benefits'].map((field) => (
//             <div key={field} className="space-y-1">
//               <Label htmlFor={`${field}-${mealType}-${idx}`}>{field}:</Label>
//               <Input
//                 id={`${field}-${mealType}-${idx}`}
//                 type="text"
//                 value={item[field]}
//                 onChange={(e) => handleChange(field, e.target.value)}
//                 placeholder={`Enter ${field}`}
//               />
//             </div>
//           ))}
//         </div>
//       </AccordionContent>
//     </AccordionItem>
//   );
// }

// function AddMealItemModal({ isOpen, onClose, onAdd }) {
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

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[600px]">
//         <DialogHeader>
//           <DialogTitle>Add New Meal Item</DialogTitle>
//           <DialogDescription>
//             Fill in the details for the new meal item.
//           </DialogDescription>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="mealCategory">Meal Category:</Label>
//             <Select
//               value={mealCategory}
//               onValueChange={setMealCategory}
//               required
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Select category" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Vegetarian">Vegetarian</SelectItem>
//                 <SelectItem value="Non-Vegetarian">Non-Vegetarian</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="mealTime">Meal Time:</Label>
//             <Select
//               value={mealTime}
//               onValueChange={setMealTime}
//               required
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Select meal time" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Lunch">Lunch</SelectItem>
//                 <SelectItem value="Dinner">Dinner</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="course">Course:</Label>
//             <Select
//               value={course}
//               onValueChange={setCourse}
//               required
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Select course" />
//               </SelectTrigger>
//               <SelectContent>
//                 {COURSE_OPTIONS.map((opt) => (
//                   <SelectItem key={opt} value={opt}>
//                     {opt}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           {['Item', 'Calories', 'Protein', 'Carbs', 'Fat', 'Ingredients', 'Benefits'].map((field) => (
//             <div key={field} className="space-y-2">
//               <Label htmlFor={field}>{field}:</Label>
//               <Input
//                 id={field}
//                 type="text"
//                 value={itemData[field]}
//                 onChange={(e) => handleInputChange(field, e.target.value)}
//                 placeholder={`Enter ${field}`}
//                 required={field === 'Item'}
//               />
//             </div>
//           ))}

//           <DialogFooter>
//             <Button type="button" variant="outline" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button type="submit">Add Item</Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

// function AdminWeightLoss() {
//   const [mealPlans, setMealPlans] = useState([]);
//   const [day, setDay] = useState('');
//   const [vegMeal, setVegMeal] = useState(defaultMeal);
//   const [nonVegMeal, setNonVegMeal] = useState(defaultMeal);
//   const [editMode, setEditMode] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const { toast } = useToast();

//   useEffect(() => {
//     fetchMealPlans();
//   }, []);

//   const fetchMealPlans = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(apiUrl);
//       setMealPlans(res.data);
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: 'Error fetching meal plans: ' + err.message,
//         variant: "destructive",
//       });
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
//       toast({
//         title: "Validation Error",
//         description: 'Please select a valid day.',
//         variant: "destructive",
//       });
//       return;
//     }
//     setLoading(true);
//     try {
//       if (editMode) {
//         await axios.put(`${apiUrl}/${day}`, { vegMeal, nonVegMeal });
//         toast({
//           title: "Success",
//           description: 'Meal plan updated successfully!',
//         });
//       } else {
//         await axios.post(apiUrl, { day, vegMeal, nonVegMeal });
//         toast({
//           title: "Success",
//           description: 'Meal plan created successfully!',
//         });
//       }
//       resetForm();
//       await fetchMealPlans();
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: 'Error saving meal plan: ' + (err.response?.data?.error || err.message),
//         variant: "destructive",
//       });
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
//     if (!confirm(`Are you sure you want to delete the meal plan for "${dayToDelete}"?`)) return;
//     setLoading(true);
//     try {
//       await axios.delete(`${apiUrl}/${dayToDelete}`);
//       toast({
//         title: "Success",
//         description: 'Deleted successfully',
//       });
//       if (dayToDelete === day) resetForm();
//       await fetchMealPlans();
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: 'Error deleting meal plan: ' + err.message,
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <Card className="mb-8">
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold">Meal Plan Admin Panel</CardTitle>
//           <CardDescription>Manage weight loss meal plans for the week</CardDescription>
//         </CardHeader>
//       </Card>

//       <div className="flex justify-end mb-6">
//         <Button onClick={() => setIsModalOpen(true)}>
//           <PlusIcon className="mr-2 h-4 w-4" />
//           Add Meal Item
//         </Button>
//       </div>

//       <AddMealItemModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={addMealItemToState} />

//       <Card className="mb-8">
//         <CardHeader>
//           <CardTitle>{editMode ? 'Edit Meal Plan' : 'Add New Meal Plan'}</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="space-y-2">
//               <Label htmlFor="day">Day:</Label>
//               <Select
//                 value={day}
//                 disabled={editMode}
//                 onValueChange={setDay}
//                 required
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select day" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {DAYS.map((d) => (
//                     <SelectItem key={d} value={d}>
//                       {d}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             <Separator />

//             {[
//               { title: 'Vegetarian Meal', mealState: vegMeal, setter: setVegMeal, isVeg: true },
//               { title: 'Non-Vegetarian Meal', mealState: nonVegMeal, setter: setNonVegMeal, isVeg: false }
//             ].map(({ title, mealState, setter, isVeg }) => (
//               <Card key={title} className="mb-6">
//                 <CardHeader>
//                   <CardTitle className="flex items-center">
//                     <Badge variant={isVeg ? 'success' : 'destructive'} className="mr-2">
//                       {isVeg ? 'Veg' : 'Non-Veg'}
//                     </Badge>
//                     {title}
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <Accordion type="multiple" className="space-y-4">
//                     {['Lunch', 'Dinner'].map(mealType => (
//                       <div key={mealType} className="space-y-4">
//                         <div className="flex justify-between items-center">
//                           <h3 className="text-lg font-semibold">{mealType}</h3>
//                           <Button
//                             type="button"
//                             variant="outline"
//                             size="sm"
//                             onClick={() => addMealItem(setter, mealType)}
//                           >
//                             <PlusIcon className="mr-2 h-4 w-4" />
//                             Add Item
//                           </Button>
//                         </div>
//                         {mealState[mealType].map((item, index) => (
//                           <CollapsibleMealItem
//                             key={`${mealType}-${isVeg ? 'veg' : 'nonveg'}-${index}`}
//                             idx={index}
//                             item={item}
//                             onChange={(i, field, value) => handleMealItemChange(setter, mealType, i, field, value)}
//                             onRemove={i => removeMealItem(setter, mealType, i)}
//                             mealType={mealType}
//                             isVeg={isVeg}
//                           />
//                         ))}
//                       </div>
//                     ))}
//                   </Accordion>
//                 </CardContent>
//               </Card>
//             ))}

//             <div className="flex gap-4">
//               <Button type="submit" disabled={loading}>
//                 {editMode ? (loading ? 'Updating...' : 'Update Meal Plan') : loading ? 'Creating...' : 'Create Meal Plan'}
//               </Button>
//               {editMode && (
//                 <Button
//                   type="button"
//                   onClick={resetForm}
//                   disabled={loading}
//                   variant="outline"
//                 >
//                   Cancel
//                 </Button>
//               )}
//             </div>
//           </form>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Existing Meal Plans</CardTitle>
//           {loading && <CardDescription>Loading meal plans...</CardDescription>}
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Day</TableHead>
//                 <TableHead>Veg Lunch</TableHead>
//                 <TableHead>Veg Dinner</TableHead>
//                 <TableHead>NonVeg Lunch</TableHead>
//                 <TableHead>NonVeg Dinner</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {mealPlans.length ? (
//                 mealPlans.map(plan => (
//                   <TableRow
//                     key={plan.day}
//                     className={plan.day === day && editMode ? 'bg-green-50' : ''}
//                   >
//                     <TableCell className="font-medium">{plan.day}</TableCell>
//                     <TableCell>{plan.vegMeal?.Lunch?.map(i => i.Item).filter(Boolean).join(', ') || 'N/A'}</TableCell>
//                     <TableCell>{plan.vegMeal?.Dinner?.map(i => i.Item).filter(Boolean).join(', ') || 'N/A'}</TableCell>
//                     <TableCell>{plan.nonVegMeal?.Lunch?.map(i => i.Item).filter(Boolean).join(', ') || 'N/A'}</TableCell>
//                     <TableCell>{plan.nonVegMeal?.Dinner?.map(i => i.Item).filter(Boolean).join(', ') || 'N/A'}</TableCell>
//                     <TableCell>
//                       <div className="flex gap-2">
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => handleEdit(plan)}
//                         >
//                           Edit
//                         </Button>
//                         <Button
//                           variant="destructive"
//                           size="sm"
//                           onClick={() => handleDelete(plan.day)}
//                         >
//                           Delete
//                         </Button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
//                     No meal plans found.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// function PlusIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M5 12h14" />
//       <path d="M12 5v14" />
//     </svg>
//   )
// }

// export default AdminWeightLoss;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
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
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../components/ui/dialog";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/ui/accordion";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";

const apiUrl = 'http://localhost:5001/api/weight-loss-meals';

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
  const handleChange = (field, value) => {
    onChange(idx, field, value);
  };

  return (
    <AccordionItem value={`item-${idx}`} className="border rounded-lg mb-4">
      <AccordionTrigger className="px-4 py-3 hover:no-underline">
        <div className="flex justify-between items-center w-full">
          <span className="font-medium">
            {item.Course || 'Course'} - {item.Item || 'Item'}
          </span>
          <Button
            variant="destructive"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(idx);
            }}
            className="ml-2"
          >
            Remove
          </Button>
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-4">
        <div className="space-y-4">
          <div>
            <Label htmlFor={`course-${mealType}-${idx}`}>Course:</Label>
            <Select
              value={item.Course}
              onValueChange={(value) => handleChange('Course', value)}
            >
              <SelectTrigger className="w-full mt-1">
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
            <div key={field} className="space-y-1">
              <Label htmlFor={`${field}-${mealType}-${idx}`}>{field}:</Label>
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
      </AccordionContent>
    </AccordionItem>
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
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Meal Item</DialogTitle>
          <DialogDescription>
            Fill in the details for the new meal item.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mealCategory">Meal Category:</Label>
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

          <div className="space-y-2">
            <Label htmlFor="mealTime">Meal Time:</Label>
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

          <div className="space-y-2">
            <Label htmlFor="course">Course:</Label>
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
            <div key={field} className="space-y-2">
              <Label htmlFor={field}>{field}:</Label>
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

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Item</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function AdminWeightLoss() {
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
    if (!confirm(`Are you sure you want to delete the meal plan for "${dayToDelete}"?`)) return;
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
    <div className="max-w-6xl mx-auto p-6">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Meal Plan Admin Panel</CardTitle>
          <CardDescription>Manage weight loss meal plans for the week</CardDescription>
        </CardHeader>
      </Card>

      <div className="flex justify-end mb-6">
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Meal Item
        </Button>
      </div>

      <AddMealItemModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={addMealItemToState} />

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editMode ? 'Edit Meal Plan' : 'Add New Meal Plan'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="day">Day:</Label>
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

            <Separator />

            {[
              { title: 'Vegetarian Meal', mealState: vegMeal, setter: setVegMeal, isVeg: true },
              { title: 'Non-Vegetarian Meal', mealState: nonVegMeal, setter: setNonVegMeal, isVeg: false }
            ].map(({ title, mealState, setter, isVeg }) => (
              <Card key={title} className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Badge variant={isVeg ? 'success' : 'destructive'} className="mr-2">
                      {isVeg ? 'Veg' : 'Non-Veg'}
                    </Badge>
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="multiple" className="space-y-4">
                    {['Lunch', 'Dinner'].map(mealType => (
                      <div key={mealType} className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold">{mealType}</h3>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => addMealItem(setter, mealType)}
                          >
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add Item
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
                  </Accordion>
                </CardContent>
              </Card>
            ))}

            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                {editMode ? (loading ? 'Updating...' : 'Update Meal Plan') : loading ? 'Creating...' : 'Create Meal Plan'}
              </Button>
              {editMode && (
                <Button
                  type="button"
                  onClick={resetForm}
                  disabled={loading}
                  variant="outline"
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
                mealPlans.map(plan => (
                  <TableRow
                    key={plan.day}
                    className={plan.day === day && editMode ? 'bg-green-50' : ''}
                  >
                    <TableCell className="font-medium">{plan.day}</TableCell>
                    <TableCell>{plan.vegMeal?.Lunch?.map(i => i.Item).filter(Boolean).join(', ') || 'N/A'}</TableCell>
                    <TableCell>{plan.vegMeal?.Dinner?.map(i => i.Item).filter(Boolean).join(', ') || 'N/A'}</TableCell>
                    <TableCell>{plan.nonVegMeal?.Lunch?.map(i => i.Item).filter(Boolean).join(', ') || 'N/A'}</TableCell>
                    <TableCell>{plan.nonVegMeal?.Dinner?.map(i => i.Item).filter(Boolean).join(', ') || 'N/A'}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
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
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
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

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

export default AdminWeightLoss;