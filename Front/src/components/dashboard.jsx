import React, { useEffect, useState } from "react";
import axios from "../axiosTicketConfig";

const Dashboard = () => {
  const [ticketCounts, setTicketCounts] = useState({
    open: 0,
    closed: 0,
    inProgress: 0,
  });

  useEffect(() => {
    const fetchTicketCounts = async () => {
      try {
        const response = await axios.get("/", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const tickets = response.data;

        const counts = {
          open: tickets.filter((ticket) => ticket.status === "Open").length,
          closed: tickets.filter((ticket) => ticket.status === "Closed").length,
          inProgress: tickets.filter(
            (ticket) => ticket.status === "In Progress"
          ).length,
        };

        setTicketCounts(counts);
      } catch (error) {
        console.error("Error fetching ticket counts:", error);
      }
    };

    fetchTicketCounts();
  }, []);

  return (
    <div className="p-6 bg-gray-900 text-white">
      <h2 className="text-2xl font-semibold mb-4">Ticket Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-600 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl">Open Tickets</h3>
          <p className="text-3xl">{ticketCounts.open}</p>
        </div>
        <div className="bg-yellow-600 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl">In Progress Tickets</h3>
          <p className="text-3xl">{ticketCounts.inProgress}</p>
        </div>
        <div className="bg-red-600 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl">Closed Tickets</h3>
          <p className="text-3xl">{ticketCounts.closed}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
