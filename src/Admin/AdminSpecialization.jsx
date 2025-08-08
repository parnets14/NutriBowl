"use client";

import { useState, useEffect } from "react";
import axios from "axios";

// UI Components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";

const API_URL = "http://localhost:5001/api/specialization";

const AdminSpecialization = () => {
  const [specializations, setSpecializations] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    icon: null,
    items: "",
  });
  const [editId, setEditId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchSpecializations = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(API_URL);
      setSpecializations(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching specializations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecializations();
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      icon: null,
      items: "",
    });
    setImagePreview("");
    setEditId(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, icon: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formPayload = new FormData();
    formPayload.append("title", formData.title);
    formPayload.append("items", formData.items.split(",").map(item => item.trim()));
    
    if (formData.icon) {
      formPayload.append("icon", formData.icon);
    }

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, formPayload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.post(API_URL, formPayload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      resetForm();
      fetchSpecializations();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (specialization) => {
    setFormData({
      title: specialization.title,
      icon: null,
      items: specialization.items.join(", "),
    });
    setImagePreview(`http://localhost:5001/uploads/${specialization.icon}`);
    setEditId(specialization._id);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      await axios.delete(`${API_URL}/${id}`);
      fetchSpecializations();
    } catch (error) {
      console.error("Error deleting specialization:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Specializations Management</h1>
        
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          if (!open) {
            resetForm();
          }
          setIsDialogOpen(open);
        }}>
          <DialogTrigger asChild>
            <Button 
              variant="default"
              onClick={() => {
                resetForm();
                setIsDialogOpen(true);
              }}
            >
              Add Specialization
            </Button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editId ? "Edit Specialization" : "Create New Specialization"}
              </DialogTitle>
              <DialogDescription>
                {editId ? "Update the specialization details" : "Add a new specialization to the list"}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter specialization title"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="icon">Icon Image</Label>
                <Input
                  id="icon"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="cursor-pointer"
                  disabled={isLoading}
                />
                {imagePreview && (
                  <div className="mt-2 border rounded-md p-2 w-fit">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="object-contain h-[60px]"
                    />
                  </div>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="items">Items (comma separated)</Label>
                <Textarea
                  id="items"
                  value={formData.items}
                  onChange={(e) => setFormData({ ...formData, items: e.target.value })}
                  placeholder="e.g., Weight Loss, Muscle Gain, Meal Plans"
                  required
                  rows={3}
                  disabled={isLoading}
                />
              </div>
              
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Processing..." : editId ? "Update Specialization" : "Create Specialization"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        {isLoading && !isDialogOpen ? (
          <div className="p-4 text-center">Loading specializations...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead>Items</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {specializations.length > 0 ? (
                specializations.map((spec) => (
                  <TableRow key={spec._id}>
                    <TableCell>{spec.title}</TableCell>
                    <TableCell>
                      {spec.icon && (
                        <img
                          src={`http://localhost:5001/uploads/${spec.icon}`}
                          alt={spec.title}
                          className="h-[30px] object-contain"
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <ul className="list-disc pl-4">
                        {spec.items?.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell className="space-x-2 text-right">
                      <Button 
                        variant="outline" 
                        onClick={() => handleEdit(spec)}
                        disabled={isLoading}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(spec._id)}
                        disabled={isLoading}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No specializations found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default AdminSpecialization;