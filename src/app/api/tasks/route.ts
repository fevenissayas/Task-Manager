import { NextResponse, NextRequest } from "next/server";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm/expressions";
import { getAuth } from "@clerk/nextjs/server";
import { runCorsMiddleware } from "@/utils/cors";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const db = drizzle(pool);

export async function OPTIONS(req: NextRequest) {
  const res = new NextResponse();
  try {
    await runCorsMiddleware(req, res);
    return res;
  } catch (err) {
    console.error("CORS error (OPTIONS):", err);
    return NextResponse.json({ error: "CORS error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const res = new NextResponse();

  try {
    await runCorsMiddleware(req, res);
  } catch (error) {
    console.error("CORS error (GET):", error);
    return NextResponse.json({ error: "CORS error" }, { status: 500 });
  }

  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userTasks = await db
      .select()
      .from(tasks)
      .where(eq(tasks.userId, userId));

    return NextResponse.json({ tasks: userTasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const res = new NextResponse();

  // cors middleware
  try {
    await runCorsMiddleware(req, res);
  } catch (error) {
    console.error("CORS error (POST):", error);
    return NextResponse.json({ error: "CORS error" }, { status: 500 });
  }

  const { userId } = getAuth(req);

  console.log("server", userId);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    if (!body.title || !body.description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    const newTask = {
      userId,
      title: body.title,
      description: body.description,
      status: body.status || "pending",
    };
    const result = await db.insert(tasks).values(newTask).returning();

    return NextResponse.json(
      { message: "Task created", task: result[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}