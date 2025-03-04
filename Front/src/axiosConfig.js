// axiosConfig.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://mini-ticket-management.onrender.com/auth', // Adjust to your server URL
});

export default instance;
