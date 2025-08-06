"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
import { Plus, Edit, Trash2, CheckCircle, Calendar, Utensils, ClipboardList } from "lucide-react";

const API_URL = "http://localhost:5001/api/solutions"; // Adjust if using env or deployed URL

export const AdminSolution = () => {
  const [solutions, setSolutions] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSolution, setEditingSolution] = useState(null);
  const [formData, setFormData] = useState({ 
    title: "", 
    description: "",
    icon: "check-circle" // default icon
  });

  // Available icons for solutions
  const solutionIcons = [
    { value: "check-circle", label: "Check Circle", icon: <CheckCircle className="w-5 h-5" /> },
    { value: "calendar", label: "Calendar", icon: <Calendar className="w-5 h-5" /> },
    { value: "utensils", label: "Utensils", icon: <Utensils className="w-5 h-5" /> },
    { value: "clipboard-list", label: "Clipboard", icon: <ClipboardList className="w-5 h-5" /> }
  ];

  // Fetch all solutions
  const fetchSolutions = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setSolutions(data);
    } catch (error) {
      console.error("Error fetching solutions:", error);
    }
  };

  useEffect(() => {
    fetchSolutions();
  }, []);

  // Submit handler for add or update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editingSolution ? "PUT" : "POST";
    const url = editingSolution ? `${API_URL}/${editingSolution._id}` : API_URL;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchSolutions(); // Refresh list
        resetForm();
      }
    } catch (error) {
      console.error("Error submitting solution:", error);
    }
  };

  // Edit handler
  const handleEdit = (solution) => {
    setEditingSolution(solution);
    setFormData({
      title: solution.title,
      description: solution.description,
      icon: solution.icon
    });
    setIsDialogOpen(true);
  };

  // Delete handler
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this solution?");
    if (!confirmed) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (res.ok) fetchSolutions();
    } catch (error) {
      console.error("Error deleting solution:", error);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({ title: "", description: "", icon: "check-circle" });
    setEditingSolution(null);
    setIsDialogOpen(false);
  };

  // Render icon based on value
  const renderIcon = (iconValue) => {
    const icon = solutionIcons.find(i => i.value === iconValue);
    return icon ? icon.icon : <CheckCircle className="w-5 h-5" />;
  };

  return (
    <div className="space-y-8">
      {/* Public View (Preview) */}
     

      {/* Admin Panel */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Solutions Management</span>
              </CardTitle>
              <CardDescription>Manage the solutions section content</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Solution
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{editingSolution ? "Edit Solution" : "Add New Solution"}</DialogTitle>
                  <DialogDescription>
                    {editingSolution ? "Update solution information" : "Add a new solution point"}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Personalized Nutrition"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Describe the solution..."
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Icon</Label>
                      <div className="grid grid-cols-4 gap-2">
                        {solutionIcons.map((icon) => (
                          <button
                            key={icon.value}
                            type="button"
                            className={`p-3 rounded-full flex items-center justify-center ${formData.icon === icon.value ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-100'}`}
                            onClick={() => setFormData({ ...formData, icon: icon.value })}
                          >
                            {icon.icon}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                    <Button type="submit">{editingSolution ? "Update" : "Add"} Solution</Button>
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
                <TableHead>Icon</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {solutions.map((solution) => (
                <TableRow key={solution._id}>
                  <TableCell>
                    <div className="bg-green-100 p-2 rounded-full w-10 h-10 flex items-center justify-center">
                      {renderIcon(solution.icon)}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{solution.title}</TableCell>
                  <TableCell className="max-w-xs">{solution.description}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(solution)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(solution._id)}>
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
    </div>
  );
};