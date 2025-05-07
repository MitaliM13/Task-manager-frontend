"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../store/userSlice";

import AddTaskForm from "./addTask";
import UserTasks from "./usertask";

const API = "http://localhost:5000/api/tasks";
const USERS_API = "http://localhost:5000/api/users";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [dueBefore, setDueBefore] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch(USERS_API);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleTaskAdded = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
    );
    setEditingTask(null);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      setTasks((prev) => prev.filter((task) => task._id !== id));
      fetchUsers();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleSearch = async () => {
    try {
      const res = await fetch(`${API}/search?q=${searchQuery}`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const handleFilter = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (statusFilter) queryParams.append("status", statusFilter);
      if (priorityFilter) queryParams.append("priority", priorityFilter);
      if (dueBefore) queryParams.append("dueBefore", dueBefore);

      const res = await fetch(`${API}/filter?${queryParams}`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Filter error:", err);
    }
  };

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-blue-600">
          Welcome, {user?.name || "User"}!
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg shadow transition"
        >
          Logout
        </button>
      </div>

      {/* User Overview */}
      <UserTasks users={users} user={user} />

      {/* Filters */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 w-full"
        />
        <select
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 w-full"
        >
          <option value="">Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <select
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 w-full"
        >
          <option value="">Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="date"
          value={dueBefore}
          onChange={(e) => setDueBefore(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 w-full"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
        >
          Search
        </button>
        <button
          onClick={handleFilter}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
        >
          Apply Filter
        </button>
      </div>

      {/* Task Table */}
      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              {[
                "Title",
                "Status",
                "Priority",
                "Description",
                "Due Date",
                "Created By",
                "Assigned To",
                "Actions",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-700"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {tasks.map((task) => (
              <tr key={task._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm text-gray-900">
                  {task.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {task.status}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {task.priority}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {task.description || "—"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {task.dueDate?.split("T")[0] || "—"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {task.createdBy?.username || "—"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {task.assignedTo?.username || "—"}
                </td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <button
                    onClick={() => setEditingTask(task)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Task Form */}
      <div className="mt-6">
        <AddTaskForm
          onTaskAdded={handleTaskAdded}
          fetchUsers={fetchUsers}
          onTaskUpdated={handleTaskUpdated}
          userId={user?._id}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
          users={users}
          user={user}
        />
      </div>
    </div>
  );
}
