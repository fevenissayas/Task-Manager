"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UpdateTaskPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params; // Fetch the task ID from the dynamic route
  const [task, setTask] = useState({ title: "", description: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the task details to prefill the form
    const fetchTask = async () => {
      try {
        const response = await fetch(`/api/tasks/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch task");
        }
        const data = await response.json();
        setTask(data);
      } catch (error) {
        console.error("Error fetching task:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true); // Set loading state to true during update
      const response = await fetch(`/api/tasks/${id}`, {
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
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex min-h-screen bg-gray-200">
      {/* Right Column: Update Task */}
      <div className="w-full bg-white p-6">
        <h2 className="text-2xl font-semibold text-blue-800 mb-6 text-center mt-8">
          Update Task
        </h2>

        {/* Task Update Form */}
        <form onSubmit={handleUpdate} className="space-y-4 ml-50">
          {/* Title Input */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              className="mt-2 px-4 py-2 w-200 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description Input */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
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

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className={`bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition duration-300 mt-10 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}