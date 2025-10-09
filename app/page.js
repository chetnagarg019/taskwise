"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { tasks as defaultTasks } from "./data/route"; // default tasks import

export default function Page() {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  // Load tasks (default if localStorage empty)
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (!savedTasks || savedTasks.length === 0) {
      localStorage.setItem("tasks", JSON.stringify(defaultTasks));
      setTasks(defaultTasks);
    } else {
      setTasks(savedTasks);
    }
  }, []);

  // Update task status
  function updateStatus(id, newStatus) {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
        TaskWise
      </h1>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => router.push("/add-task")}
          className="px-4 py-2 bg-white text-black rounded-lg cursor-pointer"
        >
          Add Task
        </button>

        <button
          onClick={() => router.push("/delete-task")}
          className="px-4 py-2 bg-white text-black rounded-lg cursor-pointer"
        >
          Delete Task
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`p-5 rounded-2xl shadow-md hover:shadow-xl transition transform hover:scale-[1.02]
              ${
                task.status === "Todo"
                  ? "bg-red-200"
                  : task.status === "In Progress"
                  ? "bg-yellow-200"
                  : "bg-green-200"
              }`}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{task.title}</h3>
            <p className="text-gray-700 mb-3">{task.description}</p>
            <p className="text-sm font-medium text-gray-600">
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

            <div className="flex gap-2 mt-3">
              <button
                className="px-2 py-1 bg-white text-black rounded cursor-pointer"
                onClick={() => updateStatus(task.id, "Todo")}
              >
                Todo
              </button>
              <button
                className="px-2 py-1 bg-white text-black rounded cursor-pointer"
                onClick={() => updateStatus(task.id, "In Progress")}
              >
                In Progress
              </button>
              <button
                className="px-2 py-1 bg-white text-black rounded cursor-pointer"
                onClick={() => updateStatus(task.id, "Done")}
              >
                Done
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

