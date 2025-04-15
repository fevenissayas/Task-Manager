import AddTaskForm from "../../components/AddTaskForm";

export default function AddTaskPage() {
  return (
    <div className="flex min-h-screen bg-gray-200">
      <div className="w-full bg-white p-6 mx-auto rounded-md">
        <h2 className="text-2xl font-semibold text-blue-800 mb-6 text-center mt-6">
          Add New Task
        </h2>
        <AddTaskForm />
      </div>
    </div>
  );
}