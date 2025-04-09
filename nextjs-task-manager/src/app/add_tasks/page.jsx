"use client";
import { useState } from 'react';

export default function AddTask() {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState('Pending');

  // Handle the task submission
  const handleAddTask = (e) => {
    e.preventDefault();

    // Create a new task object
    const newTask = {
      title: taskTitle,
      description: taskDescription,
      status: taskStatus,
    };

    // Here, you'd typically send the new task to the server or state management (e.g., using Redux)
    console.log(newTask);
  };

  return (
    <div className="flex min-h-screen bg-gray-200">
      {/* Right Column: Add Task Form */}
      <div className="w-full bg-white p-6 mx-auto rounded-md">
        <h2 className="text-2xl font-semibold text-blue-800 mb-6 text-center mt-6">Add New Task</h2>

        {/* Task Form */}
        <form onSubmit={handleAddTask} className="space-y-4 ml-40">
          <div>
            <label htmlFor="taskTitle" className="block text-sm font-semibold text-gray-700">Task Title</label>
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
            <label htmlFor="taskDescription" className="block text-sm font-semibold text-gray-700">Description</label>
            <textarea
              id="taskDescription"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              required
              className="mt-2 w-200 px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="taskStatus" className="block text-sm font-semibold text-gray-700">Status</label>
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
      </div>
    </div>
  );
}
