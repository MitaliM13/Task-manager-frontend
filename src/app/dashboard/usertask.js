import React from "react";

const UserTasks = ({ users, user }) => {
  const currentUser = users.find((u) => u._id.toString() === user.id);

  if (!currentUser) {
    return (
      <div className="border border-red-200 bg-red-50 rounded-xl p-6 shadow-lg w-full max-w-3xl mx-auto mt-6">
        <p className="text-red-600 font-semibold text-center">
          User not found.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-xl p-6 shadow-lg w-full max-w-3xl mx-auto mt-6 bg-white">
      <h2 className="text-2xl font-bold text-blue-700 mb-1">
        Hello, {currentUser.username}
      </h2>
      <p className="text-gray-600 mb-6">Email: {currentUser.email}</p>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Tasks Created
        </h3>
        {currentUser.tasksCreated?.length > 0 ? (
          <ul className="space-y-3">
            {currentUser.tasksCreated.map((task, index) => (
              <li
                key={index}
                className="bg-blue-50 p-4 rounded-lg border border-blue-100"
              >
                <p className="font-semibold text-blue-900">{task.title}</p>
                <p className="text-sm text-blue-800 mt-1">{task.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No tasks created.</p>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Tasks Assigned
        </h3>
        {currentUser.taskAssigned?.length > 0 ? (
          <ul className="space-y-3">
            {currentUser.taskAssigned.map((task, index) => (
              <li
                key={index}
                className="bg-green-50 p-4 rounded-lg border border-green-100"
              >
                <p className="font-semibold text-green-900">{task.title}</p>
                <p className="text-sm text-green-800 mt-1">{task.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No tasks assigned.</p>
        )}
      </div>
    </div>
  );
};

export default UserTasks;
