"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Plus, Edit, Trash2, ChefHat, Search, Filter } from "lucide-react";

export default function MenuManager() {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedTab, setSelectedTab] = useState("items");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    ingredients: "",
    category: "main",
    dietType: [],
    image: "",
    allergens: "",
    planType: [],
    isActive: true,
  });

  // Fetch menu items from API
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/menu");
        if (!response.ok) {
          throw new Error("Failed to fetch menu items");
        }
        const data = await response.json();
        setMenuItems(data);
        setFilteredItems(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Filter items based on search and category
  useEffect(() => {
    let filtered = [...menuItems];

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((item) => item.category === categoryFilter);
    }

    setFilteredItems(filtered);
  }, [menuItems, searchTerm, categoryFilter]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.description || !formData.ingredients || !formData.category) {
      setError("Please fill in all required fields: name, description, ingredients, and category.");
      return;
    }

    if (!formData.price || !formData.calories || !formData.protein || !formData.carbs || !formData.fat) {
      setError("Please provide valid numeric values for price, calories, protein, carbs, and fat.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price || 0);
    formDataToSend.append("calories", formData.calories || 0);
    formDataToSend.append("protein", formData.protein || 0);
    formDataToSend.append("carbs", formData.carbs || 0);
    formDataToSend.append("fat", formData.fat || 0);
    formData.ingredients.split(",").map((item) => item.trim()).forEach((ingredient) => {
      formDataToSend.append("ingredients[]", ingredient);
    });
    formData.dietType.forEach((type) => {
      formDataToSend.append("dietType[]", type);
    });
    formData.allergens.split(",").map((item) => item.trim()).filter(Boolean).forEach((allergen) => {
      formDataToSend.append("allergens[]", allergen);
    });
    formData.planType.forEach((type) => {
      formDataToSend.append("planType[]", type);
    });
    formDataToSend.append("category", formData.category);
    formDataToSend.append("isActive", formData.isActive);
    if (imageFile) {
      formDataToSend.append("image", imageFile);
    }

    try {
      let response;
      if (editingItem) {
        response = await fetch(`http://localhost:5001/api/menu/${editingItem._id}`, {
          method: "PUT",
          body: formDataToSend,
        });
      } else {
        response = await fetch("http://localhost:5001/api/menu", {
          method: "POST",
          body: formDataToSend,
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || (editingItem ? "Failed to update menu item" : "Failed to create menu item"));
      }

      const updatedItem = await response.json();
      if (editingItem) {
        setMenuItems(menuItems.map((item) => (item._id === editingItem._id ? updatedItem : item)));
      } else {
        setMenuItems([...menuItems, updatedItem]);
      }

      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      calories: item.calories,
      protein: item.protein,
      carbs: item.carbs,
      fat: item.fat,
      ingredients: item.ingredients.join(", "),
      category: item.category,
      dietType: item.dietType,
      image: item.image,
      allergens: item.allergens.join(", "),
      planType: item.planType,
      isActive: item.isActive,
    });
    setImagePreview(`http://localhost:5001${item.image}`);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this menu item?")) {
      try {
        const response = await fetch(`http://localhost:5001/api/menu/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete menu item");
        }
        setMenuItems(menuItems.filter((item) => item._id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const toggleItemStatus = async (id) => {
    const item = menuItems.find((item) => item._id === id);
    try {
      const response = await fetch(`http://localhost:5001/api/menu/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: !item.isActive }),
      });
      if (!response.ok) {
        throw new Error("Failed to toggle item status");
      }
      const updatedItem = await response.json();
      setMenuItems(menuItems.map((item) => (item._id === id ? updatedItem : item)));
    } catch (err) {
      setError(err.message);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: 0,
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      ingredients: "",
      category: "main",
      dietType: [],
      image: "",
      allergens: "",
      planType: [],
      isActive: true,
    });
    setEditingItem(null);
    setImageFile(null);
    setImagePreview("");
    setIsDialogOpen(false);
    setError(null);
  };

  const handleDietTypeChange = (type) => {
    const updatedDietType = formData.dietType.includes(type)
      ? formData.dietType.filter((t) => t !== type)
      : [...formData.dietType, type];
    setFormData({ ...formData, dietType: updatedDietType });
  };

  const handlePlanTypeChange = (type) => {
    const updatedPlanType = formData.planType.includes(type)
      ? formData.planType.filter((t) => t !== type)
      : [...formData.planType, type];
    setFormData({ ...formData, planType: updatedPlanType });
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "breakfast":
        return "bg-yellow-100 text-yellow-800";
      case "main":
        return "bg-green-100 text-green-800";
      case "snacks":
        return "bg-orange-100 text-orange-800";
      case "desserts":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDietTypeColor = (type) => {
    switch (type) {
      case "veg":
        return "bg-green-100 text-green-800";
      case "non-veg":
        return "bg-red-100 text-red-800";
      case "vegan":
        return "bg-emerald-100 text-emerald-800";
      case "keto":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return <div className="text-center py-16">Loading menu items...</div>;
  }

  if (error && !menuItems.length) {
    return <div className="text-center py-16 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="text-center py-4 text-red-500">{error}</div>
      )}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center space-x-2 text-orange-700">
                <ChefHat className="w-5 h-5" />
                <span>Menu Management</span>
              </CardTitle>
              <CardDescription>Manage restaurant menu items, pricing, and availability</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => resetForm()} className="bg-orange-600 hover:bg-orange-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Menu Item
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingItem ? "Edit Menu Item" : "Add New Menu Item"}</DialogTitle>
                  <DialogDescription>
                    {editingItem ? "Update menu item information" : "Create a new menu item"}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 py-4">
                    {/* Basic Information */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Item Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Grilled Chicken Quinoa Bowl"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="price">Price (₹)</Label>
                        <Input
                          id="price"
                          type="number"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                          placeholder="299"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="High-protein bowl with grilled chicken..."
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="image">Image</Label>
                      <div className="flex items-center space-x-4">
                        {imagePreview ? (
                          <img src={imagePreview} alt="Preview" className="w-16 h-16 rounded-md object-cover" />
                        ) : (
                          <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                            <span className="text-gray-400 text-xs">No image</span>
                          </div>
                        )}
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="w-full"
                        />
                      </div>
                    </div>

                    {/* Nutrition Information */}
                    <div className="grid grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="calories">Calories</Label>
                        <Input
                          id="calories"
                          type="number"
                          value={formData.calories}
                          onChange={(e) => setFormData({ ...formData, calories: parseInt(e.target.value) || 0 })}
                          placeholder="450"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="protein">Protein (g)</Label>
                        <Input
                          id="protein"
                          type="number"
                          value={formData.protein}
                          onChange={(e) => setFormData({ ...formData, protein: parseInt(e.target.value) || 0 })}
                          placeholder="35"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="carbs">Carbs (g)</Label>
                        <Input
                          id="carbs"
                          type="number"
                          value={formData.carbs}
                          onChange={(e) => setFormData({ ...formData, carbs: parseInt(e.target.value) || 0 })}
                          placeholder="40"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fat">Fat (g)</Label>
                        <Input
                          id="fat"
                          type="number"
                          value={formData.fat}
                          onChange={(e) => setFormData({ ...formData, fat: parseInt(e.target.value) || 0 })}
                          placeholder="12"
                          required
                        />
                      </div>
                    </div>

                    {/* Category and Status */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <select
                          id="category"
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required
                        >
                          <option value="breakfast">Breakfast</option>
                          <option value="main">Main Course</option>
                          <option value="snacks">Snacks</option>
                          <option value="desserts">Desserts</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label>Status</Label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="isActive"
                            checked={formData.isActive}
                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                            className="rounded"
                          />
                          <Label htmlFor="isActive">Active</Label>
                        </div>
                      </div>
                    </div>

                    {/* Diet Types */}
                    <div className="space-y-2">
                      <Label>Diet Types</Label>
                      <div className="flex flex-wrap gap-2">
                        {["veg", "non-veg", "vegan", "keto"].map((type) => (
                          <label key={type} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={formData.dietType.includes(type)}
                              onChange={() => handleDietTypeChange(type)}
                              className="rounded"
                            />
                            <span className="capitalize">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Plan Types */}
                    <div className="space-y-2">
                      <Label>Suitable for Plans</Label>
                      <div className="flex flex-wrap gap-2">
                        {["weight-gain", "stay-fit", "weight-loss"].map((type) => (
                          <label key={type} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={formData.planType.includes(type)}
                              onChange={() => handlePlanTypeChange(type)}
                              className="rounded"
                            />
                            <span className="capitalize">{type.replace("-", " ")}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Ingredients and Allergens */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="ingredients">Ingredients (comma-separated)</Label>
                        <Textarea
                          id="ingredients"
                          value={formData.ingredients}
                          onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                          placeholder="Chicken breast, Quinoa, Broccoli..."
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="allergens">Allergens (comma-separated)</Label>
                        <Textarea
                          id="allergens"
                          value={formData.allergens}
                          onChange={(e) => setFormData({ ...formData, allergens: e.target.value })}
                          placeholder="dairy, gluten, nuts..."
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                      {editingItem ? "Update" : "Add"} Menu Item
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
              <TabsTrigger value="items">Menu Items</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="items">
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search menu items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="all">All Categories</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="main">Main Course</option>
                    <option value="snacks">Snacks</option>
                    <option value="desserts">Desserts</option>
                  </select>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Calories</TableHead>
                    <TableHead>Diet Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <img
                            src={`http://localhost:5001${item.image}` || "/placeholder.svg"}
                            alt={item.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-gray-500 max-w-xs truncate">{item.description}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getCategoryColor(item.category)}>{item.category}</Badge>
                      </TableCell>
                      <TableCell className="font-semibold">₹{item.price}</TableCell>
                      <TableCell>{item.calories} cal</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {item.dietType.map((type) => (
                            <Badge key={type} className={getDietTypeColor(type)} variant="outline">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => toggleItemStatus(item._id)}
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.isActive ? "Active" : "Inactive"}
                        </button>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDelete(item._id)}>
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
                    <CardTitle className="text-sm">Total Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">{menuItems.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Active Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      {menuItems.filter((item) => item.isActive).length}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Avg Price</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">
                      ₹{Math.round(menuItems.reduce((sum, item) => sum + item.price, 0) / menuItems.length || 0)}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Vegetarian Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      {menuItems.filter((item) => item.dietType.includes("veg")).length}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Category Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["breakfast", "main", "snacks", "desserts"].map((category) => {
                      const count = menuItems.filter((item) => item.category === category).length;
                      const percentage = menuItems.length > 0 ? (count / menuItems.length) * 100 : 0;
                      return (
                        <div key={category} className="flex items-center justify-between">
                          <span className="capitalize font-medium">{category}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div className="bg-orange-600 h-2 rounded-full" style={{ width: `${percentage}%` }} />
                            </div>
                            <span className="text-sm text-gray-600">{count} items</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}