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
import { Plus, Edit, Trash2, MessageSquare, Star, Upload } from "lucide-react";

const API_URL = "http://localhost:5001/api/testimonial"; // Adjust if using env or deployed URL

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [formData, setFormData] = useState({ name: "", feedback: "", image: "", rating: 5 });
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  // ✅ Fetch all testimonials
  const fetchTestimonials = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTestimonials(data);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // ✅ Submit handler for add or update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("feedback", formData.feedback);
    form.append("rating", formData.rating);
    if (imageFile) form.append("image", imageFile);

    const method = editingTestimonial ? "PUT" : "POST";
    const url = editingTestimonial ? `${API_URL}/${editingTestimonial._id}` : API_URL;

    const res = await fetch(url, {
      method,
      body: form,
    });

    if (res.ok) {
      fetchTestimonials(); // Refresh list
      resetForm();
    }
  };

  // ✅ Edit handler
  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      feedback: testimonial.feedback,
      image: testimonial.image,
      rating: testimonial.rating,
    });
    setImagePreview(testimonial.image);
    setIsDialogOpen(true);
  };

  // ✅ Delete handler
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this testimonial?");
    if (!confirmed) return;

    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (res.ok) fetchTestimonials();
  };

  // ✅ Reset form
  const resetForm = () => {
    setFormData({ name: "", feedback: "", image: "", rating: 5 });
    setImagePreview("");
    setImageFile(null);
    setEditingTestimonial(null);
    setIsDialogOpen(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ✅ Handle image input
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // ✅ Render stars
  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ));

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5" />
              <span>Testimonials Management</span>
            </CardTitle>
            <CardDescription>Manage customer reviews and testimonials</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                Add Testimonial
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}</DialogTitle>
                <DialogDescription>
                  {editingTestimonial ? "Update testimonial information" : "Add a new customer testimonial"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Customer Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="feedback">Feedback</Label>
                    <Textarea
                      id="feedback"
                      value={formData.feedback}
                      onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                      placeholder="Customer feedback..."
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Customer Image</Label>
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                        id="image-upload"
                        required={!editingTestimonial}
                      />
                      <Label
                        htmlFor="image-upload"
                        className="flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-50"
                      >
                        <Upload className="w-4 h-4" />
                        Upload Image
                      </Label>
                      {(imagePreview || formData.image) && (
                        <img
                          src={imagePreview || formData.image}
                          alt="Preview"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rating">Rating</Label>
                    <select
                      id="rating"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option value={5}>5 Stars</option>
                      <option value={4}>4 Stars</option>
                      <option value={3}>3 Stars</option>
                      <option value={2}>2 Stars</option>
                      <option value={1}>1 Star</option>
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button type="submit">{editingTestimonial ? "Update" : "Add"} Testimonial</Button>
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
              <TableHead>Customer</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Feedback</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.map((testimonial) => (
              <TableRow key={testimonial._id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    <img
                      src={`http://localhost:5001${testimonial.image}`}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span>{testimonial.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">{renderStars(testimonial.rating)}</div>
                </TableCell>
                <TableCell className="max-w-xs truncate">{testimonial.feedback}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(testimonial)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(testimonial._id)}>
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
