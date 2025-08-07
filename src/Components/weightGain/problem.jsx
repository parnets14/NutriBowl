import React, { useState, useEffect } from "react";
import axios from "axios";

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    file: null,
  });
  const [editId, setEditId] = useState(null);

  const fetchProblems = async () => {
    try {
      const res = await axios.get("/api/problem");
      console.log("Fetched problems:", res.data);
      if (Array.isArray(res.data)) {
        setProblems(res.data);
      } else {
        console.error("Expected an array but got:", res.data);
        setProblems([]);
      }
    } catch (err) {
      console.error("Failed to fetch problems:", err);
      setProblems([]);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("category", form.category);
      if (form.file) formData.append("image", form.file);

      if (editId) {
        await axios.put(`/api/problems/${editId}`, formData);
        setEditId(null);
      } else {
        await axios.post("/api/problems", formData);
      }

      setForm({ title: "", description: "", category: "", file: null });
      fetchProblems();
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/problems/${id}`);
      fetchProblems();
    } catch (err) {
      console.error("Delete failed:", err);
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
  };

  const groupedByCategory = problems.reduce((acc, curr) => {
    if (!acc[curr.category]) acc[curr.category] = [];
    acc[curr.category].push(curr);
    return acc;
  }, {});

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{editId ? "Edit Problem" : "Add Problem"}</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-8" encType="multipart/form-data">
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2"
        />
        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border p-2"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
          className="border p-2"
        />
        <button className="bg-green-600 text-white py-2 rounded">
          {editId ? "Update" : "Create"}
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">Problems by Category</h3>
      {Object.entries(groupedByCategory).map(([category, items]) => (
        <div key={category} className="mb-6">
          <h4 className="text-lg font-bold text-green-700 mb-2">{category}</h4>
          <div className="space-y-4">
            {items.map((p) => (
              <div key={p._id} className="border p-4 rounded shadow-sm flex justify-between items-start gap-4">
                <div>
                  <h4 className="text-lg font-bold">{p.title}</h4>
                  <p className="text-sm text-gray-600">{p.description}</p>
                  <p className="text-xs text-gray-400">Category: {p.category}</p>
                  {p.image && (
                    <img
                      src={`http://localhost:5000/uploads/${p.image}`}
                      alt={p.title}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/150?text=No+Image";
                      }}
                      className="w-40 h-24 object-cover mt-2 border"
                    />
                  )}
                </div>
                <div className="space-x-2">
                  <button onClick={() => handleEdit(p)} className="text-blue-600">Edit</button>
                  <button onClick={() => handleDelete(p._id)} className="text-red-600">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Problems;
