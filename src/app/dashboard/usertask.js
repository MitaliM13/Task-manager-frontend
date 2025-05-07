import React from "react";

const UserTasks = ({ users, user }) => {
  // Find current user from the users array using ID match
  const currentUser = users.find((u) => u._id.toString() === user.id);

  // If no matching user found
  if (!currentUser) {
    return (
      <div className="border rounded-lg p-6 shadow-md m-4 w-full max-w-md bg-white">
        <p className="text-red-500 font-semibold">User not found.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-6 shadow-md m-4 w-full max-w-md bg-white">
      <h2 className="text-xl font-semibold mb-2">
        User: {currentUser.username}
      </h2>
      <p className="text-gray-600 mb-4">Email: {currentUser.email}</p>

      {/* Tasks Created */}
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Tasks Created:</h3>
        {currentUser.tasksCreated && currentUser.tasksCreated.length > 0 ? (
          <ul className="space-y-2">
            {currentUser.tasksCreated.map((task, index) => (
              <li key={index} className="p-3 bg-gray-100 rounded">
                <p className="font-semibold">{task.title}</p>
                <p className="text-sm text-gray-600">{task.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No tasks created.</p>
        )}
      </div>

      {/* Tasks Assigned */}
      <div>
        <h3 className="text-lg font-medium mb-2">Tasks Assigned:</h3>
        {currentUser.taskAssigned && currentUser.taskAssigned.length > 0 ? (
          <ul className="space-y-2">
            {currentUser.taskAssigned.map((task, index) => (
              <li key={index} className="p-3 bg-gray-100 rounded">
                <p className="font-semibold">{task.title}</p>
                <p className="text-sm text-gray-600">{task.description}</p>
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