"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { tasks as defaultTasks } from "./data/route"; //data/rote.js me jake tasks utha liye 
import { loadTasks,saveTasks } from "./utils/storage"; // utils/storage me jake load kr diya tasks ko 

export default function Page() {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();


  useEffect(() => {
    const saved = loadTasks() || [];
    const merged = [
      ...defaultTasks.filter((dt) => !saved.some((st) => st.id !== dt.id)),
      ...saved,
    ];
    saveTasks(merged);
    setTasks(merged)
  },[])

  // Update status

  function updateStatus(id, newStatus) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-200 to-blue-300 p-6">
      {/* Header */}
      <h1 className="text-5xl font-extrabold text-center text-indigo-800 drop-shadow-md mb-10">
        🧠 Smart Issue Tracker
      </h1>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={() => router.push("/add-task")}
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl text-lg font-semibold shadow-md hover:from-indigo-600 hover:to-blue-600 transition-all cursor-pointer"
        >
          ➕ Add Task....
        </button>

        <button
          onClick={() => router.push("/delete-task")}
          className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl text-lg font-semibold shadow-md hover:from-red-600 hover:to-pink-600 transition-all cursor-pointer"
        >
          🗑 Delete Task....
        </button>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-10">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`p-6 rounded-2xl backdrop-blur-md shadow-lg border border-white/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.03]
              ${
                task.status === "Todo" ? "bg-red-100/80"
                  : task.status === "In Progress" ? "bg-yellow-100/80"
                  : "bg-green-100/80"
              }`}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {task.title}
            </h3>
            <p className="text-gray-600 mb-3">{task.description}</p>

            <p className="text-sm font-medium text-gray-700 mb-3">
              Status:{" "}
              <span
                className={`font-bold ${
                  task.status === "Todo"
                    ? "text-red-700"
                    : task.status === "In Progress"
                    ? "text-yellow-700"
                    : "text-green-700"
                }`}
              >
                {task.status}
              </span>
            </p>

            <div className="flex flex-wrap gap-2 mt-2">
              <button
                onClick={() => updateStatus(task.id, "Todo")}
                className="px-3 py-1 bg-white/70 text-gray-900 rounded-lg hover:bg-red-200 transition cursor-pointer"
              >
                Todo
              </button>
              <button
                onClick={() => updateStatus(task.id, "In Progress")}
                className="px-3 py-1 bg-white/70 text-gray-900 rounded-lg hover:bg-yellow-200 transition cursor-pointer"
              >
                In Progress
              </button>
              <button
                onClick={() => updateStatus(task.id, "Done")}
                className="px-3 py-1 bg-white/70 text-gray-900 rounded-lg hover:bg-green-200 transition cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {tasks.length === 0 && (
        <p className="text-center text-gray-700 mt-10 text-lg">
          No tasks available. Add one to get started!
        </p>
      )}
    </div>
  );
}
