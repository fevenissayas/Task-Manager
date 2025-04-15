"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function EditProfileForm() {
  const { user, isLoaded } = useUser();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      setFullName(user.fullName || "");
      setEmail(user.emailAddresses[0]?.emailAddress || "");
    }
  }, [isLoaded, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      alert("Full name is required");
      return;
    }

    if (fullName.split(" ").length < 2) {
      alert("Please provide both first and last names");
      return;
    }

    if (password && password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      await user.update({
        firstName: fullName.split(" ")[0],
        lastName: fullName.split(" ").slice(1).join(" "),
      });

      if (password) {
        setMessage(
          "Name updated successfully. Please reset your password by following the password reset instructions in your account settings."
        );
      } else {
        setMessage("Profile updated successfully");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Full Name Input */}
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-2 px-4 py-2 w-full text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 lg:text-lg lg:px-6"
            required
          />
        </div>
      </div>

      {/* Email (Static, not editable) */}
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            disabled
            className="mt-2 px-4 py-2 w-full text-black border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed lg:text-lg lg:px-6"
          />
        </div>
      </div>

      {/* Password Input */}
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 px-4 py-2 w-full text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 lg:text-lg lg:px-6"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className={`bg-blue-600 text-white px-6 py-2 inline-block max-w-sm rounded-xl hover:bg-blue-700 transition duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          } lg:text-lg lg:px-6`}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Feedback Message */}
      {message && (
        <p
          className={`text-center mt-4 ${
            message.toLowerCase().includes("success") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}