"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function UpdateTaskPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [task, setTask] = useState({ title: "", description: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [taskId, setTaskId] = useState<string | null>(null);

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    params.then((resolvedParams) => {
      setTaskId(resolvedParams.id);
    });
  }, [params]);

  useEffect(() => {
    if (!taskId) return;

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
  }, [taskId, router, BASE_URL]);

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
        <form onSubmit={handleUpdate} className="space-y-4 ml-50">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              className="mt-2 px-4 py-2 w-200 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              className="mt-2 px-4 py-2 w-200 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={5}
              required
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition duration-300"
            >
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}