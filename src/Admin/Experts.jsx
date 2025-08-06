"use client";

import { useState } from "react";
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
import { Plus, Edit, Trash2, User } from "lucide-react";

const initialExperts = [
  {
    id: "1",
    name: "Dr. Neha Sharma",
    title: "Certified Nutritionist",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    bio: "10+ years helping clients achieve healthy lifestyles through balanced nutrition.",
  },
  {
    id: "2",
    name: "Raj Mehta",
    title: "Fitness Coach",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    bio: "Expert in strength training and weight management for all body types.",
  },
];

export default function Experts() {
  const [experts, setExperts] = useState(initialExperts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExpert, setEditingExpert] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    image: "",
    bio: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingExpert) {
      // Update existing expert
      setExperts(experts.map((expert) => (expert.id === editingExpert.id ? { ...expert, ...formData } : expert)));
    } else {
      // Add new expert
      const newExpert = {
        id: Date.now().toString(),
        ...formData,
      };
      setExperts([...experts, newExpert]);
    }

    resetForm();
  };

  const handleEdit = (expert) => {
    setEditingExpert(expert);
    setFormData({
      name: expert.name,
      title: expert.title,
      image: expert.image,
      bio: expert.bio,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    setExperts(experts.filter((expert) => expert.id !== id));
  };

  const resetForm = () => {
    setFormData({ name: "", title: "", image: "", bio: "" });
    setEditingExpert(null);
    setIsDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Experts Management</span>
            </CardTitle>
            <CardDescription>Manage nutrition experts and fitness coaches</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>
                <Plus className="w-4 h-4 mr-2" />
                Add Expert
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{editingExpert ? "Edit Expert" : "Add New Expert"}</DialogTitle>
                <DialogDescription>
                  {editingExpert ? "Update expert information" : "Add a new nutrition expert or fitness coach"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Dr. John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Certified Nutritionist"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Brief description of expertise..."
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button type="submit">{editingExpert ? "Update" : "Add"} Expert</Button>
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
              <TableHead>Expert</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Bio</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {experts.map((expert) => (
              <TableRow key={expert.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    <img
                      src={expert.image || "/placeholder.svg"}
                      alt={expert.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span>{expert.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{expert.title}</Badge>
                </TableCell>
                <TableCell className="max-w-xs truncate">{expert.bio}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(expert)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(expert.id)}>
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
  );
}