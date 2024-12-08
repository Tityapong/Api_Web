const jwt = require('jsonwebtoken');
const { readDatabase, writeDatabase } = require('../utils/dbUtils');

// Controller: Admin login
const loginAdmin = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const data = readDatabase();
    const user = data.users.find(
        (u) => u.email === email && u.password === password && u.role === 'admin' // Ensure only admin can log in
    );

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password, or not an admin' });
    }

    // Generate JWT token
    const token = jwt.sign(
        { id: user.id, role: user.role, email: user.email },
        'your-secret-key', // Replace with a secure secret key
        { expiresIn: '1h' } // Token expiration time
    );

    res.status(200).json({
        message: 'Login successful',
        token, // Send the token in the response
        redirect: '/admin', // Redirect to admin dashboard or section
    });
};

// Controller: Change user role (only accessible by admin)
const changeUserRole = (req, res) => {
    const { userId, newRole } = req.body;

    // Only admin can change roles
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied: Only admins can change user roles.' });
    }

    // Validate the input
    if (!userId || !newRole) {
        return res.status(400).json({ message: 'User ID and new role are required.' });
    }

    const validRoles = ['user', 'supplier', 'admin']; // Define valid roles
    if (!validRoles.includes(newRole)) {
        return res.status(400).json({ message: 'Invalid role provided.' });
    }

    const data = readDatabase();
    const user = data.users.find((u) => u.id === userId);

    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }

    // Change the user role
    user.role = newRole;
    writeDatabase(data); // Save the updated database

    res.status(200).json({
        message: `User role updated successfully to '${newRole}'.`,
        user: {
            id: user.id,
            email: user.email,
            role: user.role,
        },
    });
};

module.exports = {
    loginAdmin,
    changeUserRole,
};
