// axiosTicketConfig.js
import axios from "axios";

const ticketInstance = axios.create({
  baseURL: "http://localhost:3000/tickets", // Base URL for tickets
});

export default ticketInstance;
