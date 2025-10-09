'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddRecipePage() {
  const router = useRouter();

  // form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Done');
  const [extraField, setExtraField] = useState('');

  // submit handler
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // id auto generate from title
  //   // const id = title.toLowerCase().replace(/\s+/g, '-')+ '-' + Date.now();
  //   const id = title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();


  //   // new task object
  //   const newTask = {
  //     id,
  //     title,
  //     description,
  //     status: type,
  //     extra: extraField,
  //   };


  //   await fetch("/api/track", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(newTask),
  //   });

  //   alert('Task uploaded successfully!');
  //   router.push('/');
  // };


  // Submit handler
const handleSubmit = (e) => {
  e.preventDefault();

  const id = title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();

  const newTask = { id, title, description, status: type };

  const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  existingTasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(existingTasks));

  alert("Task uploaded successfully!");
  router.push("/");
};



  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg border">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Upload Task
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg"
            required
          />

          {/* Description */}
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg"
            required
          />

          {/* Type */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg"
          >
            <option value="Done">Done</option>
            <option value="In Progress">In Progress</option>
            <option value="Todo">Todo</option>
          </select>

        
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Upload Task
          </button> 
        </form>
      </div>
    </div>
  );
}

