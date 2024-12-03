import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import logo from "../assets/Task_Logo.png";
const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <AiOutlineDashboard /> },
  ];

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <button
        className="lg:hidden text-white bg-[#00296b] p-2 rounded-md fixed top-4 left-4 z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <IoClose size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`bg-[#00296b] text-white w-64 min-h-screen p-4 fixed top-0 left-0 z-40 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:transform-none lg:relative lg:translate-x-0 transition-transform duration-300`}
      >
        <div className="flex gap-2">
        <img src={logo} alt="Logo" className="h-8 w-8 ml-12 md:ml-0" />
        <h2 className="text-2xl font-bold mb-6 ">Task Karo</h2>
        </div>
        <nav>
          <ul>
            {menuItems.map((item) => (
              <li key={item.name} className="mb-4">
                <NavLink
                  to={item.path}
                  className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-gray-700 transition"
                  activeClassName="bg-gray-700"
                  onClick={() => setIsSidebarOpen(false)} // Close sidebar on click
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile view */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
