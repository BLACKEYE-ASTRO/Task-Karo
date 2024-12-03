import React from "react";

const TaskList = ({ tasks, onToggle, onDelete, onEdit }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            key={task.id}
            className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-white truncate">
                {task.title}
              </h3>
              <p className="text-gray-400 mt-2 text-sm sm:text-base">
                {task.description}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Due:{" "}
                {new Date(task.dueDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="flex justify-between items-center mt-4">
              {/* Toggle Completed Button */}
              <button
                onClick={() => onToggle(task.id)}
                className={`px-3 sm:px-4 py-2 rounded-lg flex-1 mr-2 ${
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
                {task.completed ? "Completed" : "Mark Complete"}
              </button>

              {/* Edit Button */}
              <button
                onClick={() => onEdit(task)}
                className="bg-blue-600 hover:bg-blue-500 px-3 sm:px-4 py-2 rounded-lg text-white flex-1 mx-1"
                aria-label="Edit task"
              >
                Edit
              </button>

              {/* Delete Button */}
              <button
                onClick={() => onDelete(task.id)}
                className="bg-red-600 hover:bg-red-500 px-3 sm:px-4 py-2 rounded-lg text-white flex-1 ml-2"
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
