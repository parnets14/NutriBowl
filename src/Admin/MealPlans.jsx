

import React, { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Badge } from "../components/ui/badge"
import { Plus, Edit, Trash2, UtensilsCrossed } from "lucide-react"

const initialMealPlans = [
  {
    id: "1",
    name: "Weight Loss Starter",
    type: "weight-loss",
    description: "A balanced meal plan designed for sustainable weight loss",
    calories: 1200,
    duration: "4 weeks",
    price: 2999,
  },
  {
    id: "2",
    name: "Stay Fit Maintenance",
    type: "stay-fit",
    description: "Maintain your ideal weight with balanced nutrition",
    calories: 1800,
    duration: "4 weeks",
    price: 2499,
  },
  {
    id: "3",
    name: "Weight Gain Builder",
    type: "weight-gain",
    description: "Healthy weight gain with muscle building focus",
    calories: 2500,
    duration: "4 weeks",
    price: 3499,
  },
]

export default function MealPlansManager() {
  const [mealPlans, setMealPlans] = useState(initialMealPlans)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    type: "weight-loss",
    description: "",
    calories: 0,
    duration: "",
    price: 0,
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editingPlan) {
      setMealPlans(mealPlans.map((plan) => (plan.id === editingPlan.id ? { ...plan, ...formData } : plan)))
    } else {
      const newPlan = {
        id: Date.now().toString(),
        ...formData,
      }
      setMealPlans([...mealPlans, newPlan])
    }

    resetForm()
  }

  const handleEdit = (plan) => {
    setEditingPlan(plan)
    setFormData({
      name: plan.name,
      type: plan.type,
      description: plan.description,
      calories: plan.calories,
      duration: plan.duration,
      price: plan.price,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id) => {
    setMealPlans(mealPlans.filter((plan) => plan.id !== id))
  }

  const resetForm = () => {
    setFormData({
      name: "",
      type: "weight-loss",
      description: "",
      calories: 0,
      duration: "",
      price: 0,
    })
    setEditingPlan(null)
    setIsDialogOpen(false)
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "weight-loss":
        return "bg-blue-100 text-blue-800"
      case "weight-gain":
        return "bg-purple-100 text-purple-800"
      case "stay-fit":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <UtensilsCrossed className="w-5 h-5" />
              <span>Meal Plans Management</span>
            </CardTitle>
            <CardDescription>Manage nutrition meal plans and pricing</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>
                <Plus className="w-4 h-4 mr-2" />
                Add Meal Plan
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{editingPlan ? "Edit Meal Plan" : "Add New Meal Plan"}</DialogTitle>
                <DialogDescription>
                  {editingPlan ? "Update meal plan information" : "Create a new nutrition meal plan"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Plan Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Weight Loss Starter"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Plan Type</Label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="weight-loss">Weight Loss</option>
                      <option value="weight-gain">Weight Gain</option>
                      <option value="stay-fit">Stay Fit</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Plan description..."
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="calories">Calories</Label>
                      <Input
                        id="calories"
                        type="number"
                        value={formData.calories}
                        onChange={(e) => setFormData({ ...formData, calories: Number.parseInt(e.target.value) })}
                        placeholder="1200"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (₹)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: Number.parseInt(e.target.value) })}
                        placeholder="2999"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="4 weeks"
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button type="submit">{editingPlan ? "Update" : "Add"} Plan</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Plan Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Calories</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mealPlans.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell className="font-medium">
                  <div>
                    <div>{plan.name}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">{plan.description}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getTypeColor(plan.type)}>{plan.type.replace("-", " ")}</Badge>
                </TableCell>
                <TableCell>{plan.calories} cal</TableCell>
                <TableCell>{plan.duration}</TableCell>
                <TableCell>₹{plan.price}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(plan)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(plan.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}