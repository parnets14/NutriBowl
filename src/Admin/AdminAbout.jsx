"use client";

import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import {  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger} from "../Components/ui/dialog";

import {  Card,
  CardContent,
  CardHeader,
  CardTitle} from "../Components/ui/card";
import { Label } from "../Components/ui/label";
import { Input } from "../Components/ui/input";
import { Textarea } from "../Components/ui/textarea";
import { Badge } from "../Components/ui/badge";
import { Button } from "../Components/ui/button";

import { Edit, Trash2, Plus } from "lucide-react";

const initialProfiles = [
  {
    id: "1",
    name: "Sarah Chen",
    title: "Co-Founder & Head Nutritionist",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    description: "Leading expert in holistic nutrition and personalized meal planning.",
    role: "nutritionist",
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    title: "Co-Founder & Executive Chef",
    image:
      "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    description: "Innovative chef creating healthy, flavorful meals with passion.",
    role: "chef",
  },
];

export default function AdminAbout() {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    image: "",
    description: "",
    role: "",
  });
  const [editingProfile, setEditingProfile] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const resetForm = () => {
    setFormData({
      name: "",
      title: "",
      image: "",
      description: "",
      role: "",
    });
    setEditingProfile(null);
    setDialogOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingProfile) {
      setProfiles((prev) =>
        prev.map((item) =>
          item.id === editingProfile.id ? { ...item, ...formData } : item
        )
      );
    } else {
      const newProfile = {
        id: Date.now().toString(),
        ...formData,
      };
      setProfiles((prev) => [...prev, newProfile]);
    }

    resetForm();
  };

  const handleEdit = (profile) => {
    setEditingProfile(profile);
    setFormData({ ...profile });
    setDialogOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm("Delete this profile?")) {
      setProfiles((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <div>
            <CardTitle className="text-green-700">About Us Management</CardTitle>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>{editingProfile ? "Edit" : "Add"} Profile</DialogTitle>
                <DialogDescription>
                  {editingProfile ? "Update team member info" : "Add a new About Us profile"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Image URL</Label>
                    <Input
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Role (tag)</Label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="">Select</option>
                      <option value="nutritionist">Nutritionist</option>
                      <option value="chef">Chef</option>
                      <option value="founder">Founder</option>
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    {editingProfile ? "Update" : "Add"} Profile
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Profile</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                     <img
  src={profile.image || "/placeholder.jpg"} // 👈 Add fallback
  alt={profile.name || "Profile"}
  className="w-12 h-12 rounded-lg object-cover"
/>

                      <div>
                        <div className="font-medium">{profile.name}</div>
                        <div className="text-sm text-gray-500">{profile.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{profile.title}</TableCell>
                  <TableCell>
                    <Badge>{profile.role}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(profile)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(profile.id)}>
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
}
