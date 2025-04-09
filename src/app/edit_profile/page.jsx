"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import DebugToken from "@/components/DebugToken";

export default function EditProfile() {
  const { user, isLoaded } = useUser(); // Fetch the current logged-in user
  const [fullName, setFullName] = useState(""); // Name from Clerk
  const [email, setEmail] = useState(""); // Email from Clerk
  const [password, setPassword] = useState(""); // New password
  const [message, setMessage] = useState(null); // Feedback message
  const [loading, setLoading] = useState(false); // Submit button loading state

  // Pre-fill user details when the user is loaded
  useEffect(() => {
    if (isLoaded && user) {
      setFullName(user.fullName || ""); // Use Clerk's fullName
      setEmail(user.emailAddresses[0]?.emailAddress || ""); // Use Clerk's primary email
    }
  }, [isLoaded, user]);

  const handleSubmit = async (e) => {
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
      // update name in clerk
      await user.update({
        firstName: fullName.split(" ")[0], // update first name
        lastName: fullName.split(" ").slice(1).join(" "), // update last name
      });

      // Handle password updates separately
      if (password) {
        await user.startPasswordReset(); // Trigger Clerk's password reset flow
        setMessage(
          "Name updated successfully. A password reset email has been sent."
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
    <div className="flex min-h-screen bg-gray-200">
      <div className="w-full bg-white p-6">
        <h2 className="text-2xl font-semibold text-blue-800 mb-6 text-center mt-8">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 ml-50">
          {/* Full Name Input */}
          <div>
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
              className="mt-2 px-4 py-2 w-200 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email (Static, not editable) */}
          <div>
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
              className="mt-2 px-4 py-2 w-200 text-black border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Password Input */}
          <div>
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
              className="mt-2 px-4 py-2 w-200 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className={`bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition duration-300 mt-10 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>

          {/* Feedback Message */}
          {message && (
            <p
              className={`text-center mt-4 ${
                message.toLowerCase().includes("success")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <DebugToken />
        </form>
      </div>
    </div>
  );
}