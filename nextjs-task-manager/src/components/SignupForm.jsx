"use client";
import { useState } from "react";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Signed up with", name, email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Name input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-black">Full Name</label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Email input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-black">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Password input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-black">Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {/* Confirm Password input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-black">Confirm Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-auto px-5 block mx-auto bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-300"
      >
        Sign Up
      </button>
    </form>
  );
}
