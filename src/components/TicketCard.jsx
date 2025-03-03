import React, { useState } from "react";
import { FaCaretDown, FaCircle } from "react-icons/fa"; // Import icons for statuses

const TicketCard = ({ ticket, onStatusChange, isAdmin }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility

  const statusOptions = [
    { value: "Open", color: "text-green-500" },
    { value: "In Progress", color: "text-yellow-500" },
    { value: "Closed", color: "text-red-500" },
  ];

  const handleStatusChange = (value) => {
    onStatusChange(ticket._id, value);
    setDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 relative">
      <div className="flex justify-between items-start">
        <span className="text-xl font-semibold text-gray-200">
          {ticket.title}
        </span>
        {isAdmin && (
          <div className="relative">
            <div
              className="flex items-center p-2 rounded-md bg-gray-700 text-white cursor-pointer"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <FaCircle
                className={`${
                  ticket.status === "Open"
                    ? "text-green-500"
                    : ticket.status === "In Progress"
                    ? "text-yellow-500"
                    : "text-red-500"
                } mr-2`}
              />
              <FaCaretDown />
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-gray-800 rounded-md shadow-lg z-10">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleStatusChange(option.value)}
                    className={`flex items-center px-4 py-2 text-left w-full hover:bg-gray-700 ${
                      ticket.status === option.value ? "font-semibold" : ""
                    }`}
                  >
                    <FaCircle className={`${option.color} mr-2`} />
                    <span className="text-white">{option.value}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <p className="text-md text-gray-300 mt-2">{ticket.description}</p>
      <div className="mt-4 flex justify-between text-sm">
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            ticket.status === "Open"
              ? "bg-green-500 text-white"
              : ticket.status === "In Progress"
              ? "bg-yellow-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {ticket.status}
        </span>
      </div>
    </div>
  );
};

export default TicketCard;
