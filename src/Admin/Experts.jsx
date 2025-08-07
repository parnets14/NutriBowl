"use client";

import { useEffect, useState } from "react";
import axios from "axios";
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

const API_URL = "http://localhost:5001/api/expert"; // adjust if different

export default function Experts() {
  const [experts, setExperts] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExpert, setEditingExpert] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    bio: "",
    imageFile: null,
    imagePreview: "",
  });

  const fetchExperts = async () => {
    try {
      const res = await axios.get(API_URL);
      setExperts(res.data);
    } catch (err) {
      console.error("Error fetching experts:", err);
    }
  };

  useEffect(() => {
    fetchExperts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("title", formData.title);
      data.append("bio", formData.bio);
      if (formData.imageFile) {
        data.append("image", formData.imageFile);
      }

      if (editingExpert) {
        await axios.put(`${API_URL}/${editingExpert._id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(API_URL, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      fetchExperts();
      resetForm();
    } catch (err) {
      console.error("Error saving expert:", err);
    }
  };

  const handleEdit = (expert) => {
    setEditingExpert(expert);
    setFormData({
      name: expert.name,
      title: expert.title,
      bio: expert.bio,
      imageFile: null,
      imagePreview: `http://localhost:5001${expert.image}`,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchExperts();
    } catch (err) {
      console.error("Error deleting expert:", err);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      title: "",
      bio: "",
      imageFile: null,
      imagePreview: "",
    });
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
              <Button onClick={resetForm}>
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
                    <Label htmlFor="image">Profile Picture</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setFormData({
                            ...formData,
                            imageFile: file,
                            imagePreview: URL.createObjectURL(file),
                          });
                        }
                      }}
                      required={!editingExpert}
                    />
                    {formData.imagePreview && (
                      <img
                        src={formData.imagePreview}
                        alt="Preview"
                        className="w-20 h-20 rounded-full object-cover mt-2"
                      />
                    )}
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
              <TableRow key={expert._id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    <img
                      src={`http://localhost:5001${expert.image}`}
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
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(expert._id)}>
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
