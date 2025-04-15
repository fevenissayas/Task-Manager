import UpdateTaskPage from "@/components/UpdateTaskPage";

export default function Page({ params }: { params: { id: string } }) {
  return <UpdateTaskPage taskId={params.id} />;
}