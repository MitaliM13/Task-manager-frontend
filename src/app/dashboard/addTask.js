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
      const payload = {
        ...task,
        createdBy: user.id,
        assignedTo:
          typeof task.assignedTo === "object"
            ? task.assignedTo._id
            : task.assignedTo,
      };

      let res, data;

      if (editingTask) {
        res = await fetch(`http://localhost:5000/api/tasks/${editingTask._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
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
    <div className="mt-10 p-6 bg-white shadow-xl rounded-2xl w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {editingTask ? "Update Task" : "Add New Task"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <input
          type="text"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Task Title"
          required
        />

        <select
          value={task.priority}
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
          className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select
          value={task.status}
          onChange={(e) => setTask({ ...task, status: e.target.value })}
          className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <input
          type="date"
          value={task.dueDate?.split("T")[0] || ""}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={task.assignedTo}
          onChange={(e) => setTask({ ...task, assignedTo: e.target.value })}
          className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Assign to...</option>
          {(users || []).map((u) => (
            <option key={u._id} value={u._id}>
              {u.username}
            </option>
          ))}
        </select>

        <textarea
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2 resize-none"
          rows={4}
          placeholder="Description"
        />

        <div className="flex justify-end gap-4 md:col-span-2 mt-2">
          {editingTask && (
            <button
              type="button"
              onClick={() => setEditingTask(null)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-lg transition-all"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all"
          >
            {editingTask ? "Update Task" : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
}
