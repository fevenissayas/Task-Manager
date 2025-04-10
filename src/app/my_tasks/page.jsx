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

        const response = await fetch(`api/tasks`, {
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

      const response = await fetch(`api/tasks/${taskId}`, {
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
    router.push(`edit_task/${taskId}`);
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("Unable to fetch token.");
      }
  
      const response = await fetch(`api/tasks/${taskId}`, {
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
  
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error("Error:", error.message);
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
                  <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(0 0 0)">
                  <path d="M13.803 6.09787L5.83373 14.0672C5.57259 14.3283 5.37974 14.6497 5.27221 15.003L4.05204 19.0121C3.9714 19.2771 4.04336 19.565 4.23922 19.7608C4.43508 19.9567 4.72294 20.0287 4.98792 19.948L8.99703 18.7279C9.35035 18.6203 9.67176 18.4275 9.93291 18.1663L17.9022 10.1971L13.803 6.09787Z" fill="#343C54"></path>
                  <path d="M18.9628 9.13643L20.22 7.87928C21.0986 7.0006 21.0986 5.57598 20.22 4.6973L19.3028 3.7801C18.4241 2.90142 16.9995 2.90142 16.1208 3.7801L14.8637 5.03721L18.9628 9.13643Z" fill="#343C54"></path>
                  </svg>
                </button>

                {/* Task Title */}
                <h4 className="text-lg font-semibold text-blue-600">{task.title}</h4>

                {/* Task Description */}
                <p className="text-sm text-gray-600">{task.description}</p> <br /><br />

                {/* Task Status Dropdown */}
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  className={`font-semibold absolute bottom-2 left-2 text-sm font-medium border rounded-md px-2 py-1 focus:outline-none focus:ring-0 focus:ring-blue-500 ${getStatusColor(
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

                <button
                  onClick={() => handleDelete(task.id)}
                  className="absolute bottom-2 right-2 text-red-600 hover:text-red-800"
                  title="Delete Task"
                >
                  <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(0 0 0)">
                  <path d="M10 9.75C10.4142 9.75 10.75 10.0858 10.75 10.5V16.5C10.75 16.9142 10.4142 17.25 10 17.25C9.58579 17.25 9.25 16.9142 9.25 16.5V10.5C9.25 10.0858 9.58579 9.75 10 9.75Z" fill="#FF0000"></path>
                  <path d="M14.75 10.5C14.75 10.0858 14.4142 9.75 14 9.75C13.5858 9.75 13.25 10.0858 13.25 10.5V16.5C13.25 16.9142 13.5858 17.25 14 17.25C14.4142 17.25 14.75 16.9142 14.75 16.5V10.5Z" fill="#FF0000"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99951 4.25C7.99951 3.00736 9.00687 2 10.2495 2H13.7495C14.9922 2 15.9995 3.00736 15.9995 4.25V5H19.999C20.4132 5 20.749 5.33579 20.749 5.75C20.749 6.16421 20.4132 6.5 
                  19.999 6.5H19.5V19.75C19.5 20.9926 18.4926 22 17.25 22H6.75C5.50736 22 4.5 20.9926 4.5 19.75V6.5H4C3.58579 6.5 3.25 6.16421 3.25 5.75C3.25 5.33579 3.58579 5 4 5H7.99951V4.25ZM18 6.5H6V19.75C6 20.1642 6.33579 20.5 6.75 
                  20.5H17.25C17.6642 20.5 18 20.1642 18 19.75V6.5ZM9.49951 5H14.4995V4.25C14.4995 3.83579 14.1637 3.5 13.7495 3.5H10.2495C9.8353 3.5 9.49951 3.83579 9.49951 4.25V5Z" fill="#FF0000"></path>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}