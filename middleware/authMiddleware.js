const jwt = require('jsonwebtoken');
const { readDatabase } = require('../utils/dbUtils');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Authorization token is required' });
    }

    try {
        const decoded = jwt.verify(token, 'your-secret-key');
        const data = readDatabase();
        const user = data.users.find((user) => user.id === decoded.id);

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
