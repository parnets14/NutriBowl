"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "../components/ui/table";

const API_URL = "http://localhost:5001/api/missionvision";

const MissionVisionAdmin = () => {
  const [data, setData] = useState([]);
  const [newEntry, setNewEntry] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [open, setOpen] = useState(false); // Controls Dialog open state

  const fetchData = async () => {
    try {
      const res = await axios.get(API_URL);
      setData(res.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry({ ...newEntry, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, newEntry);
      } else {
        await axios.post(API_URL, newEntry);
      }
      setNewEntry({ title: "", description: "" });
      setEditingId(null);
      setOpen(false); // Close dialog
      fetchData();
    } catch (err) {
      console.error("Error saving data", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchData();
    } catch (err) {
      console.error("Error deleting entry", err);
    }
  };

  const handleEdit = (entry) => {
    setNewEntry({ title: entry.title, description: entry.description });
    setEditingId(entry._id);
    setOpen(true); // Open dialog for editing
  };

  const handleAddNew = () => {
    setNewEntry({ title: "", description: "" });
    setEditingId(null);
    setOpen(true); // Open dialog for adding
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Mission & Vision Admin Panel</h2>

      <div className="mb-4 text-right">
        <Button onClick={handleAddNew}>Add New</Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-lg shadow-md max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Entry" : "Add New Entry"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                name="title"
                value={newEntry.title}
                onChange={handleInputChange}
                placeholder="Enter title"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                name="description"
                value={newEntry.description}
                onChange={handleInputChange}
                placeholder="Enter description"
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button onClick={handleSubmit}>
              {editingId ? "Update Entry" : "Add Entry"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="mt-6 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/4">Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-40 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="font-semibold">{item.title}</TableCell>
                <TableCell className="whitespace-pre-wrap">{item.description}</TableCell>
                <TableCell className="text-center space-x-2">
                  <Button
                    variant="outline"
                    className="text-blue-600 border-blue-500 hover:bg-blue-50"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MissionVisionAdmin;
