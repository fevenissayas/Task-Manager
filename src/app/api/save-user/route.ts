import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { runCorsMiddleware } from "@/utils/cors";

export async function POST(req: NextRequest) {
  try {
    const res = new NextResponse();
    await runCorsMiddleware(req, res);

    const { userId } = await auth();
    const { email, name } = await req.json();

    console.log("user is being saved", userId, name, email);

    if (!userId || !email || !name) {
      console.error("Missing user info", { userId, email, name });
      return NextResponse.json({ error: "Missing user info" }, { status: 400 });
    }

    const existingUser = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    console.log("existing user", existingUser);

    if (!existingUser) {
      await db.insert(users).values({
        id: userId,
        email,
        name,
      });
      console.log("User saved successfully");
    } else {
      console.log("User already exists");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving user:", error);
    return NextResponse.json({ error: "Failed to save user" }, { status: 500 });
  }
}