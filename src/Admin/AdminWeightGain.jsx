"use client"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Plus, Edit, Trash2, TrendingUp } from "lucide-react"

const initialWeightGainMeals = [
  {
    id: "1",
    day: "DAY - 1",
    mealType: "VEG MEAL",
    mealTime: "Lunch",
    items: [
      {
        id: "1",
        course: "Starter",
        item: "Methi Tomato Clear Soup",
        calories: 90,
        protein: 3,
        carbs: 10,
        fat: 2,
        ingredients: "Tomato – 60g, methi – 20g, garlic – 2g, pepper – pinch, oil – 1 tsp",
        benefits: "Antioxidant-rich and cooling; supports digestion and appetite control.",
      },
      {
        id: "2",
        course: "Main",
        item: "Oats Vegetable Pulao",
        calories: 260,
        protein: 6,
        carbs: 42,
        fat: 7,
        ingredients: "Rolled oats – 60g, carrot – 30g, peas – 30g, onion – 20g, oil – 1 tsp",
        benefits: "Soluble fiber-rich; reduces cholesterol and supports satiety.",
      },
    ],
  },
]

export default function WeightGainMealManager() {
  const [meals, setMeals] = useState(initialWeightGainMeals)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMeal, setEditingMeal] = useState(null)
  const [selectedTab, setSelectedTab] = useState("meals")
  const [formData, setFormData] = useState({
    day: "DAY - 1",
    mealType: "VEG MEAL",
    mealTime: "Lunch",
    items: [],
  })

  const [itemFormData, setItemFormData] = useState({
    course: "Starter",
    item: "",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    ingredients: "",
    benefits: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    const mealWithIds = {
      ...formData,
      items: formData.items.map((item, index) => ({
        ...item,
        id: Date.now().toString() + index,
      })),
    }

    if (editingMeal) {
      setMeals(meals.map((meal) => (meal.id === editingMeal.id ? { ...meal, ...mealWithIds } : meal)))
    } else {
      const newMeal = {
        id: Date.now().toString(),
        ...mealWithIds,
      }
      setMeals([...meals, newMeal])
    }

    resetForm()
  }

  const handleEdit = (meal) => {
    setEditingMeal(meal)
    setFormData({
      day: meal.day,
      mealType: meal.mealType,
      mealTime: meal.mealTime,
      items: meal.items.map(({ id, ...item }) => item),
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id) => {
    setMeals(meals.filter((meal) => meal.id !== id))
  }

  const addItemToMeal = () => {
    setFormData({
      ...formData,
      items: [...formData.items, itemFormData],
    })
    setItemFormData({
      course: "Starter",
      item: "",
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      ingredients: "",
      benefits: "",
    })
  }

  const removeItemFromMeal = (index) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    })
  }

  const resetForm = () => {
    setFormData({
      day: "DAY - 1",
      mealType: "VEG MEAL",
      mealTime: "Lunch",
      items: [],
    })
    setItemFormData({
      course: "Starter",
      item: "",
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      ingredients: "",
      benefits: "",
    })
    setEditingMeal(null)
    setIsDialogOpen(false)
  }

  const getCourseColor = (course) => {
    switch (course) {
      case "Starter":
        return "bg-purple-100 text-purple-800"
      case "Main":
        return "bg-purple-200 text-purple-900"
      case "Salad":
        return "bg-purple-300 text-purple-900"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getMealTypeColor = (type) => {
    return type === "VEG MEAL" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center space-x-2 text-purple-700">
                <TrendingUp className="w-5 h-5" />
                <span>Weight Gain Meal Plans Management</span>
              </CardTitle>
              <CardDescription>Manage high-calorie meal plans for healthy weight gain</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => resetForm()} className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Weight Gain Plan
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingMeal ? "Edit Weight Gain Plan" : "Add New Weight Gain Plan"}</DialogTitle>
                  <DialogDescription>
                    {editingMeal ? "Update weight gain meal plan" : "Create a new high-calorie meal plan"}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="day">Day</Label>
                        <select
                          id="day"
                          value={formData.day}
                          onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required
                        >
                          <option value="DAY - 1">Day 1</option>
                          <option value="DAY - 2">Day 2</option>
                          <option value="DAY - 3">Day 3</option>
                          <option value="DAY - 4">Day 4</option>
                          <option value="DAY - 5">Day 5</option>
                          <option value="DAY - 6">Day 6</option>
                          <option value="DAY - 7">Day 7</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mealType">Meal Type</Label>
                        <select
                          id="mealType"
                          value={formData.mealType}
                          onChange={(e) => setFormData({ ...formData, mealType: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required
                        >
                          <option value="VEG MEAL">Vegetarian</option>
                          <option value="NON-VEG MEAL">Non-Vegetarian</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mealTime">Meal Time</Label>
                        <select
                          id="mealTime"
                          value={formData.mealTime}
                          onChange={(e) => setFormData({ ...formData, mealTime: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required
                        >
                          <option value="Lunch">Lunch</option>
                          <option value="Dinner">Dinner</option>
                        </select>
                      </div>
                    </div>

                    {/* Add Meal Items Section */}
                    <div className="border-t pt-4">
                      <h4 className="text-lg font-medium mb-4">Add High-Calorie Meal Items</h4>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label htmlFor="course">Course</Label>
                          <select
                            id="course"
                            value={itemFormData.course}
                            onChange={(e) => setItemFormData({ ...itemFormData, course: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          >
                            <option value="Starter">Starter</option>
                            <option value="Main">Main</option>
                            <option value="Salad">Salad</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="item">Item Name</Label>
                          <Input
                            id="item"
                            value={itemFormData.item}
                            onChange={(e) => setItemFormData({ ...itemFormData, item: e.target.value })}
                            placeholder="Methi Tomato Clear Soup"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label htmlFor="calories">Calories</Label>
                          <Input
                            id="calories"
                            type="number"
                            value={itemFormData.calories}
                            onChange={(e) => setItemFormData({ ...itemFormData, calories: Number.parseInt(e.target.value) })}
                            placeholder="260"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="protein">Protein (g)</Label>
                          <Input
                            id="protein"
                            type="number"
                            value={itemFormData.protein}
                            onChange={(e) => setItemFormData({ ...itemFormData, protein: Number.parseInt(e.target.value) })}
                            placeholder="8"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="carbs">Carbs (g)</Label>
                          <Input
                            id="carbs"
                            type="number"
                            value={itemFormData.carbs}
                            onChange={(e) => setItemFormData({ ...itemFormData, carbs: Number.parseInt(e.target.value) })}
                            placeholder="42"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="fat">Fat (g)</Label>
                          <Input
                            id="fat"
                            type="number"
                            value={itemFormData.fat}
                            onChange={(e) => setItemFormData({ ...itemFormData, fat: Number.parseInt(e.target.value) })}
                            placeholder="7"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label htmlFor="ingredients">Ingredients</Label>
                          <Textarea
                            id="ingredients"
                            value={itemFormData.ingredients}
                            onChange={(e) => setItemFormData({ ...itemFormData, ingredients: e.target.value })}
                            placeholder="Rolled oats – 60g, carrot – 30g..."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="benefits">Benefits</Label>
                          <Textarea
                            id="benefits"
                            value={itemFormData.benefits}
                            onChange={(e) => setItemFormData({ ...itemFormData, benefits: e.target.value })}
                            placeholder="Soluble fiber-rich; reduces cholesterol..."
                          />
                        </div>
                      </div>

                      <Button type="button" onClick={addItemToMeal} variant="outline" className="mb-4 bg-transparent">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Item to Meal
                      </Button>

                      {/* Display Added Items */}
                      {formData.items.length > 0 && (
                        <div className="space-y-2">
                          <h5 className="font-medium">Added Items:</h5>
                          {formData.items.map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-purple-50 rounded">
                              <span>
                                {item.course}: {item.item} ({item.calories} kcal)
                              </span>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => removeItemFromMeal(index)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                      {editingMeal ? "Update" : "Add"} Weight Gain Plan
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList>
              <TabsTrigger value="meals">Weight Gain Plans</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="meals">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Day</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Meal Time</TableHead>
                    <TableHead>Items Count</TableHead>
                    <TableHead>Total Calories</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {meals.map((meal) => (
                    <TableRow key={meal.id}>
                      <TableCell className="font-medium">{meal.day}</TableCell>
                      <TableCell>
                        <Badge className={getMealTypeColor(meal.mealType)}>
                          {meal.mealType.replace("MEAL", "").trim()}
                        </Badge>
                      </TableCell>
                      <TableCell>{meal.mealTime}</TableCell>
                      <TableCell>{meal.items.length} items</TableCell>
                      <TableCell className="font-semibold text-purple-600">
                        {meal.items.reduce((total, item) => total + item.calories, 0)} kcal
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(meal)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDelete(meal.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Total Plans</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">{meals.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Avg Calories/Meal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">
                      {Math.round(
                        meals.reduce(
                          (total, meal) => total + meal.items.reduce((mealTotal, item) => mealTotal + item.calories, 0),
                          0,
                        ) / meals.length,
                      ) || 0}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Vegetarian Plans</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      {meals.filter((m) => m.mealType === "VEG MEAL").length}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Non-Veg Plans</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">
                      {meals.filter((m) => m.mealType === "NON-VEG MEAL").length}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}