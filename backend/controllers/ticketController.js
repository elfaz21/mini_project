// controllers/ticketController.js
const Ticket = require('../models/Ticket');

// Create a ticket
const createTicket = async (req, res) => {
    try {
        // Create a new ticket with the userId set to the logged-in user's ID
        const ticket = new Ticket({ ...req.body, userId: req.user._id });
        await ticket.save();
        res.status(201).send(ticket); // Return the created ticket with a 201 status
    } catch (error) {
        res.status(400).send({ error: 'Failed to create ticket.' }); // Handle creation errors
    }
};

// Get tickets based on user role
const getTickets = async (req, res) => {
    try {
        let tickets;
        if (req.user.role === 'admin') {
            // Admins see all tickets
            tickets = await Ticket.find();
        } else {
            // Regular users see only their tickets
            tickets = await Ticket.find({ userId: req.user._id });
        }
        res.send(tickets); // Send the retrieved tickets
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch tickets.' }); // Handle fetch errors
    }
};

// Update ticket status
const updateTicket = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send({ error: 'Access denied.' }); // Check if user is admin
    }
    try {
        // Update the ticket by ID with the provided data
        const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!ticket) {
            return res.status(404).send({ error: 'Ticket not found.' }); // Handle not found
        }
        res.send(ticket); // Send the updated ticket
    } catch (error) {
        res.status(400).send({ error: 'Failed to update ticket.' }); // Handle update errors
    }
};

module.exports = {
    createTicket,
    getTickets,
    updateTicket,
};