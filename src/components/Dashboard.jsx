import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTask,
  editTask,
  deleteTask,
  toggleCompleted,
  setFilter,
} from '../Redux/tasksSlice';
import TaskCard from '../components/TaskCard';
import TaskFormModal from './TaskForm';

const Dashboard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const filter = useSelector((state) => state.tasks.filter);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed && new Date(task.dueDate) >= new Date();
    if (filter === 'overdue') return !task.completed && new Date(task.dueDate) < new Date();
    return true;
  });

  return (
    <div className="p-6 bg-[#03071e]">
      {/* Add Task Button */}
      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            setTaskToEdit(null);
            setIsModalOpen(true);
          }}
        >
          Add Task
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4">
        {['all', 'completed', 'pending', 'overdue'].map((f) => (
          <button
            key={f}
            className={`px-4 py-2 rounded ${filter === f ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => dispatch(setFilter(f))}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Task Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={() => {
              setTaskToEdit(task);
              setIsModalOpen(true);
            }}
            onDelete={() => dispatch(deleteTask(task.id))}
            onToggle={() => dispatch(toggleCompleted(task.id))}
          />
        ))}
      </div>

      {/* Task Form Modal */}
      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        taskToEdit={taskToEdit}
        onSave={(task) => {
          if (taskToEdit) dispatch(editTask({ id: taskToEdit.id, updates: task }));
          else dispatch(addTask(task));
        }}
      />
    </div>
  );
};

export default Dashboard;
