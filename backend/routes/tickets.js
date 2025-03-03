
const express = require('express');
const auth = require('../middleware/auth');
const ticketController = require('../controllers/ticketController');
const router = express.Router();


router.post('/', auth, ticketController.createTicket);


router.get('/', auth, ticketController.getTickets);


router.put('/:id', auth, ticketController.updateTicket);

module.exports = router;