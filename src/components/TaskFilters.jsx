import React from "react";

const TaskFilters = ({ activeFilter, onFilterChange }) => {
  const filters = ["All", "Completed", "Pending", "Overdue"];

  return (
    <div className="flex gap-4 mb-6 ml-4">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter.toLowerCase())}
          className={`px-4 py-2 rounded-lg ${
            activeFilter === filter.toLowerCase()
              ? "bg-purple-600 text-sm md:text-xl text-white"
              : "bg-gray-700 text-sm md:text-xl text-gray-300 hover:bg-gray-600"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default TaskFilters;
