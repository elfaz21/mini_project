import React, { useState } from "react";
import { FaCaretDown, FaCircle, FaPhoneAlt, FaUser } from "react-icons/fa";

const TicketCard = ({ ticket, onStatusChange, isAdmin }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const statusOptions = [
    { value: "Open", color: "text-green-500" },
    { value: "In Progress", color: "text-yellow-500" },
    { value: "Closed", color: "text-red-500" },
  ];

  const handleStatusChange = (value) => {
    onStatusChange(ticket._id, value);
    setDropdownOpen(false);
  };

  return (
    <div className="bg-gray-800/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl relative">
      <div className="flex justify-between items-start">
        <span className="text-2xl font-bold text-gray-200">{ticket.title}</span>
        {isAdmin && (
          <div className="relative">
            <div
              className="flex items-center p-2 rounded-md bg-gray-700 text-white cursor-pointer hover:bg-gray-600"
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
              {ticket.status}
              <FaCaretDown className="ml-2" />
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-gray-800 rounded-lg shadow-lg z-10">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleStatusChange(option.value)}
                    className={`flex items-center px-4 py-2 text-left w-full hover:bg-gray-700 transition ${
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
      <p className="text-md text-gray-300 mt-4 leading-relaxed">
        {ticket.description}
      </p>

      <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
        <div className="flex items-center mb-2">
          <FaUser className="text-blue-400 mr-2" />
          <span>Customer Name:</span>
          <span className="text-gray-300 ml-2">{ticket.customerName}</span>
        </div>
        <div className="flex items-center">
          <FaPhoneAlt className="text-green-400 mr-2" />
          <span>Phone:</span>
          <span className="text-gray-300 ml-2">{ticket.customerPhone}</span>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center text-sm">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
            ticket.status === "Open"
              ? "bg-green-500/20 text-green-300"
              : ticket.status === "In Progress"
              ? "bg-yellow-500/20 text-yellow-300"
              : "bg-red-500/20 text-red-300"
          }`}
        >
          {ticket.status}
        </span>
        <span className="text-gray-400">
          Created at: {new Date(ticket.createdAt).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default TicketCard;
