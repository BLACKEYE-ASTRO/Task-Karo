import React from "react";
import { useParams } from "react-router-dom";
import useHistory from 'use-history'

const TaskDetails = ({ tasks }) => {
  const { id } = useParams();
  const history = useHistory();

  // Find the task based on the ID from the URL
  const task = tasks.find((task) => task.id.toString() === id);

  if (!task) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold text-white">Task Not Found</h2>
        <button
          onClick={() => history.push("/tasks")}
          className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white">{task.title}</h2>
      <p className="text-gray-300 mt-4">{task.description}</p>
      <p className="text-sm text-gray-500 mt-4">
        Due Date: {task.dueDate}
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Status:{" "}
        <span
          className={`${
            task.completed ? "text-green-500" : "text-red-500"
          }`}
        >
          {task.completed ? "Completed" : "Pending"}
        </span>
      </p>
      <button
        onClick={() => history.push("/tasks")}
        className="mt-6 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default TaskDetails;
