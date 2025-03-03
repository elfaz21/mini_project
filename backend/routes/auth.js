const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
    console.log('Received signup request:', req.body); // Log the request body
    const { username, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, role });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        console.error('Error creating user:', error); // Log the error
        res.status(500).send({ error: "Error creating user" });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
    
    // Include the role in the response
    res.send({ user: { username: user.username, role: user.role }, token });
});

module.exports = router;