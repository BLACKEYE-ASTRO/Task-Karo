import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../Redux/tasksSlice";

const TaskForm = ({ isOpen, onClose, taskToEdit }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(taskToEdit?.title || "");
  const [description, setDescription] = useState(taskToEdit?.description || "");
  const [dueDate, setDueDate] = useState(taskToEdit?.dueDate || "");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setDueDate(taskToEdit.dueDate);
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !dueDate) {
      alert("Title and Due Date are required!");
      return;
    }

    const task = {
      id: taskToEdit?.id || Date.now(),
      title,
      description,
      dueDate,
      completed: taskToEdit?.completed || false,
    };

    taskToEdit
      ? dispatch(editTask({ id: taskToEdit.id, updates: task }))
      : dispatch(addTask(task));

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-gray-800 text-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-semibold mb-4">
          {taskToEdit ? "Edit Task" : "Add Task"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            aria-label="Task Title"
          />
          <textarea
            className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            aria-label="Task Description"
          ></textarea>
          <input
            type="date"
            className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            aria-label="Due Date"
          />
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              {taskToEdit ? "Update" : "Add"}
            </button>
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
