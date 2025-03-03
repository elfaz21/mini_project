import React from "react";
import { FaList, FaPlus, FaSignOutAlt } from "react-icons/fa";

const Sidebar = ({
  isOpen,
  activeSection,
  setActiveSection,
  handleLogout,
  closeSidebar,
}) => {
  return (
    <div
      className={`fixed inset-0 md:relative md:w-64 bg-gray-800 p-6 shadow-lg flex flex-col ${
        isOpen ? "block" : "hidden md:block"
      } z-40`}
    >
      <div className="flex-grow">
        <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>
        <nav className="space-y-4">
          <button
            onClick={() => {
              setActiveSection("tickets");
              closeSidebar(); // Close the sidebar after navigating
            }}
            className={`w-full text-left py-2 px-4 rounded hover:bg-orange-700 ${
              activeSection === "tickets" ? "bg-orange-600" : ""
            }`}
          >
            <FaList className="inline mr-2" />
            Tickets
          </button>
          <button
            onClick={() => {
              setActiveSection("addTicket");
              closeSidebar(); // Close the sidebar after navigating
            }}
            className={`w-full text-left py-2 px-4 rounded hover:bg-orange-700 ${
              activeSection === "addTicket" ? "bg-orange-600" : ""
            }`}
          >
            <FaPlus className="inline mr-2" />
            Add Ticket
          </button>
        </nav>
      </div>
      <div className="mt-96">
        <button
          onClick={handleLogout}
          className="w-full mt-64 bg-orange-600 p-2 rounded hover:bg-orange-700 transition"
        >
          <FaSignOutAlt className="inline mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
