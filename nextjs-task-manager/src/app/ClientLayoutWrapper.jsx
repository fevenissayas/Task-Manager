"use client";

import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Sidebar from "../components/Sidebar";
import Footer from "../components/footer/footer";

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return <main>{children}</main>;
  }

  // For other pages, show full layout
  return (
    <>
      <header className="flex justify-end items-center p-4 gap-4 h-16 bg-black">
        <SignedOut>
          <SignInButton className="text-black"/>
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
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
