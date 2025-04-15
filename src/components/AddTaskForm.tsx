"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

export default function AddTaskForm() {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus] = useState("Pending");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { getToken } = useAuth();

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const newTask = {
      title: taskTitle,
      description: taskDescription,
      status: taskStatus,
    };

    try {
      const token = await getToken();

      const response = await fetch(`/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add task");
      }

      router.push("/my_tasks");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleAddTask} className="space-y-6">
      {/* Task Title Input */}
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
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
            className="mt-2 w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 lg:text-lg lg:px-6"
          />
        </div>
      </div>

      {/* Task Description Textarea */}
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
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
            className="mt-2 w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 lg:text-lg lg:px-6"
            rows={4}
          />
        </div>
      </div>

      {/* Task Status Input (Read-Only) */}
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
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
            className="mt-2 w-full px-4 py-2 text-black bg-gray-100 border border-gray-300 rounded-md focus:outline-none cursor-not-allowed lg:text-lg lg:px-6"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="mt-6 px-5 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-300 inline-block"
        >
          Add Task
        </button>
      </div>

      {/* Error/Feedback Message */}
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
    </form>
  );
}