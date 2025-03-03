import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "../axiosTicketConfig";
import Sidebar from "./Sidebar";
import TicketCard from "./TicketCard";
import TicketForm from "./TicketForm";

const UserDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [activeSection, setActiveSection] = useState("tickets");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("/", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };
    fetchTickets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/",
        { title, description, status: "Open" }, // Default status for users
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setTickets((prevTickets) => [...prevTickets, response.data]);
      setTitle("");
      setDescription("");
      setError(""); // Clear previous errors
      setSuccessMessage("Ticket added successfully!"); // Set success message
      setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3 seconds
    } catch (error) {
      console.error("Error adding ticket:", error);
      setError("Failed to add ticket. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-white">
      <button
        className="md:hidden p-4 z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <FaTimes className="text-white" />
        ) : (
          <FaBars className="text-white" />
        )}
      </button>

      <Sidebar
        isOpen={isSidebarOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        handleLogout={handleLogout}
        closeSidebar={closeSidebar}
      />

      <div
        className={`flex-1 p-6 overflow-y-auto relative ${
          isSidebarOpen ? "ml-64" : ""
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">
            {activeSection === "tickets" ? "My Tickets" : "Add New Ticket"}
          </h2>
          <div className="bg-gray-800 p-3 rounded-lg shadow-lg">
            <p className="text-lg font-semibold">John Doe</p>
            <p className="text-sm text-gray-400">User</p>
          </div>
        </div>
        {successMessage && <p className="text-green-500">{successMessage}</p>}{" "}
        {/* Show success message */}
        {activeSection === "tickets" && (
          <div
            id="tickets"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {tickets.map((ticket) => (
              <TicketCard
                key={ticket._id}
                ticket={ticket}
                onStatusChange={() => {}}
                isAdmin={false}
              />
            ))}
          </div>
        )}
        {activeSection === "addTicket" && (
          <TicketForm
            title={title}
            description={description}
            status={"Open"}
            setTitle={setTitle}
            setDescription={setDescription}
            setStatus={() => {}}
            handleSubmit={handleSubmit}
            error={error}
          />
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
