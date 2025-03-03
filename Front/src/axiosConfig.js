// axiosConfig.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000/auth', // Adjust to your server URL
});

export default instance;