const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send({ error: 'Username already taken' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, role });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send({ error: "Error creating user" });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.send({ user: { username: user.username, role: user.role }, token });
};