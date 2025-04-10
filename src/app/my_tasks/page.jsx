"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

export default function MyTasks() {
  const { getToken } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = await getToken();
        if (!token) {
          throw new Error("Unable to fetch token.");
        }

        const response = await fetch("/api/tasks", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data = await response.json();
        setTasks(data.tasks);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [getToken]);

  const handleDelete = async (taskId) => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("Unable to fetch token.");
      }

      const response = await fetch(`/api/tasks/${taskId}`, {
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
    router.push(`/edit_task/${taskId}`); // Redirect to the edit page for the task
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("Unable to fetch token.");
      }
  
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
  
      console.log("API Response:", response);
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Data:", errorData);
        throw new Error(errorData.error || "Failed to update task status");
      }
  
      // Update the status in the local state
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message); // Store the error message
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

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-200">
      <div className="w-full bg-white p-6">
        <h2 className="text-2xl font-semibold text-blue-800 mb-6">My Tasks</h2>

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
                {/* Edit Button */}
                <button
                  onClick={() => handleEdit(task.id)}
                  className="absolute top-2 right-2 text-blue-600 hover:text-blue-800"
                  title="Edit Task"
                >
                  ✏️
                </button>

                {/* Task Title */}
                <h4 className="text-lg font-semibold text-blue-600">{task.title}</h4>

                {/* Task Description */}
                <p className="text-sm text-gray-600">{task.description}</p> <br /><br />

                {/* Task Status Dropdown */}
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  className={`font-semibold absolute bottom-2 left-2 text-sm font-medium border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${getStatusColor(
                    task.status
                  )}`}
                >
                  <option value="Pending" className="text-gray-600">
                    Pending
                  </option>
                  <option value="In Progress" className="text-yellow-600">
                    In Progress
                  </option>
                  <option value="Completed" className="text-green-600">
                    Completed
                  </option>
                </select>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(task.id)}
                  className="absolute bottom-2 right-2 text-red-600 hover:text-red-800"
                  title="Delete Task"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}