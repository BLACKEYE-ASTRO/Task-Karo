import React from "react";

const TaskList = ({ tasks, onToggle, onDelete, onEdit }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-6">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id} className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-white">{task.title}</h3>
            <p className="text-gray-400">{task.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              Due:{" "}
              {new Date(task.dueDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
            <div className="flex justify-between items-center mt-4">
              {/* Toggle Completed Button */}
              <button
                onClick={() => onToggle(task.id)}
                className={`px-4 py-2 rounded-lg ${
                  task.completed
                    ? "bg-green-600 hover:bg-green-500"
                    : "bg-purple-600 hover:bg-purple-500"
                } text-white`}
                aria-label={
                  task.completed
                    ? "Mark task as incomplete"
                    : "Mark task as complete"
                }
              >
                {task.completed ? "Completed" : "Mark as Complete"}
              </button>

              {/* Edit Button */}
              <button
                onClick={() => onEdit(task)}
                className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-white"
                aria-label="Edit task"
              >
                Edit
              </button>

              {/* Delete Button */}
              <button
                onClick={() => onDelete(task.id)}
                className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg text-white"
                aria-label="Delete task"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-center col-span-full">
          No tasks available. Add a new task to get started!
        </p>
      )}
    </div>
  );
};

export default TaskList;
