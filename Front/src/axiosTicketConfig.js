
import axios from "axios";

const ticketInstance = axios.create({
  baseURL: "https://mini-ticket-management.onrender.com/tickets", 
});

export default ticketInstance;
