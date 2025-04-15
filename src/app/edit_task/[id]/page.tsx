import { Metadata } from "next";
import UpdateTaskPage from "@/components/UpdateTaskPage";

interface EditTaskPageProps {
  params: {
    id: string;
  };
}

export const metadata: Metadata = {
  title: "Edit Task",
};

export default function Page({ params }: EditTaskPageProps) {
  return <UpdateTaskPage taskId={params.id} />;
}
