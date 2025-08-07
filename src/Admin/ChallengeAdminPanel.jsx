"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../components/ui/table";
import { Textarea } from "../components/ui/textarea";
import { Loader2, PlusCircle, Trash2, Pencil } from "lucide-react";
import { Skeleton } from "../components/ui/skeleton";

const API_URL = "http://localhost:5001/api/challenges";

const AdminChallenge = () => {
  const [challenges, setChallenges] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(API_URL);
        setChallenges(res.data);
      } catch (err) {
        console.error("Failed to fetch challenges", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setIsEditing(false);
    setCurrentChallenge(null);
  };

  const handleEdit = (challenge) => {
    setCurrentChallenge(challenge);
    setTitle(challenge.title);
    setDescription(challenge.description);
    setIsEditing(true);
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${currentChallenge._id}`, { title, description });
        console.log("Challenge updated");
      } else {
        await axios.post(API_URL, { title, description });
        console.log("Challenge added");
      }

      const res = await axios.get(API_URL);
      setChallenges(res.data);
      resetForm();
      setOpen(false);
    } catch (err) {
      console.error("Failed to save challenge", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setChallenges((prev) => prev.filter((item) => item._id !== id));
      console.log("Challenge deleted");
    } catch (err) {
      console.error("Failed to delete challenge", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Manage Challenges</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Create, edit, and manage coding challenges
          </p>
        </div>
        <Dialog
          open={open}
          onOpenChange={(isOpen) => {
            if (!isOpen) resetForm();
            setOpen(isOpen);
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Challenge" : "Add New Challenge"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter challenge title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Enter detailed challenge description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={5}
                />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isEditing ? "Update" : "Submit"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border overflow-x-auto shadow-sm">
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-gray-800">
            <TableRow>
              <TableHead className="w-[200px]">Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right w-[150px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4 w-[150px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[300px]" />
                  </TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </TableCell>
                </TableRow>
              ))
            ) : challenges.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8">
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-gray-500 dark:text-gray-400">No challenges found</p>
                    <Button variant="ghost" className="text-primary" onClick={() => setOpen(true)}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create your first challenge
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              challenges.map((item) => (
                <TableRow key={item._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-300 line-clamp-2">
                    {item.description}
                  </TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(item._id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminChallenge;
