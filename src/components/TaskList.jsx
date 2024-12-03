import React, { useState } from "react";

const TaskList = ({ tasks, onToggle, onDelete, onEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleDelete = () => {
    onDelete(taskToDelete.id);
    setIsModalOpen(false);
    setTaskToDelete(null);
  };

  return (
    <div>
      {/* Task List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              className="bg-[#00296b] p-4 sm:p-6 rounded-lg shadow-md flex flex-col justify-between"
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
                  className={`px-2 sm:px-4 py-2 rounded-lg flex-1 mr-2 ${
                    task.completed
                      ? "bg-green-600 hover:bg-green-500"
                      : "bg-purple-600 hover:bg-purple-500"
                  } text-white text-sm md:text-xl`}
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
                  className="text-sm md:text-xl bg-blue-600 hover:bg-blue-500 px-2 sm:px-4 py-2 rounded-lg text-white flex-1 mx-1"
                  aria-label="Edit task"
                >
                  Edit
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => {
                    setTaskToDelete(task);
                    setIsModalOpen(true);
                  }}
                  className="text-sm md:text-xl bg-red-600 hover:bg-red-500 px-2 sm:px-4 py-2 rounded-lg text-white flex-1 ml-2"
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

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold text-gray-800">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 mt-2">
              Are you sure you want to delete the task{" "}
              <span className="font-semibold text-red-600">
                {taskToDelete.title}
              </span>
              ?
            </p>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
