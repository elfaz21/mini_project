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

    customerName: { 
        type: String,
        required: true, 
    },
    customerPhone: {
        type: String,
        required: true, 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


const Ticket = mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;