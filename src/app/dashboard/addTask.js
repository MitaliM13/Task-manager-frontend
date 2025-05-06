"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function AddTaskForm({
  onTaskAdded,
  userId,
  editingTask,
  setEditingTask,
  onTaskUpdated,
  users,
  user,
  fetchUsers,
}) {
  const { name: currentUser } = useSelector((state) => state.user);

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    dueDate: "",
    assignedTo: "",
  });

  useEffect(() => {
    // console.log("user id is", user.id);
    if (editingTask) {
      setTask({
        ...editingTask,
        assignedTo: editingTask.assignedTo?._id || "",
      });
    } else {
      setTask({
        title: "",
        description: "",
        status: "Pending",
        priority: "Medium",
        dueDate: "",
        assignedTo: "",
      });
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res, data;

      const payload = {
        ...task,
        createdBy: user.id,
        assignedTo:
          typeof task.assignedTo === "object"
            ? task.assignedTo._id
            : task.assignedTo,
      };

      if (editingTask) {
        // console.log(user);
        res = await fetch(
          `http://localhost:5000/api/tasks/${editingTask._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
        data = await res.json();
        onTaskUpdated(data);
        setEditingTask(null);
      } else {
        res = await fetch(`http://localhost:5000/api/tasks`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        data = await res.json();
        onTaskAdded(data);
      }
      fetchUsers();
      setTask({
        title: "",
        description: "",
        status: "Pending",
        priority: "Medium",
        dueDate: "",
        createdBy: "",
        assignedTo: "",
      });
    } catch (err) {
      console.error("Task submission error:", err);
    }
  };

  return (
    <div className="mt-6 border p-4 rounded-xl bg-gray-100">
      <h2 className="text-xl font-bold mb-4">
        {editingTask ? "Update Task" : "Add Task"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          className="border p-2 w-full rounded"
          placeholder="Title"
          required
        />
        <textarea
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          className="border p-2 w-full rounded"
          placeholder="Description"
        />
        <select
          value={task.priority}
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
          className="border p-2 w-full rounded"
        >
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select
          value={task.status}
          onChange={(e) => setTask({ ...task, status: e.target.value })}
          className="border p-2 w-full rounded"
        >
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <input
          type="date"
          value={task.dueDate?.split("T")[0] || ""}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          className="border p-2 w-full rounded"
        />
        <select
          value={task.assignedTo}
          onChange={(e) => setTask({ ...task, assignedTo: e.target.value })}
          className="border p-2 w-full rounded"
        >
          <option value="">Assign to...</option>
          {(users || []).map((u) => (
            <option key={u._id} value={u._id}>
              {u.username}
            </option>
          ))}
        </select>
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editingTask ? "Update" : "Add"}
          </button>
          {editingTask && (
            <button
              type="button"
              onClick={() => setEditingTask(null)}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}