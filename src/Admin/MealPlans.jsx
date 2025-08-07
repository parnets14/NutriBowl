

// // import React, { useState } from "react"
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
// // import { Plus, Edit, Trash2, UtensilsCrossed } from "lucide-react"

// // const initialMealPlans = [
// //   {
// //     id: "1",
// //     name: "Weight Loss Starter",
// //     type: "weight-loss",
// //     description: "A balanced meal plan designed for sustainable weight loss",
// //     calories: 1200,
// //     duration: "4 weeks",
// //     price: 2999,
// //   },
// //   {
// //     id: "2",
// //     name: "Stay Fit Maintenance",
// //     type: "stay-fit",
// //     description: "Maintain your ideal weight with balanced nutrition",
// //     calories: 1800,
// //     duration: "4 weeks",
// //     price: 2499,
// //   },
// //   {
// //     id: "3",
// //     name: "Weight Gain Builder",
// //     type: "weight-gain",
// //     description: "Healthy weight gain with muscle building focus",
// //     calories: 2500,
// //     duration: "4 weeks",
// //     price: 3499,
// //   },
// // ]

// // export default function MealPlansManager() {
// //   const [mealPlans, setMealPlans] = useState(initialMealPlans)
// //   const [isDialogOpen, setIsDialogOpen] = useState(false)
// //   const [editingPlan, setEditingPlan] = useState(null)
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     type: "weight-loss",
// //     description: "",
// //     calories: 0,
// //     duration: "",
// //     price: 0,
// //   })

// //   const handleSubmit = (e) => {
// //     e.preventDefault()

// //     if (editingPlan) {
// //       setMealPlans(mealPlans.map((plan) => (plan.id === editingPlan.id ? { ...plan, ...formData } : plan)))
// //     } else {
// //       const newPlan = {
// //         id: Date.now().toString(),
// //         ...formData,
// //       }
// //       setMealPlans([...mealPlans, newPlan])
// //     }

// //     resetForm()
// //   }

// //   const handleEdit = (plan) => {
// //     setEditingPlan(plan)
// //     setFormData({
// //       name: plan.name,
// //       type: plan.type,
// //       description: plan.description,
// //       calories: plan.calories,
// //       duration: plan.duration,
// //       price: plan.price,
// //     })
// //     setIsDialogOpen(true)
// //   }

// //   const handleDelete = (id) => {
// //     setMealPlans(mealPlans.filter((plan) => plan.id !== id))
// //   }

// //   const resetForm = () => {
// //     setFormData({
// //       name: "",
// //       type: "weight-loss",
// //       description: "",
// //       calories: 0,
// //       duration: "",
// //       price: 0,
// //     })
// //     setEditingPlan(null)
// //     setIsDialogOpen(false)
// //   }

// //   const getTypeColor = (type) => {
// //     switch (type) {
// //       case "weight-loss":
// //         return "bg-blue-100 text-blue-800"
// //       case "weight-gain":
// //         return "bg-purple-100 text-purple-800"
// //       case "stay-fit":
// //         return "bg-green-100 text-green-800"
// //       default:
// //         return "bg-gray-100 text-gray-800"
// //     }
// //   }

