const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role }, 
        'your-secret-key', // Replace with a secure environment variable
        { expiresIn: '1h' } // Token valid for 1 hour
    );
};

module.exports = { generateToken };
