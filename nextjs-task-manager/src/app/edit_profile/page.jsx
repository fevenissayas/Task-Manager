"use client";

import { useState } from 'react';

export default function EditProfile() {
  const [fullName, setFullName] = useState('Feven Issayas'); // default name
  const [email, setEmail] = useState('fevennissayas@gmail.com'); // default email (static)
  const [password, setPassword] = useState(''); // default empty password

  // Handling form submit (You can add functionality to save the changes later)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', { fullName, password });
    // You can add a call to an API to update the profile information
  };

  return (
    <div className="flex min-h-screen bg-gray-200">
      {/* Right Column: Edit Profile */}
      <div className="w-full bg-white p-6">
        <h2 className="text-2xl font-semibold text-blue-800 mb-6 text-center mt-8">Edit Profile</h2>

        {/* Profile Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-4 ml-50">
          {/* Full Name Input */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-2 px-4 py-2 w-200 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email (Static, not editable) */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              disabled
              className="mt-2 px-4 py-2 w-200 text-black border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 px-4 py-2 w-200 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition duration-300 mt-10"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
