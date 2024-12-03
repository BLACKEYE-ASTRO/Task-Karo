import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import TaskList from "../components/TaskList";
import TaskFilters from "../components/TaskFilters";
import TaskForm from "../components/TaskForm"; 
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, toggleCompleted, editTask } from "../Redux/tasksSlice";

const TaskDashboard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "completed" && task.completed ) ||
      (activeFilter === "pending" && !task.completed && !task.completed && new Date(task.dueDate) >= new Date()) || (activeFilter === "overdue" && !task.completed && new Date(task.dueDate) < new Date());
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex-1">
        <Header onAddTask={(task) => dispatch(addTask(task))} onSearch={setSearchQuery} />
        <TaskFilters activeFilter={activeFilter} onFilterChange={(filter) => setActiveFilter(filter)} />
        <TaskList
          tasks={filteredTasks}
          onToggle={(id) => dispatch(toggleCompleted(id))}
          onDelete={(id) => dispatch(deleteTask(id))}
          onEdit={(task) => {
            setTaskToEdit(task);
            setIsModalOpen(true);
          }}
        />
        {isModalOpen && (
          <TaskForm
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            taskToEdit={taskToEdit}
            onSave={(task) => {
              if (taskToEdit) dispatch(editTask({ id: taskToEdit.id, updates: task }));
              else dispatch(addTask(task));
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TaskDashboard;
