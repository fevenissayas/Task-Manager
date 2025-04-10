"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

export default function AddTask() {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("Pending");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { getToken } = useAuth();

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleAddTask = async (e) => {
    e.preventDefault();
    setError(null);

    const newTask = {
      title: taskTitle,
      description: taskDescription,
      status: taskStatus,
    };

    try {
      const token = await getToken();

      const response = await fetch(`${BASE_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      router.push("/my_tasks");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-200">
      <div className="w-full bg-white p-6 mx-auto rounded-md">
        <h2 className="text-2xl font-semibold text-blue-800 mb-6 text-center mt-6">
          Add New Task
        </h2>
        <form onSubmit={handleAddTask} className="space-y-4 ml-40">
          <div>
            <label
              htmlFor="taskTitle"
              className="block text-sm font-semibold text-gray-700"
            >
              Task Title
            </label>
            <input
              type="text"
              id="taskTitle"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              required
              className="mt-2 w-200 px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="taskDescription"
              className="block text-sm font-semibold text-gray-700"
            >
              Description
            </label>
            <textarea
              id="taskDescription"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              required
              className="mt-2 w-200 px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="taskStatus"
              className="block text-sm font-semibold text-gray-700"
            >
              Status
            </label>
            <input
              type="text"
              id="taskStatus"
              value="Pending"
              readOnly
              className="mt-2 w-200 px-4 py-2 text-black bg-gray-100 border border-gray-300 rounded-md focus:outline-none cursor-not-allowed"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-auto mt-18 px-5 block mx-auto bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-300"
            >
              Add Task
            </button>
          </div>
        </form>

        {error && (
          <p
            className={`text-center mt-4 ${
              error.toLowerCase().includes("success")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {error}
          </p>
        )}
        
      </div>
    </div>
  );
}