import { NextRequest, NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm/expressions";
import { getAuth } from "@clerk/nextjs/server";

// Set up the PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure DATABASE_URL is set in environment variables
});
const db = drizzle(pool);

// DELETE /api/tasks/:id
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = getAuth(req); // Authenticate the user

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized: User not authenticated" },
        { status: 401 }
      );
    }

    const taskId = parseInt(params.id, 10); // Convert the task ID from string to number

    if (isNaN(taskId) || taskId <= 0) {
      return NextResponse.json(
        { error: "Invalid task ID provided" },
        { status: 400 }
      );
    }

    // Check if the task exists and belongs to the authenticated user
    const task = await db
      .select()
      .from(tasks)
      .where(eq(tasks.id, taskId)) // Use the converted number for comparison
      .limit(1);

    if (!task.length) {
      return NextResponse.json(
        { error: "Task not found or does not exist" },
        { status: 404 }
      );
    }

    if (task[0].userId !== userId) {
      return NextResponse.json(
        { error: "Forbidden: Task does not belong to the user" },
        { status: 403 }
      );
    }

    // Delete the task
    await db.delete(tasks).where(eq(tasks.id, taskId));

    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting task:", error);

    return NextResponse.json(
      { error: "Internal Server Error: Failed to delete task" },
      { status: 500 }
    );
  }
}