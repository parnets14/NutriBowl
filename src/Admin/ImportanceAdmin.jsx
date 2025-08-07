import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem 
} from '../components/ui/select';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';

const API_URL = "http://localhost:5001/api/importance";

const CATEGORIES = [
  { value: 'weight-gain', label: 'Weight Gain' },
  { value: 'weight-loss', label: 'Weight Loss' },
  { value: 'stay-fit', label: 'Stay Fit' }
];

const ImportanceAdmin = () => {
  const [importanceItems, setImportanceItems] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: null,
    category: ''
  });
  const [editId, setEditId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchImportanceItems();
  }, []);

  const fetchImportanceItems = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data } = await axios.get(API_URL);
      // Ensure data is always an array
      setImportanceItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching importance items:", error);
      setError("Failed to fetch items. Please try again.");
      setImportanceItems([]); // Reset to empty array on error
    } finally {
      setIsLoading(false);
    }
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
  setError(null);

  // Validate required fields before submission
  if (!formData.title || !formData.description || !formData.category || (!formData.icon && !editId)) {
    setError('Please fill all required fields');
    setIsLoading(false);
    return;
  }

  const formPayload = new FormData();
  // Append fields in this specific order
  formPayload.append('title', formData.title);
  formPayload.append('description', formData.description);
  formPayload.append('category', formData.category);
  if (formData.icon) {
    formPayload.append('icon', formData.icon);
  }

  try {
    const url = editId ? `${API_URL}/${editId}` : API_URL;
    const method = editId ? 'put' : 'post';
    
    const response = await axios[method](url, formPayload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    resetForm();
    fetchImportanceItems();
    setIsDialogOpen(false);
  } catch (error) {
    console.error("Submission Error:", error);
    setError(
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Failed to save. Please try again.'
    );
  } finally {
    setIsLoading(false);
  }
};

  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      description: item.description,
      icon: null,
      category: item.category
    });
    setImagePreview(item.icon ? `http://localhost:5001/uploads/${item.icon}` : '');
    setEditId(item._id);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      await axios.delete(`${API_URL}/${id}`);
      fetchImportanceItems();
    } catch (error) {
      console.error("Error deleting importance item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: null,
      category: ''
    });
    setImagePreview('');
    setEditId(null);
  };

  const getFilteredItems = () => {
    try {
      if (!Array.isArray(importanceItems)) return [];
      
      return filterCategory === 'all' 
        ? importanceItems 
        : importanceItems.filter(item => item?.category === filterCategory);
    } catch (err) {
      console.error("Filtering error:", err);
      return [];
    }
  };

  const filteredItems = getFilteredItems();
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Fitness Importance Management</h1>
        
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          if (!open) resetForm();
          setIsDialogOpen(open);
        }}>
          <Button 
            variant="default"
            onClick={() => {
              resetForm();
              setIsDialogOpen(true);
            }}
          >
            Add New Item
          </Button>
          
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editId ? "Edit Item" : "Create New Item"}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title*</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter title"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description*</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter description"
                  required
                  rows={3}
                  disabled={isLoading}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="icon">Icon Image*</Label>
                <Input
                  id="icon"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="cursor-pointer"
                  disabled={isLoading}
                  required={!editId}
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
                <Label>Category*</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Processing..." : editId ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="mb-6">
        <Label>Filter by Category:</Label>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
       <div className="border rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="p-4 text-center">Loading items...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Icon</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      {item.icon && (
                        <img
                          src={`http://localhost:5001/uploads/${item.icon}`}
                          alt={item.title}
                          className="h-[30px] object-contain"
                        />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell className="max-w-[300px] truncate">{item.description}</TableCell>
                    <TableCell>
                      {CATEGORIES.find(c => c.value === item.category)?.label || item.category}
                    </TableCell>
                    <TableCell className="space-x-2 text-right">
                      <Button 
                        variant="outline" 
                        onClick={() => handleEdit(item)}
                        disabled={isLoading}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(item._id)}
                        disabled={isLoading}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    {importanceItems.length === 0 
                      ? "No items available" 
                      : "No items match the selected filter"}
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

export default ImportanceAdmin;