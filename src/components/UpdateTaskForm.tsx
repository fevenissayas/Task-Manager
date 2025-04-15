"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UpdateTaskForm({ task, taskId }: { task: { title: string; description: string }; taskId: string }) {
  const [taskData, setTaskData] = useState(task);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      alert("Task updated successfully");
      router.push("/my_tasks");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-6">
      {/* Title Input */}
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={taskData.title}
            onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
            className="mt-2 px-4 py-2 w-full text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 lg:text-lg lg:px-6"
          />
        </div>
      </div>

      {/* Description Textarea */}
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={taskData.description}
            onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
            className="mt-2 px-4 py-2 w-full text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 lg:text-lg lg:px-6"
            rows={5}
            required
          ></textarea>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition duration-300 inline-block"
        >
          Update Task
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-600 text-center mt-4">{error}</p>}
    </form>
  );
}