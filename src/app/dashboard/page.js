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

  // console.log("apna current user hai ..:", currentUser);
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
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">
        Welcome To Dashboard, {user?.name || "User"}!!
      </h1>

      <UserTasks users={users} user={user} />

      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-xl transition-all z-10"
      >
        Logout
      </button>

      <div className="my-2">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input"
        />
        <button onClick={handleSearch} className="btn ml-2">
          Search
        </button>
      </div>

      <div className="my-2 space-x-2">
        <select
          onChange={(e) => setStatusFilter(e.target.value)}
          className="input"
        >
          <option value="">Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="input"
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
          className="input"
        />

        <button onClick={handleFilter} className="btn">
          Apply Filter
        </button>
      </div>

      <div className="overflow-x-auto shadow-xl rounded-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-purple-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Description
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Created By
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Assigned To
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks.map((task) => (
              <tr key={task._id}>
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
                <td className="px-6 py-4 text-sm text-gray-700">
                  <button
                    onClick={() => setEditingTask(task)}
                    className="text-blue-600 hover:underline mr-2"
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
  );
}