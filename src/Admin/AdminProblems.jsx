"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";

const API_URL = "http://localhost:5001/api/problem"; // ✅ Your backend API base

const AdminProblems = () => {
  const [problems, setProblems] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    file: null,
  });
  const [editId, setEditId] = useState(null);
  const [open, setOpen] = useState(false); // control modal

  const fetchProblems = async () => {
    try {
      const res = await axios.get(API_URL);
      setProblems(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setProblems([]);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    if (form.file) formData.append("image", form.file);

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setForm({ title: "", description: "", category: "", file: null });
      setEditId(null);
      fetchProblems();
      setOpen(false); // close modal
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchProblems();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleEdit = (problem) => {
    setForm({
      title: problem.title,
      description: problem.description,
      category: problem.category,
      file: null,
    });
    setEditId(problem._id);
    setOpen(true); // open modal
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Problems</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>{editId ? "Edit Problem" : "Add Problem"}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editId ? "Edit Problem" : "Add Problem"}</DialogTitle>
              <DialogDescription>
                Fill in the form to {editId ? "update" : "add a new"} problem.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
              <div>
                <Label>Title</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Category</Label>
                <select
  value={form.category}
  onChange={(e) => setForm({ ...form, category: e.target.value })}
  className="border p-2 rounded w-full"
>
  <option value="">Select Category</option>
  <option value="weight-loss">Weight Loss</option>
  <option value="weight-gain">Weight Gain</option>
  <option value="stay-fit">Stay Fit</option>
</select>

              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
                />
              </div>
              <DialogFooter>
                <Button type="submit">{editId ? "Update" : "Create"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {problems.map((p) => (
            <TableRow key={p._id}>
              <TableCell>{p.title}</TableCell>
              <TableCell>{p.category}</TableCell>
              <TableCell>{p.description}</TableCell>
              <TableCell>
                {p.image && (
                  <img
                    src={`http://localhost:5001/uploads/${p.image}`}
                    alt={p.title}
                    className="w-24 h-16 object-cover border"
                  />
                )}
              </TableCell>
              <TableCell className="space-x-2">
                <Button variant="outline" onClick={() => handleEdit(p)}>Edit</Button>
                <Button variant="destructive" onClick={() => handleDelete(p._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminProblems;
