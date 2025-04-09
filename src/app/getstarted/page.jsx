"use client";

import { redirectToSignUp } from "@clerk/nextjs";
import React from "react";

export default function GetStarted() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-white px-4">
      <div className="text-center space-y-6 max-w-xl">
        <h1 className="text-4xl font-bold text-blue-800">Hi, I’m Feven 👋</h1>
        <p className="text-lg text-gray-700">
          I'm building this project using <span className="font-semibold">Next.js</span> as part of my learning journey. 
          This is my very first full project while learning, and I’m super excited to share it with you.
        </p>
        <p className="text-md text-gray-600 italic">
          Hope you enjoy exploring it as much as I enjoyed building it! :)
        </p>
        <br />
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
          onClick={() => redirectToSignUp({ redirectUrl: "http://localhost:3000" })}
        >
          Get Started
        </button>
      </div>
    </main>
  );
}