// //   return (
// //     <Card>
// //       <CardHeader>
// //         <div className="flex justify-between items-center">
// //           <div>
// //             <CardTitle className="flex items-center space-x-2">
// //               <UtensilsCrossed className="w-5 h-5" />
// //               <span>Meal Plans Management</span>
// //             </CardTitle>
// //             <CardDescription>Manage nutrition meal plans and pricing</CardDescription>
// //           </div>
// //           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
// //             <DialogTrigger asChild>
// //               <Button onClick={() => resetForm()}>
// //                 <Plus className="w-4 h-4 mr-2" />
// //                 Add Meal Plan
// //               </Button>
// //             </DialogTrigger>
// //             <DialogContent className="sm:max-w-[425px]">
// //               <DialogHeader>
// //                 <DialogTitle>{editingPlan ? "Edit Meal Plan" : "Add New Meal Plan"}</DialogTitle>
// //                 <DialogDescription>
// //                   {editingPlan ? "Update meal plan information" : "Create a new nutrition meal plan"}
// //                 </DialogDescription>
// //               </DialogHeader>
// //               <form onSubmit={handleSubmit}>
// //                 <div className="grid gap-4 py-4">
// //                   <div className="space-y-2">
// //                     <Label htmlFor="name">Plan Name</Label>
// //                     <Input
// //                       id="name"
// //                       value={formData.name}
// //                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// //                       placeholder="Weight Loss Starter"
// //                       required
// //                     />
// //                   </div>
// //                   <div className="space-y-2">
// //                     <Label htmlFor="type">Plan Type</Label>
// //                     <select
// //                       id="type"
// //                       value={formData.type}
// //                       onChange={(e) => setFormData({ ...formData, type: e.target.value })}
// //                       className="w-full p-2 border border-gray-300 rounded-md"
// //                       required
// //                     >
// //                       <option value="weight-loss">Weight Loss</option>
// //                       <option value="weight-gain">Weight Gain</option>
// //                       <option value="stay-fit">Stay Fit</option>
// //                     </select>
// //                   </div>
// //                   <div className="space-y-2">
// //                     <Label htmlFor="description">Description</Label>
// //                     <Textarea
// //                       id="description"
// //                       value={formData.description}
// //                       onChange={(e) => setFormData({ ...formData, description: e.target.value })}
// //                       placeholder="Plan description..."
// //                       required
// //                     />
// //                   </div>
// //                   <div className="grid grid-cols-2 gap-4">
// //                     <div className="space-y-2">
// //                       <Label htmlFor="calories">Calories</Label>
// //                       <Input
// //                         id="calories"
// //                         type="number"
// //                         value={formData.calories}
// //                         onChange={(e) => setFormData({ ...formData, calories: Number.parseInt(e.target.value) })}
// //                         placeholder="1200"
// //                         required
// //                       />
// //                     </div>
// //                     <div className="space-y-2">
// //                       <Label htmlFor="price">Price (₹)</Label>
// //                       <Input
// //                         id="price"
// //                         type="number"
// //                         value={formData.price}
// //                         onChange={(e) => setFormData({ ...formData, price: Number.parseInt(e.target.value) })}
// //                         placeholder="2999"
// //                         required
// //                       />
// //                     </div>
// //                   </div>
// //                   <div className="space-y-2">
// //                     <Label htmlFor="duration">Duration</Label>
// //                     <Input
// //                       id="duration"
// //                       value={formData.duration}
// //                       onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
// //                       placeholder="4 weeks"
// //                       required
// //                     />
// //                   </div>
// //                 </div>
// //                 <DialogFooter>
// //                   <Button type="button" variant="outline" onClick={resetForm}>
// //                     Cancel
// //                   </Button>
// //                   <Button type="submit">{editingPlan ? "Update" : "Add"} Plan</Button>
// //                 </DialogFooter>
// //               </form>
// //             </DialogContent>
// //           </Dialog>
// //         </div>
// //       </CardHeader>
// //       <CardContent>
// //         <Table>
// //           <TableHeader>
// //             <TableRow>
// //               <TableHead>Plan Name</TableHead>
// //               <TableHead>Type</TableHead>
// //               <TableHead>Calories</TableHead>
// //               <TableHead>Duration</TableHead>
// //               <TableHead>Price</TableHead>
// //               <TableHead className="text-right">Actions</TableHead>
// //             </TableRow>
// //           </TableHeader>
// //           <TableBody>
// //             {mealPlans.map((plan) => (
// //               <TableRow key={plan.id}>
// //                 <TableCell className="font-medium">
// //                   <div>
// //                     <div>{plan.name}</div>
// //                     <div className="text-sm text-gray-500 truncate max-w-xs">{plan.description}</div>
// //                   </div>
// //                 </TableCell>
// //                 <TableCell>
// //                   <Badge className={getTypeColor(plan.type)}>{plan.type.replace("-", " ")}</Badge>
// //                 </TableCell>
// //                 <TableCell>{plan.calories} cal</TableCell>
// //                 <TableCell>{plan.duration}</TableCell>
// //                 <TableCell>₹{plan.price}</TableCell>
// //                 <TableCell className="text-right">
// //                   <div className="flex justify-end space-x-2">
// //                     <Button variant="outline" size="sm" onClick={() => handleEdit(plan)}>
// //                       <Edit className="w-4 h-4" />
// //                     </Button>
// //                     <Button variant="destructive" size="sm" onClick={() => handleDelete(plan.id)}>
// //                       <Trash2 className="w-4 h-4" />
// //                     </Button>
// //                   </div>
// //                 </TableCell>
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //         </Table>
// //       </CardContent>
// //     </Card>
// //   )
// // }
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API = "http://localhost:5001/api/plans";

// export default function PlanAdmin() {
//   const [plans, setPlans] = useState([]);
//   const [planType, setPlanType] = useState("weight-loss");
//   const [form, setForm] = useState({
//     planType: "weight-loss",
//     duration: "",
//     veg1Meal: "",
//     veg2Meal: "",
//     nonVeg1Meal: "",
//     nonVeg2Meal: "",
//   });
//   const [editingId, setEditingId] = useState(null);

//   // Fetch plans of current planType
//   useEffect(() => {
//     fetchPlans();
//     // eslint-disable-next-line
//   }, [planType]);

