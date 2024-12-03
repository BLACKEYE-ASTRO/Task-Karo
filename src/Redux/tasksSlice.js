import { createSlice } from "@reduxjs/toolkit";

const loadTasksFromLocalStorage = () => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : []; 
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: loadTasksFromLocalStorage(), 
    filter: "all",
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); 
    },
    editTask: (state, action) => {
      const { id, updates } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        Object.assign(task, updates);
        localStorage.setItem("tasks", JSON.stringify(state.tasks)); 
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); 
    },
    toggleCompleted: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = task.completed === undefined ? true : !task.completed;
        localStorage.setItem("tasks", JSON.stringify(state.tasks)); 
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addTask, editTask, deleteTask, toggleCompleted, setFilter } =
  tasksSlice.actions;
export default tasksSlice.reducer;
