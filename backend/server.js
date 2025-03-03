const express = require('express');
const mongoose = require('mongoose');
const ticketRoutes = require('./routes/tickets');
const authRoutes = require('./routes/auth');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri, {})
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

mongoose.connection.on('disconnected', () => console.log('MongoDB connection disconnected'));

app.use('/tickets', ticketRoutes);
app.use('/auth', authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));