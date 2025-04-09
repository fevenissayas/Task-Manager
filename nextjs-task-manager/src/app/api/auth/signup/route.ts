import { db } from "@/db/db";
import { users } from "@/db/schema";
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const user = await clerkClient.users.getUser(userId);

    const email = user.emailAddresses?.[0]?.emailAddress || "";
    const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();

    await db.insert(users).values({
      id: userId,
      email,
      name: fullName,
    });

    return new NextResponse("User signed up and details stored.", { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return new NextResponse("Failed to process signup.", { status: 500 });
  }
}
