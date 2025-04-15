"use client";

import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

export default function MyTasksClient({ tasks: initialTasks }) {
  const { getToken } = useAuth();
  const [tasks, setTasks] = useState(initialTasks);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async (taskId) => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("Unable to fetch token.");
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (taskId) => {
    router.push(`/edit_task/${taskId}`);
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("Unable to fetch token.");
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update task status");
      }

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-600";
      case "In Progress":
        return "text-yellow-600";
      case "Pending":
      default:
        return "text-gray-600";
    }
  };

  return (
    <>
      {error && <div className="text-red-600">{error}</div>}
      {tasks.length === 0 ? (
        <div className="w-full max-w-md px-5 py-8 mx-auto text-center">
          <img
            src="/images/no_tasks.webp"
            alt="No tasks"
            className="mx-auto mb-4 max-w-xl w-full h-auto"
          />
          <p className="text-gray-600 mb-4">Hooray! You currently have no tasks.</p>
          <button
            onClick={() => router.push("/add_tasks")}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Add Task
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="p-4 mb-4 bg-blue-100 shadow-xl rounded-md relative"
            >
              <button
                onClick={() => handleEdit(task.id)}
                className="absolute top-2 right-2 text-blue-600 hover:text-blue-800"
                title="Edit Task"
              >
                Edit
              </button>

              <h4 className="text-lg font-semibold text-blue-600">{task.title}</h4>
              <p className="text-sm text-gray-600">{task.description}</p>

              {/* Task Status Dropdown */}
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task.id, e.target.value)}
                className={`font-semibold absolute bottom-2 left-2 text-sm font-medium border rounded-md px-2 py-1 focus:outline-none focus:ring-0 focus:ring-blue-500 ${getStatusColor(
                  task.status
                )}`}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              <button
                onClick={() => handleDelete(task.id)}
                className="absolute bottom-2 right-2 text-red-600 hover:text-red-800"
                title="Delete Task"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}