const express = require('express');
const mongoose = require('mongoose');
const ticketRoutes = require('./routes/tickets');
const authRoutes = require('./routes/auth'); // Add this line
const cors = require('cors');
require('dotenv').config(); // Add this line
const app = express();

app.use(express.json());

mongoose.connect('mongodb+srv://admin:admin123@cluster0.8dcsf.mongodb.net/mini', {});

mongoose.connection.on('connected', () => {
    console.log('Successfully connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB connection disconnected');
});

app.use(cors());
app.use('/tickets', ticketRoutes);
app.use('/auth', authRoutes); 

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});