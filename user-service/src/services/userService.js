const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser(userData) {
    const { name, email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ id: user._id, email: email }, process.env.JWT_SECRET, { expiresIn: '72h' });
    return { user, token , "message": "User successfully created"};
}

async function loginUser({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) throw new Error('Invalid credentials');
    const token = jwt.sign({ id: user._id, email: email }, process.env.JWT_SECRET, { expiresIn: '72h' });
    return { user, token };
}

module.exports = { registerUser, loginUser };
