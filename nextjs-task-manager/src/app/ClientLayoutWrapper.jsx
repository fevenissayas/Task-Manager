"use client";

import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Sidebar from "../components/Sidebar";
import Footer from "../components/footer/footer";
import { useUser } from "@clerk/nextjs";


export default function ClientLayoutWrapper({ children }) {
  const { user } = useUser();
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return <main>{children}</main>;
  }

  // For other pages, show full layout
  return (
    <>
      <header className="flex bg-gray-800 justify-end items-center p-4 gap-4 h-16">
        <SignedOut>
          <SignInButton className="text-white"/>
          <SignUpButton />
        </SignedOut>
        <SignedIn>
        <div className="flex">
          <div className="ml-[20%] flex items-center gap-2 text-white">
            Welcome, {user?.fullName}
            <UserButton />
          </div>
        </div>
        </SignedIn>
      </header>

      <div className="flex">
        <Sidebar />
        <main className="w-full p-6">{children}</main>
      </div>

      <Footer />
    </>
  );
}
