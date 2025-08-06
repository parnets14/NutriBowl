"use client";

import { useState, useEffect, useRef } from "react";
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
import { Plus, Edit, Trash2, Heart, Upload } from "lucide-react";

const API_URL = "http://localhost:5001/api/benefits"; // Adjust if using env or deployed URL

export default function AdminBenefits() {
  const [benefits, setBenefits] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBenefit, setEditingBenefit] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "", icon: "" });
  const [iconPreview, setIconPreview] = useState("");
  const [iconFile, setIconFile] = useState(null);
  const fileInputRef = useRef(null);

  // Fetch all benefits
  const fetchBenefits = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setBenefits(data);
    } catch (error) {
      console.error("Error fetching benefits:", error);
    }
  };

  useEffect(() => {
    fetchBenefits();
  }, []);

  // Submit handler for add or update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    if (iconFile) form.append("icon", iconFile);

    const method = editingBenefit ? "PUT" : "POST";
    const url = editingBenefit ? `${API_URL}/${editingBenefit._id}` : API_URL;

    try {
      const res = await fetch(url, {
        method,
        body: form,
      });

      if (res.ok) {
        fetchBenefits(); // Refresh list
        resetForm();
      }
    } catch (error) {
      console.error("Error submitting benefit:", error);
    }
  };

  // Edit handler
  const handleEdit = (benefit) => {
    setEditingBenefit(benefit);
    setFormData({
      title: benefit.title,
      description: benefit.description,
      icon: benefit.icon,
    });
    setIconPreview(`http://localhost:5001${benefit.icon}`);
    setIsDialogOpen(true);
  };

  // Delete handler
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this benefit?");
    if (!confirmed) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (res.ok) fetchBenefits();
    } catch (error) {
      console.error("Error deleting benefit:", error);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({ title: "", description: "", icon: "" });
    setIconPreview("");
    setIconFile(null);
    setEditingBenefit(null);
    setIsDialogOpen(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Handle icon upload
  const handleIconUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIconFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setIconPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="w-5 h-5" />
              <span>Benefits Management</span>
            </CardTitle>
            <CardDescription>Manage the benefits section of your application</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                Add Benefit
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{editingBenefit ? "Edit Benefit" : "Add New Benefit"}</DialogTitle>
                <DialogDescription>
                  {editingBenefit ? "Update benefit information" : "Add a new benefit to display"}
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
                      placeholder="Health Benefits"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe the benefit..."
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Icon</Label>
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleIconUpload}
                        accept="image/*"
                        className="hidden"
                        id="icon-upload"
                        required={!editingBenefit}
                      />
                      <Label
                        htmlFor="icon-upload"
                        className="flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-50"
                      >
                        <Upload className="w-4 h-4" />
                        Upload Icon
                      </Label>
                      {(iconPreview || formData.icon) && (
                        <img
                          src={iconPreview || formData.icon}
                          alt="Preview"
                          className="w-12 h-12 rounded-md object-cover"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button type="submit">{editingBenefit ? "Update" : "Add"} Benefit</Button>
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
            {benefits.map((benefit) => (
              <TableRow key={benefit._id}>
                <TableCell>
                  <img
                    src={`http://localhost:5001${benefit.icon}`}
                    alt={benefit.title}
                    className="w-10 h-10 rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{benefit.title}</TableCell>
                <TableCell className="max-w-xs">{benefit.description}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(benefit)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(benefit._id)}>
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