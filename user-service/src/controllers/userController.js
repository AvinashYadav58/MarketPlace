const { registerUser, loginUser } = require('../services/userService');

async function register(req, res) {
    try {
        const user = await registerUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function login(req, res) {
    try {
        const { user, token } = await loginUser(req.body);
        res.status(200).json({ user, token, "message": "Login successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { register, login };
