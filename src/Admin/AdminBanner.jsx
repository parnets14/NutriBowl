"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
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
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Edit, Trash2, Plus } from "lucide-react";

const API_URL = "http://localhost:5001/api/banner";

export default function AdminBanner() {
  const [banners, setBanners] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    image: null,
    description: "",
    points: [""],
  });
  const [editingBanner, setEditingBanner] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchBanners();
  }, []);

 const fetchBanners = async () => {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    if (Array.isArray(data)) {
      setBanners(data);
    } else if (Array.isArray(data.banners)) {
      setBanners(data.banners);
    } else {
      console.error("Unexpected response format:", data);
      setBanners([]);
    }
  } catch (err) {
    console.error("Failed to fetch banners:", err);
    setBanners([]);
  }
};


  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      image: null,
      description: "",
      points: [""],
    });
    setEditingBanner(null);
    setImagePreview(null);
    setDialogOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("title", formData.title);
    fd.append("subtitle", formData.subtitle);
    fd.append("description", formData.description);
    formData.points.forEach((point) => fd.append("points", point));
    if (formData.image) {
      fd.append("image", formData.image);
    }

    try {
      if (editingBanner) {
        await fetch(`${API_URL}/${editingBanner._id}`, {
          method: "PUT",
          body: fd,
        });
      } else {
        await fetch(API_URL, {
          method: "POST",
          body: fd,
        });
      }
      fetchBanners();
      resetForm();
    } catch (err) {
      console.error("Error saving banner", err);
    }
  };

  const handleEdit = (banner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle,
      image: null,
      description: banner.description,
      points: banner.points,
    });
   setImagePreview(`http://localhost:5001${banner.image.replace(/\\/g, "/")}`);

    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this banner?")) {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      fetchBanners();
    }
  };

  const handlePointChange = (index, value) => {
    const updatedPoints = [...formData.points];
    updatedPoints[index] = value;
    setFormData({ ...formData, points: updatedPoints });
  };

  const addPointField = () => {
    setFormData({ ...formData, points: [...formData.points, ""] });
  };

  const removePointField = (index) => {
    const updatedPoints = formData.points.filter((_, i) => i !== index);
    setFormData({ ...formData, points: updatedPoints });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-green-700">Banner Management</CardTitle>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Banner
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>{editingBanner ? "Edit" : "Add"} Banner</DialogTitle>
                <DialogDescription>
                  {editingBanner ? "Update banner info" : "Add a new banner section"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Subtitle</Label>
                      <Input
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Upload Image</Label>
                    <Input type="file" accept="image/*" onChange={handleImageUpload} />
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mt-2 w-32 h-32 object-cover rounded-md border"
                      />
                    )}
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
                    <Label>Points</Label>
                    {formData.points.map((point, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <Input
                          value={point}
                          onChange={(e) => handlePointChange(index, e.target.value)}
                          required
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => removePointField(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button type="button" onClick={addPointField}>
                      + Add Point
                    </Button>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    {editingBanner ? "Update" : "Add"} Banner
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
                <TableHead>Banner</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Subtitle</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {banners.map((banner) => (
                <TableRow key={banner._id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                       src={`http://localhost:5001${banner.image.replace(/\\/g, "/")}`}
                        alt={banner.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-medium">{banner.title}</div>
                        <div className="text-sm text-gray-500">{banner.description}</div>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {banner.points.map((point, idx) => (
                            <Badge key={idx}>{point}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{banner.title}</TableCell>
                  <TableCell>{banner.subtitle}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(banner)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(banner._id)}>
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
