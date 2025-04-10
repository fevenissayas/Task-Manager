import { useState } from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

interface EditTaskProps {
  task: Task;
  onSave: (updatedTask: Task) => void;
}

export default function EditTask({ task, onSave }: EditTaskProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTask = { ...task, title, description, status };

    const response = await fetch(`api/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    if (response.ok) {
      onSave(updatedTask);
      setIsEditing(false);
    } else {
      console.error("Failed to update task");
    }
  };

  if (!isEditing) {
    return (
      <button onClick={() => setIsEditing(true)}>
        <img src="/icons/pencil.svg" alt="Edit Task" />
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="pending">Pending</option>
        <option value="in progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit">Save</button>
      <button type="button" onClick={() => setIsEditing(false)}>
        Cancel
      </button>
    </form>
  );
}