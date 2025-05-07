# 🗂️ Task Manager App — Frontend (Next.js)

This is the frontend for the **Task Manager App**, built using **Next.js**. It provides a clean, responsive UI that allows users to create and assign tasks, view assigned and created tasks, and log in securely.

## 🌐 Live Demo

🔗 [Task Manager App](https://task-manager-frontend-two-mauve.vercel.app)

## ✨ Features

- ✅ User authentication
- ✅ Task creation and assignment
- ✅ Dashboard for created and assigned tasks
- ✅ Responsive and modern UI
- ✅ Integration with backend via REST APIs

## 🛠 Tech Stack

- **Next.js** (App Router)
- **Redux Toolkit** – state management
- **Axios** – API communication
- **Tailwind CSS** – styling

---

## 🧠 Project Thinking & Development Process

### Backend (Node.js + Express + MongoDB)

**Schema Design**

- Started with defining MongoDB schemas for `User` and `Task`.
- Ensured scalability and covered essential fields such as priority, status, due date, and assigned user.

**API Development**

- Connected backend to MongoDB using Mongoose.
- Implemented authentication routes (`/register`, `/login`) using JWT for secure sessions.
- Developed CRUD routes for tasks: create, read, update, and delete.
- Added routes for search and filter functionality based on title, status, priority, and due date.
- Ensured CORS compatibility with the frontend.

**Deployment**

- Hosted the backend on **Render**.
- Used environment variables (`JWT_SECRET`, `MONGO_URI`, `FRONTEND_URL`) stored securely in Render's dashboard.

---

### Frontend (Next.js + Redux Toolkit + Tailwind CSS)

**State Management & Routing**

- Implemented global state management using Redux Toolkit.
- Created protected routes using middleware and auth checks for the dashboard and task views.

**Dashboard Implementation**

- Created a dynamic dashboard displaying "Assigned To Me" and "Created By Me" tasks.
- Reusable components for task form, task list, and filtering options.

**UX Features**

- Integrated task editing and deletion functionality.
- Added search and filter options with backend integration.
- Ensured mobile responsiveness and smooth user experience using Tailwind CSS.

**Deployment**

- Hosted the frontend on **Vercel**.
- Updated environment configuration to connect to the Render-hosted backend.

---

## 📦 Getting Started

### 1. Install dependencies

```bash
npm install


## 📦 Getting Started

### 1. Install dependencies

```bash
npm install
```
### 2. Start deployment server

```npm run dev
# or
yarn dev
# or
pnpm dev```

