import Link from "next/link";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { useState } from "react";

export default function Sidebar() {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger icon (top-left corner on small screens) */}
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
          <h1 className="text-black font-bold text-4xl mb-4">👤</h1>
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