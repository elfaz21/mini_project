// routes/tickets.js
const express = require('express');
const auth = require('../middleware/auth');
const ticketController = require('../controllers/ticketController');
const router = express.Router();

// POST /tickets - Create a ticket
router.post('/', auth, ticketController.createTicket);

// GET /tickets - Get tickets based on user role
router.get('/', auth, ticketController.getTickets);

// PUT /tickets/:id - Update ticket status
router.put('/:id', auth, ticketController.updateTicket);

module.exports = router;