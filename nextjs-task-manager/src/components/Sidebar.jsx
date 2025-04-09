// components/Sidebar.jsx
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-1/5 bg-gray-200 shadow-lg p-6 flex flex-col items-center">
      {/* User Profile */}
      <div className="flex flex-col items-center mb-8">
        <h3 className="text-xl font-semibold text-black">Feven Issayas</h3>
        <p className="text-sm text-gray-600">fevennissayas@gmail.com</p>
      </div>

      {/* Navigation Links */}
      <div className="mt-4 space-y-2 w-full">
        <Link href="/my_tasks" className="block w-full text-center text-blue-600 hover:bg-gray-600 hover:text-white py-3 transition">
          My Tasks
        </Link>
        <Link href="/add_tasks" className="block w-full text-center text-blue-600 hover:bg-gray-600 hover:text-white py-3 transition">
          Add Task
        </Link>
        <Link href="/edit_profile" className="block w-full text-center text-blue-600 hover:bg-gray-600 hover:text-white py-3 transition">
          Edit Profile
        </Link>
        <Link href="/logout" className="block text-center text-red-600 hover:underline py-3">
          Logout
        </Link>
      </div>
    </div>
  );
}