const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {authentication} = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser");
const { development } = require('../config/config');

router.use(cookieParser());

// Create - Add a new Admin/ User
router.post('/register', authentication, async (req, res) => {
	try {
		const { username, email, password, password2, type } = req.body;
		if (!username || !email || !password || !password2 || !type) {
			return res.status(401).json({ error: "Please enter all fields" });
		}
		if (password !== password2) {
			return res.status(401).json({ error: "Passwords do not match" });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.create({ username, email, type, password: hashedPassword });
		return res.status(200).json({message: `${user.type.charAt(0).toUpperCase()+ user.type.slice(1)} registered successfully`});
	} catch (error) {
		return res.status(500).json({error: error.message});
	}
});

// Login route
router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ where: { email } });
		if (!user || !(await bcrypt.compare(password, user.password))) {
		  return res.status(401).json({ error: 'Invalid credentials' });
		}
		const token = jwt.sign({ userId: user.id, email: user.email, type: user.type }, development.jwtPrivateKey);
		// using response header
		// return res.header('Authorization',token);
		res.cookie('Authorization', token, { httpOnly: true, maxAge: 3600000, sameSite: 'None', secure: true, domain: 'localhost' });
		return res.status(200).json({message: `${user.type.charAt(0).toUpperCase() + user.type.slice(1)} logged in successfully`});
	} catch(error) {
		return res.status(500).json({error: error.message});
	}
});

// logout
router.get('/logout', authentication, (req, res) => {
	res.clearCookie('Authorization');
	return res.status(200).json({message: 'User logged out successfully'});
});

module.exports = router;
