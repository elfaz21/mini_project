const Ticket = require('../models/Ticket');

const createTicket = async (req, res) => {
    try {
        const ticket = new Ticket({ ...req.body, userId: req.user._id });
        await ticket.save();
        res.status(201).send(ticket);
    } catch (error) {
        res.status(400).send({ error: 'Failed to create ticket.' });
    }
};

const getTickets = async (req, res) => {
    try {
        const tickets = req.user.role === 'admin' 
            ? await Ticket.find() 
            : await Ticket.find({ userId: req.user._id });
        res.send(tickets);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch tickets.' });
    }
};

const updateTicket = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send({ error: 'Access denied.' });
    }
    try {
        const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!ticket) {
            return res.status(404).send({ error: 'Ticket not found.' });
        }
        res.send(ticket);
    } catch (error) {
        res.status(400).send({ error: 'Failed to update ticket.' });
    }
};

module.exports = {
    createTicket,
    getTickets,
    updateTicket,
};