// import { db } from "@/db/db";
// import { tasks } from "@/db/schema";
// import { NextResponse } from "next/server";

// export async function GET(req: Request, { params }: { params: { id: string } }) {
//   const { id } = params; // Extract the task ID from the URL parameter

//   try {
//     // Query for task by its ID
//     const task = await db
//       .select()
//       .from(tasks)
//       .where(tasks.id.eq(Number(id))) // Ensure the `id` is converted to a number
//       .limit(1)
//       .execute();

//     if (task.length === 0) {
//       return new NextResponse("Task not found.", { status: 404 });
//     }

//     return new NextResponse(JSON.stringify(task[0]), { status: 200 });
//   } catch (error) {
//     console.error("Error retrieving task:", error);
//     return new NextResponse("Failed to retrieve task.", { status: 500 });
//   }
// }
