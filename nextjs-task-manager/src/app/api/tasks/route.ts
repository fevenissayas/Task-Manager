import { NextResponse, NextRequest } from 'next/server';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { tasks } from '@/db/schema';
import { eq } from 'drizzle-orm/expressions'; // Import eq for filtering
import { getAuth } from '@clerk/nextjs/server'; // Clerk for auth

// Set up database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const db = drizzle(pool);

// Handle GET requests
export async function GET(req: NextRequest) { // Use NextRequest type
  const { userId } = getAuth(req); // Authenticate the user

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch tasks for the authenticated user
    const userTasks = await db
      .select()
      .from(tasks)
      .where(eq(tasks.userId, userId)); // Use eq for filtering

    return NextResponse.json({ tasks: userTasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

// Handle POST requests
export async function POST(req: NextRequest) { // Use NextRequest type
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();

    // Validate the request body
    if (!body.title || !body.description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    // Insert the new task into the database
    const newTask = {
      userId,
      title: body.title,
      description: body.description,
      status: body.status || 'pending', // Default status to 'pending'
    };
    const result = await db.insert(tasks).values(newTask).returning(); // Insert and return the new task

    return NextResponse.json({ message: 'Task created', task: result[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}