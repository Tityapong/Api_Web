const jwt = require('jsonwebtoken');
const { readDatabase } = require('../utils/dbUtils');

const authMiddleware = (req, res, next) => {
    // Extract token from Authorization header
    const token = req.headers['authorization'];

    // Log the token for debugging purposes
    console.log("Authorization Token:", token);

    if (!token) {
        return res.status(403).json({ message: 'Authorization token is required' });
    }

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, 'your-secret-key'); // Replace with your secret key

        // Log the decoded token to verify it's correct
        console.log("Decoded Token:", decoded);

        // Read the database to find the user
        const data = readDatabase();
        const user = data.users.find((user) => user.id === decoded.id); // Assuming the token contains user ID

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user; // Add the logged-in user to the request object
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;