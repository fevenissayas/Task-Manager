import EditTask from "./EditTask";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

export default function Task({ task, onTaskUpdate }: { task: Task; onTaskUpdate: (updatedTask: Task) => void }) {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <EditTask task={task} onSave={onTaskUpdate} />
    </div>
  );
}