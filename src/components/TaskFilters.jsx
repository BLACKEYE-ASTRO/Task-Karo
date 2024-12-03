import React from "react";

const TaskFilters = ({ activeFilter, onFilterChange }) => {
  const filters = ["All", "Completed", "Pending", "Overdue"];

  return (
    <div className="flex flex-wrap gap-4 mb-6 ml-4 mt-5">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter.toLowerCase())}
          className={`min-w-[120px] px-4 py-2 rounded-lg ${
            activeFilter === filter.toLowerCase()
              ? "bg-purple-600 text-sm md:text-base text-white"
              : "bg-gray-700 text-sm md:text-base text-gray-300 hover:bg-gray-600"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default TaskFilters;
