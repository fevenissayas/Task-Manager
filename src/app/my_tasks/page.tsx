import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import TasksClient from "@/components/TasksClient";

async function getTasks(token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch tasks");

  const data = await res.json();
  return data.tasks;
}

export default async function MyTasksPage() {
  const { getToken } = await auth();
  const token = await getToken();

  if (!token) return redirect("/sign-in");

  const tasks = await getTasks(token);

  return <TasksClient initialTasks={tasks} />;
}
