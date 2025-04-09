"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const signup = async () => {
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
        });

        if (!res.ok) {
          console.error("Failed to sync user with DB");
        }
      } catch (err) {
        console.error("Signup request failed:", err);
      }
    };

    if (isSignedIn) {
      signup();
    }
  }, [isSignedIn]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {user?.firstName} 👋</h1>
    </div>
  );
}
