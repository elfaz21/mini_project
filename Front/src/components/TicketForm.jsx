import React from "react";
import { FaCheckCircle } from "react-icons/fa"; // Import the success icon

const TicketForm = ({
  title,
  description,
  status,
  customerName, // New prop for customer name
  customerPhone, // New prop for customer phone
  setTitle,
  setDescription,
  setStatus,
  setCustomerName, // New setter for customer name
  setCustomerPhone, // New setter for customer phone
  handleSubmit,
  error,
  successMessage,
  isAdmin,
}) => {
  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 shadow-md rounded-lg p-8 w-full max-w-lg space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">
            Customer Name:
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Customer Phone:
          </label>
          <input
            type="tel"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            required
            className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
            rows="4"
          />
        </div>

        {isAdmin && (
          <div>
            <label className="block text-sm font-medium mb-1">Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded bg-gray-900 text-white focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-orange-600 text-white p-3 rounded hover:bg-orange-700 transition"
        >
          Add Ticket
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {successMessage && (
          <div className="flex items-center bg-green-100 rounded-lg p-4 mt-4">
            <FaCheckCircle className="text-green-600 mr-2" size={20} />
            <p className="text-green-700">{successMessage}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default TicketForm;
