const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Closed'],
        default: 'Open',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    customerName: { // New field for customer's name
        type: String,
        required: true, // Make it required if needed
    },
    customerPhone: { // New field for customer's phone number
        type: String,
        required: true, // Make it required if needed
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the current date and time
    },
});

// Check if the model is already defined
const Ticket = mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;