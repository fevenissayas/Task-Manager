"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {user?.firstName} 👋</h1>
    </div>
  );
}