import React, { useContext, useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "../axiosTicketConfig";
import Sidebar from "../components/Sidebar";
import TicketCard from "../components/TicketCard";
import TicketForm from "../components/TicketForm";
import { AuthContext } from "../context/AuthContext";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [activeSection, setActiveSection] = useState("tickets");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true); // Set loading true before fetching
      try {
        const response = await axios.get("/", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false); // Set loading false after fetching
      }
    };
    fetchTickets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/",
        {
          title,
          description,
          status: "Open",
          customerName,
          customerPhone,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setTickets((prevTickets) => [...prevTickets, response.data]);
      setTitle("");
      setDescription("");
      setCustomerName("");
      setCustomerPhone("");
      setError("");
      setSuccessMessage("Ticket added successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error adding ticket:", error);
      setError("Failed to add ticket. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const filteredTickets = tickets
    .filter((ticket) =>
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const statusOrder = { Open: 1, "In Progress": 2, Closed: 3 };
      return statusOrder[a.status] - statusOrder[b.status];
    });

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
            <p className="text-lg font-semibold">{user.username}</p>
            <p className="text-sm text-gray-400">{user.role}</p>
          </div>
        </div>

        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {error && <p className="text-red-500">{error}</p>}

        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="border-4 border-t-4 border-gray-200 rounded-full w-12 h-12 animate-spin border-t-orange-600"></div>
          </div>
        ) : (
          activeSection === "tickets" && (
            <div>
              <div className="flex mb-4">
                <input
                  type="text"
                  placeholder="Search by title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="p-2 rounded-md text-black"
                />
              </div>
              <div
                id="tickets"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {filteredTickets.map((ticket) => (
                  <TicketCard
                    key={ticket._id}
                    ticket={ticket}
                    onStatusChange={() => {}}
                    isAdmin={false}
                  />
                ))}
              </div>
            </div>
          )
        )}

        {activeSection === "addTicket" && (
          <TicketForm
            title={title}
            description={description}
            status={"Open"}
            customerName={customerName}
            customerPhone={customerPhone}
            setTitle={setTitle}
            setDescription={setDescription}
            setCustomerName={setCustomerName}
            setCustomerPhone={setCustomerPhone}
            handleSubmit={handleSubmit}
            error={error}
          />
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
