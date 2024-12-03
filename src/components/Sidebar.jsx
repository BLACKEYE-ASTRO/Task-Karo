import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/tasks", icon: <AiOutlineDashboard /> },
  ];

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Task Karo</h2>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="mb-4">
              <NavLink
                to={item.path}
                className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-gray-700 transition"
                activeClassName="bg-gray-700"
              >
                {item.icon}
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
