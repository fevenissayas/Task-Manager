"use client";

import Link from "next/link";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { useState } from "react";

export default function Sidebar() {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* hamburger menu */}
      <button
        className="md:hidden absolute top-4 left-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${isOpen ? 'stroke-black' : 'stroke-gray-800'}`}

        >
          <path
            d="M3.5625 6C3.5625 5.58579 3.89829 5.25 4.3125 5.25H20.3125C20.7267 5.25 21.0625 5.58579 21.0625 6C21.0625 6.41421 20.7267 6.75 20.3125 6.75L4.3125 6.75C3.89829 6.75 3.5625 6.41422 3.5625 6Z"
            fill="#ffffff"
          />
          <path
            d="M3.5625 18C3.5625 17.5858 3.89829 17.25 4.3125 17.25L20.3125 17.25C20.7267 17.25 21.0625 17.5858 21.0625 18C21.0625 18.4142 20.7267 18.75 20.3125 18.75L4.3125 18.75C3.89829 18.75 3.5625 18.4142 3.5625 18Z"
            fill="#ffffff"
          />
          <path
            d="M7.3125 11.25C6.89829 11.25 6.5625 11.5858 6.5625 12C6.5625 12.4142 6.89829 12.75 7.3125 12.75L17.3125 12.75C17.7267 12.75 18.0625 12.4142 18.0625 12C18.0625 11.5858 17.7267 11.25 17.3125 11.25L7.3125 11.25Z"
            fill="#ffffff"
          />
        </svg>
      </button>

      {/* Sidebar with full screen height */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:block fixed md:static top-0 left-0 h-screen w-4/5 md:w-1/5 bg-gray-200 shadow-lg p-6 flex flex-col items-center z-40`}
      >
        {/* Logo / User Section */}
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-black font-bold text-4xl mb-4">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(0 0 0)">
          <path d="M7.65625 6.34459C7.65625 3.94514 9.60139 2 12.0008 2C14.4003 2 16.3454 3.94514 16.3454 6.34459C16.3454 8.74404 14.4003 10.6892 12.0008 10.6892C9.60139 10.6892 7.65625 8.74404 7.65625 6.34459Z" fill="#005dd8"></path>
          <path d="M3.68359 17.439C3.68359 14.5395 6.0341 12.189 8.93359 12.189H15.0686C17.9681 12.189 20.3186 14.5395 20.3186 17.439V18.75C20.3186 19.9926 19.3113 21 18.0686 21H5.93359C4.69095 21 3.68359 19.9926 3.68359 18.75V17.439Z" fill="#005dd8"></path>
          </svg>
          </h1>
          <h3 className="text-xl text-black font-semibold">
            {user?.fullName || "Guest"}
          </h3>
          <p className="text-sm text-gray-500">
            {user?.primaryEmailAddress?.emailAddress || "No Email"}
          </p>
        </div>

        {/* Navigation */}
        <div className="space-y-2 w-full">
          <Link
            href="/my_tasks"
            className="block w-full text-center text-blue-600 hover:bg-gray-600 hover:text-white py-3 transition"
          >
            My Tasks
          </Link>
          <Link
            href="/add_tasks"
            className="block w-full text-center text-blue-600 hover:bg-gray-600 hover:text-white py-3 transition"
          >
            Add Task
          </Link>
          <Link
            href="/edit_profile"
            className="block w-full text-center text-blue-600 hover:bg-gray-600 hover:text-white py-3 transition"
          >
            Edit Profile
          </Link>
          <SignOutButton>
            <button className="block text-center text-red-600 hover:underline py-3 w-full">
              Logout
            </button>
          </SignOutButton>
        </div>
      </div>
    </>
  );
}