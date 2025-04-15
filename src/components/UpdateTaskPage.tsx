"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function UpdateTaskPage({ taskId }: { taskId: string }) {
  const router = useRouter();
  const [task, setTask] = useState({ title: "", description: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTask() {
      try {
        const response = await fetch(`/api/tasks/${taskId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch task details");
        }
        const data = await response.json();
        setTask({ title: data.title, description: data.description });
      } catch (error) {
        console.error("Error fetching task:", error);
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    }

    fetchTask();
  }, [taskId, router]);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error("Failed to update task");
      }
      alert("Task updated successfully");
      router.push("/my_tasks");
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-200">
      <div className="w-full bg-white p-6">
        <h2 className="text-2xl font-semibold text-blue-800 mb-6 text-center mt-8">
          Update Task
        </h2>
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
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
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
                value={task.description}
                onChange={(e) => setTask({ ...task, description: e.target.value })}
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
        </form>
      </div>
    </div>
  );
}