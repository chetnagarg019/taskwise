"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {tasks as defaultTasks} from "../data/route"

export default function Page() {
  const [title, setTitle] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

     if (!title.trim()) {
      alert("Please enter a title");
      return;
    }

    // ✅ Read from "tasks" (not "task")
    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const allTasks = [...defaultTasks,...existingTasks];

    const isDefault = defaultTasks.some(
        (task) =>  task.title.toLowerCase() === title.toLowerCase()
    )

    if(isDefault){
        alert("Deafault tasks can not be deleted");
        return;
    }


    // ✅ Filter out the task with matching title
    const updatedTasks = existingTasks.filter(
      (task) => task.title.toLowerCase() !== title.toLowerCase()
    );

    // ✅ Compare before and after
    if (updatedTasks.length !== existingTasks.length) {
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      alert(`Task "${title}" deleted successfully!`);
      router.push("/");
    } else {
      alert(`Task "${title}" not found!`);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg border">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Delete Task
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Delete Task
          </button>
        </form>
      </div>
    </div>
  );
}
