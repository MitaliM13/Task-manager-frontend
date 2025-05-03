'use client'

import { useEffect, useState } from "react"
import { getTasks } from "../services/api"

export default function DashboardPage({ user, onLogout }) {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks()
      setTasks(data)
    }
    fetchTasks()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">
        Welcome To Dashboard, {user?.username || 'User'}!!
      </h1>

      <button
  onClick={onLogout}
  className="absolute top-6 right-6 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-xl transition-all z-10"
>
  Logout
</button>


      <div className="overflow-x-auto shadow-xl rounded-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-purple-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Priority</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Due Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Created By</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Assigned To</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks.map((task) => (
              <tr key={task._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{task.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{task.priority}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{task.description || '—'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{task.dueDate || '—'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{task.createdBy?.username || '—'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{task.assignedTo?.username || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
