import SignupForm from "@/components/SignupForm";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-white px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Sign Up</h2>
        <SignupForm />
        <div className="mt-4 text-center">
          <p className="text-sm text-black">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
