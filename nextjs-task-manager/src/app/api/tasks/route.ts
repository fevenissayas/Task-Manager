import { db } from "@/db/db";
import { tasks, taskStatus } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { email, name, title, description, status = "pending" } = await req.json();

  // Validate required fields
  if (!email || !name || !title) {
    return new Response("Email, name, and title are required.", { status: 400 });
  }

  // Validate title length
  if (title.length > 255) {
    return new Response("Title must be less than 255 characters.", { status: 400 });
  }

  // Ensure valid status
  if (!["pending", "in progress", "completed"].includes(status)) {
    return new Response("Invalid task status.", { status: 400 });
  }

  try {
    // Insert the task into the database
    const result = await db.insert(tasks).values({
        userId,       // from Clerk auth
        email,
        name,
        title,
        description,
      });
      

    return new Response(JSON.stringify(result), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Error creating task: " + error.message, { status: 500 });
  }
}
