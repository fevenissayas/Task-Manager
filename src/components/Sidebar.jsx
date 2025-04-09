import Link from "next/link";
import { useUser, SignOutButton } from "@clerk/nextjs";

export default function Sidebar() {
  const { user } = useUser();

  return (
    <div className="w-1/5 bg-gray-200 shadow-lg p-6 flex flex-col items-center">
      {/* User Profile */}
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-black font-bold">😊</h1>
        <h3 className="text-xl text-black font-semibold">{user?.fullName || "Guest"}</h3>
        <p className="text-sm text-gray-500">{user?.primaryEmailAddress?.emailAddress || "No Email"}</p>
      </div>

      {/* Navigation Links */}
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

        {/* Logout */}
        <SignOutButton>
          <button className="block text-center text-red-600 hover:underline py-3 w-full">
            Logout
          </button>
        </SignOutButton>
      </div>
    </div>
  );
}