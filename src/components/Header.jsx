import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const Header = ({ onAddTask, onSearch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  // Handle input change in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  // Add task and close the modal
  const handleAddTask = () => {
    if (!taskData.title.trim()) {
      alert("Task title cannot be empty!");
      return;
    }
    const newTask = {
      ...taskData,
      id: Date.now(),
      completed: false,
    };
    onAddTask(newTask);
    setTaskData({ title: "", description: "", dueDate: "" }); // Reset form
    setIsModalOpen(false); // Close modal
  };

  return (
    <>
      <header className="bg-[#00296b] text-white p-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0">
        <h1 className="text-lg md:text-xl font-semibold text-center md:text-left">
          Task Management
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-3 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="bg-transparent text-white pl-10 pr-2 py-1 md:py-2 w-full rounded-lg border-2 border-slate-50 focus:outline-none"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          {/* Add Task Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-sm md:text-base bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-500 w-full md:w-auto"
          >
            Add Task
          </button>
        </div>
      </header>

      {/* Modal for Adding Task */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg w-11/12 sm:w-96 md:w-96">
            <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
            <div className="flex flex-col gap-4">
              {/* Title Input */}
              <input
                type="text"
                name="title"
                placeholder="Task Title"
                className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none"
                value={taskData.title}
                onChange={handleInputChange}
              />
              {/* Description Input */}
              <textarea
                name="description"
                placeholder="Task Description"
                className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none"
                value={taskData.description}
                onChange={handleInputChange}
              />
              {/* Due Date Input */}
              <input
                type="date"
                name="dueDate"
                className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none"
                value={taskData.dueDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-500"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
