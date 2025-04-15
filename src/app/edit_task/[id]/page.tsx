import { Metadata } from "next";
import UpdateTaskPage from "@/components/UpdateTaskPage";

interface EditTaskPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata: Metadata = {
  title: "Edit Task",
};

export default async function Page({ params }: EditTaskPageProps) {
  const resolvedParams = await params;
  return <UpdateTaskPage taskId={resolvedParams.id} />;
}