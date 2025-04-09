// app/api/clerk-user/route.ts

import { db } from "@/db/db";
import { users } from "@/db/schema";

export async function POST(req: Request) {
  const body = await req.json();

  const userId = body.id;
  const email = body.email_addresses?.[0]?.email_address || "";
  const name = [body.first_name, body.last_name].filter(Boolean).join(" ");

  try {
    await db.insert(users).values({
      id: userId,
      email,
      name,
    });

    return new Response("User saved ✅", { status: 200 });
  } catch (error) {
    console.error("❌ Error saving user:", error);
    return new Response("Failed to save user", { status: 500 });
  }
}
