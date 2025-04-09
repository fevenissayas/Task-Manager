import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-white px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Log In</h2>
        <LoginForm />
        <div className="mt-4 text-center">
          <p className="text-sm text-black">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
