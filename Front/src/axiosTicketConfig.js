// axiosTicketConfig.js
import axios from "axios";

const ticketInstance = axios.create({
  baseURL: "https://mini-ticket-management.onrender.com/tickets", // Base URL for tickets
});

export default ticketInstance;