//   const fetchPlans = async () => {
//     try {
//       const res = await axios.get(`${API}/type/${planType}`);
//       setPlans(res.data);
//     } catch (err) {
//       alert("Failed to fetch plans: " + (err?.response?.data?.error || err.message));
//     }
//   };

//   const resetForm = () => {
//     setForm({
//       planType,
//       duration: "",
//       veg1Meal: "",
//       veg2Meal: "",
//       nonVeg1Meal: "",
//       nonVeg2Meal: "",
//     });
//     setEditingId(null);
//   };

//   const handleChange = e => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleTypeChange = e => {
//     setPlanType(e.target.value);
//     setForm({ ...form, planType: e.target.value });
//     setEditingId(null);
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       if (editingId) {
//         await axios.put(`${API}/${editingId}`, form);
//         setEditingId(null);
//       } else {
//         await axios.post(API, form);
//       }
//       resetForm();
//       fetchPlans();
//     } catch (err) {
//       alert("Error: " + (err?.response?.data?.error || err.message));
//     }
//   };

//   const handleEdit = plan => {
//     setEditingId(plan._id);
//     setForm({
//       planType: plan.planType,
//       duration: plan.duration,
//       veg1Meal: plan.veg1Meal,
//       veg2Meal: plan.veg2Meal,
//       nonVeg1Meal: plan.nonVeg1Meal,
//       nonVeg2Meal: plan.nonVeg2Meal,
//     });
//     setPlanType(plan.planType);
//   };

//   const handleDelete = async id => {
//     if (window.confirm("Delete this plan?")) {
//       try {
//         await axios.delete(`${API}/${id}`);
//         fetchPlans();
//       } catch (err) {
//         alert("Delete failed: " + (err?.response?.data?.error || err.message));
//       }
//     }
//   };

//   return (
//     <div style={{ padding: 40, fontFamily: "sans-serif", maxWidth: 900 }}>
//       <h2>Plans Admin Panel</h2>

//       {/* Select Plan Type */}
//       <div style={{ marginBottom: 20 }}>
//         <label>
//           <b>Select Plan Type: </b>
//           <select value={planType} onChange={handleTypeChange}>
//             <option value="weight-loss">Weight Loss</option>
//             <option value="weight-gain">Weight Gain</option>
//             <option value="stay-fit">Stay Fit</option>
//           </select>
//         </label>
//       </div>

//       {/* Form */}
//       <form onSubmit={handleSubmit} style={{ marginBottom: 24, background: "#f0f0f0", padding: 10, borderRadius: 5 }}>
//         <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
//           <input
//             type="text"
//             name="duration"
//             placeholder="Duration"
//             value={form.duration}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="veg1Meal"
//             placeholder="Veg 1 Meal"
//             value={form.veg1Meal}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="veg2Meal"
//             placeholder="Veg 2 Meal"
//             value={form.veg2Meal}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="nonVeg1Meal"
//             placeholder="NonVeg 1 Meal"
//             value={form.nonVeg1Meal}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="nonVeg2Meal"
//             placeholder="NonVeg 2 Meal"
//             value={form.nonVeg2Meal}
//             onChange={handleChange}
//             required
//           />
//           <button type="submit" style={{ minWidth: 80, fontWeight: 700 }}>
//             {editingId ? "Update" : "Create"}
//           </button>
//           {editingId && (
//             <button type="button" onClick={resetForm} style={{ background: "#eee" }}>
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>

//       {/* Plans Table */}
//       <table border="1" cellPadding="6" style={{ width: "100%", borderCollapse: "collapse" }}>
//         <thead style={{ background: "#e7e7e7" }}>
//           <tr>
//             <th>Type</th>
//             <th>Duration</th>
//             <th>Veg 1</th>
//             <th>Veg 2</th>
//             <th>NonVeg 1</th>
//             <th>NonVeg 2</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {(plans.length === 0) && (
//             <tr>
//               <td colSpan={7} style={{ textAlign: "center", padding: 20 }}>
//                 <i>No plans found for this type.</i>
//               </td>
//             </tr>
//           )}
//           {plans.map(plan => (
//             <tr key={plan._id}>
//               <td>{plan.planType}</td>
//               <td>{plan.duration}</td>
//               <td>{plan.veg1Meal}</td>
//               <td>{plan.veg2Meal}</td>
//               <td>{plan.nonVeg1Meal}</td>
//               <td>{plan.nonVeg2Meal}</td>
//               <td>
//                 <button onClick={() => handleEdit(plan)} style={{ marginRight: 8 }}>
//                   Edit
//                 </button>
//                 <button onClick={() => handleDelete(plan._id)} style={{ background: "#faa" }}>
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5001/api/plans";

const planTypes = [
  { label: "Weight Loss", value: "weight-loss" },
  { label: "Weight Gain", value: "weight-gain" },
  { label: "Stay Fit", value: "stay-fit" },
];

const emptyForm = {
  planType: "weight-loss",
  duration: "",
  veg1Meal: "",
  veg2Meal: "",
  nonVeg1Meal: "",
  nonVeg2Meal: ""
};

export default function PlanAdmin() {
  const [plans, setPlans] = useState([]);
  const [planType, setPlanType] = useState("weight-loss");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchPlans();
    // eslint-disable-next-line
  }, [planType]);

  const fetchPlans = async () => {
    try {
      const res = await axios.get(`${API}/type/${planType}`);
      setPlans(res.data);
    } catch {
      setMessage("Failed to fetch plans");
    }
  };

  const openForm = (plan = null) => {
    if (plan) {
      setForm({ ...plan });
      setEditingId(plan._id);
    } else {
      setForm({ ...emptyForm, planType });
      setEditingId(null);
    }
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm({ ...emptyForm, planType });
  };

  const onInputChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTypeChange = e => {
    setPlanType(e.target.value);
    closeForm();
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API}/${editingId}`, form);
        setMessage("Plan updated!");
      } else {
        await axios.post(API, form);
        setMessage("Plan created!");
      }
      fetchPlans();
      closeForm();
    } catch (err) {
      setMessage("Something went wrong!");
    }
  };

  const handleDelete = async id => {
    if (window.confirm("Delete this plan?")) {
      try {
        await axios.delete(`${API}/${id}`);
        setMessage("Plan deleted!");
        fetchPlans();
      } catch {
        setMessage("Delete failed!");
      }
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      {message && (
        <div className="mb-4 bg-blue-100 text-blue-900 px-4 py-2 rounded">
          {message}
        </div>
      )}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
        <select
          value={planType}
          onChange={handleTypeChange}
          className="rounded border border-gray-300 px-4 py-2"
        >
          {planTypes.map(p => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
        <button
          onClick={() => openForm()}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 ml-auto"
        >
          Add Plan
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-3">Duration</th>
              <th className="py-2 px-3">Veg 1</th>
              <th className="py-2 px-3">Veg 2</th>
              <th className="py-2 px-3">NonVeg 1</th>
              <th className="py-2 px-3">NonVeg 2</th>
              <th className="py-2 px-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-6 text-gray-400 text-center">No plans found</td>
              </tr>
            ) : (
              plans.map(plan => (
                <tr key={plan._id} className="border-b">
                  <td className="py-2 px-3">{plan.duration}</td>
                  <td className="py-2 px-3">{plan.veg1Meal}</td>
                  <td className="py-2 px-3">{plan.veg2Meal}</td>
                  <td className="py-2 px-3">{plan.nonVeg1Meal}</td>
                  <td className="py-2 px-3">{plan.nonVeg2Meal}</td>
                  <td className="py-2 px-3">
                    <button
                      onClick={() => openForm(plan)}
                      className="bg-yellow-300 hover:bg-yellow-400 text-yellow-900 px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(plan._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg max-w-lg w-full">
            <h3 className="text-xl font-bold mb-4">
              {editingId ? "Edit Plan" : "Add Plan"}
            </h3>
            <form onSubmit={handleSubmit} className="grid gap-3">
              <div>
                <label className="block text-sm mb-1">Plan Type</label>
                <select
                  name="planType"
                  value={form.planType}
                  onChange={onInputChange}
                  className="w-full border px-2 py-1 rounded"
                >
                  {planTypes.map(p => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>
              <input
                className="w-full border px-2 py-1 rounded"
                type="text"
                name="duration"
                placeholder="Duration"
                value={form.duration}
                onChange={onInputChange}
                required
              />
              <input
                className="w-full border px-2 py-1 rounded"
                type="text"
                name="veg1Meal"
                placeholder="Veg 1 Meal"
                value={form.veg1Meal}
                onChange={onInputChange}
                required
              />
              <input
                className="w-full border px-2 py-1 rounded"
                type="text"
                name="veg2Meal"
                placeholder="Veg 2 Meal"
                value={form.veg2Meal}
                onChange={onInputChange}
                required
              />
              <input
                className="w-full border px-2 py-1 rounded"
                type="text"
                name="nonVeg1Meal"
                placeholder="NonVeg 1 Meal"
                value={form.nonVeg1Meal}
                onChange={onInputChange}
                required
              />
              <input
                className="w-full border px-2 py-1 rounded"
                type="text"
                name="nonVeg2Meal"
                placeholder="NonVeg 2 Meal"
                value={form.nonVeg2Meal}
                onChange={onInputChange}
                required
              />
              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {editingId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
