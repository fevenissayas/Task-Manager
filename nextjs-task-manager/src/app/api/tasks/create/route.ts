import { db } from "@/db/db";
import { tasks } from "@/db/schema";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { title, description } = await req.json();

  if (!title && !description) {
    return new NextResponse("A task must have a title or description.", { status: 400 });
  }

  try {
    // Insert the task with the authenticated userId
    await db.insert(tasks).values({
      userId, // From Clerk auth
      title,
      description,
    });

    return new NextResponse("Task created successfully.", { status: 201 });
  } catch (error) {
    console.error("Task creation error:", error);
    return new NextResponse("Failed to create task.", { status: 500 });
  }
}
