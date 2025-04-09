"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function MyTasks() {
  const [tasks, setTasks] = useState([]);

  return (
    <div className="flex min-h-screen bg-gray-200">
      <div className="w-full bg-white p-6">
        <h2 className="text-2xl font-semibold text-blue-800 mb-6" style={{ marginLeft: '5%' }}>My Tasks</h2>

        {/* Displaying current tasks */}
        {tasks.length === 0 ? (
          <div className="w-full max-w-md px-5 py-8 mx-auto text-center">
            <img
              src="/images/no_tasks.webp"
              alt="No tasks"
              className="mx-auto mb-4 max-w-xl w-full h-auto"
            />
            <p className="text-gray-600 mb-4">Hooray! You currently have no tasks.</p>

            <Link
              href="/add_tasks"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition duration-300"
            >
              Add Task
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <div key={task.id} className="p-4 mb-4 bg-white shadow-md rounded-md">
                <h4 className="text-lg font-semibold">{task.title}</h4>
                <p className="text-sm text-gray-600">{task.description}</p>
                <p className="text-sm text-blue-600">{task.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


