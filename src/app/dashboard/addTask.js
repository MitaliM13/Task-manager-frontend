'use client'
import { useState } from "react"

export default function AddTaskForm({onTaskAdded, userId}){
    const [form, setForm] = useState({
        title: "",
        description: "",
        dueDate: "",
        priority: "Medium",
        status: "Pending"
    })

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const res = await fetch("http://localhost:5000/api/tasks", {
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, createdBy: userId })
        })
        const data = await res.json()
        onTaskAdded(data)
        setForm({ title: "", description: "", dueDate: "", priority: "Medium", status: "Pending" })
    }

    return(
        <form onSubmit={handleSubmit} className="mb-6 space-y-4 p-4 border rounded-xl shadow-md bg-purple-50">
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="p-2 w-full border rounded" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="p-2 w-full border rounded" />
      <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} className="p-2 w-full border rounded" required />
      <select name="priority" value={form.priority} onChange={handleChange} className="p-2 w-full border rounded">
        <option>Low</option><option>Medium</option><option>High</option>
      </select>
      <select name="status" value={form.status} onChange={handleChange} className="p-2 w-full border rounded">
        <option>Pending</option><option>In Progress</option><option>Completed</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-xl">Add Task</button>
    </form>
    )
}