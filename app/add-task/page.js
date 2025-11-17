"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import { tasks as defaultTasks } from "../data/route";
import { loadTasks,saveTasks } from "../utils/storage";

export default function AddRecipePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Done");

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = title.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();
    const newTask = { id, title, description, status: type };

    const existingTasks = loadTasks();
    existingTasks.unshift(newTask);
   saveTasks(existingTasks)
    alert("Task uploaded successfully!");
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-blue-200">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-indigo-700">
          🚀 Upload Task
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <input
            type="text"
            placeholder="Enter task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            required
          />

          {/* Description */}
          <input
            type="text"
            placeholder="Enter task description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            required
          />

          {/* Type */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:from-indigo-600 hover:to-blue-600 transition-all shadow-md"
          >
            Upload Task
          </button>
        </form>
      </div>
    </div>
  );
}
