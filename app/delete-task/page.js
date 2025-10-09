"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { tasks as defaultTasks } from "../data/route";

export default function Page() {
  const [title, setTitle] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }

    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const allTasks = [...defaultTasks, ...existingTasks];

    const isDefault = defaultTasks.some(
      (task) => task.title.toLowerCase() === title.toLowerCase()
    );

    if (isDefault) {
      alert("Default tasks cannot be deleted");
      return;
    }

    const updatedTasks = existingTasks.filter(
      (task) => task.title.toLowerCase() !== title.toLowerCase()
    );

    if (updatedTasks.length !== existingTasks.length) {
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      alert(`Task "${title}" deleted successfully!`);
      router.push("/");
    } else {
      alert(`Task "${title}" not found!`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 border border-blue-200">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
          🗑️ Delete Task
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
           
            <input
              type="text"
              placeholder="Enter task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-2 border-blue-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none px-4 py-2.5 rounded-lg text-gray-700 placeholder-gray-400 transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 active:bg-blue-800 transition-all duration-200"
          >
            Delete Task
          </button>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="w-full bg-gray-200 text-gray-800 py-2.5 rounded-lg font-medium hover:bg-gray-300 transition-all"
          >
            ← Back to Home
          </button>
        </form>
      </div>
    </div>
  );
}
