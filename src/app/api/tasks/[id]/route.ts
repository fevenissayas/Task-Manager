import { NextRequest, NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm/expressions";
import { getAuth } from "@clerk/nextjs/server";
import { title } from "process";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const db = drizzle(pool);

// GET /api/tasks/:id
export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    // Await the `params` object before using it
    const resolvedParams = await context.params;
    const taskId = parseInt(resolvedParams.id, 10); // Convert ID to number

    const task = await db.select().from(tasks).where(eq(tasks.id, taskId)).limit(1);
    if (!task.length) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task[0]); // Return the task as JSON
  } catch (error) {
    console.error("Error fetching task:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PUT /api/tasks/:id
export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { params } = context;
    const taskId = parseInt(params.id, 10);

    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Ensure at least one field is provided for update
    if (!body.title && !body.description && !body.status) {
      return NextResponse.json(
        { error: "At least one field (title, description, or status) is required" },
        { status: 400 }
      );
    }

    // Fetch the task to ensure it exists and belongs to the user
    const task = await db.select().from(tasks).where(eq(tasks.id, taskId)).limit(1);
    if (!task.length) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    if (task[0].userId !== userId) {
      return NextResponse.json({ error: "Forbidden: Task does not belong to the user" }, { status: 403 });
    }

    // Build the update payload dynamically
    const updatePayload: Partial<{ title: string; description: string; status: string }> = {};
    if (body.title) updatePayload.title = body.title;
    if (body.description) updatePayload.description = body.description;
    if (body.status) updatePayload.status = body.status;

    // Update the task
    await db.update(tasks).set(updatePayload).where(eq(tasks.id, taskId));

    return NextResponse.json({ message: "Task updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE /api/tasks/:id
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId } = getAuth(req); // Authenticate the user
    const taskId = parseInt(params.id, 10);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const task = await db.select().from(tasks).where(eq(tasks.id, taskId)).limit(1);
    if (!task.length) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    if (task[0].userId !== userId) {
      return NextResponse.json({ error: "Forbidden: Task does not belong to the user" }, { status: 403 });
    }

    await db.delete(tasks).where(eq(tasks.id, taskId));
    return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}