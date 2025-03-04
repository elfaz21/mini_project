
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://mini-ticket-management.onrender.com/auth', 
});

export default instance;
