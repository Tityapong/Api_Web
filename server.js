const express = require('express');
const userRoutes = require('./routes/userRoutes');
const adminRoute = require('./routes/adminRoute');
const cors = require('cors');

const app = express();
const PORT = 8000;

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Built-in middleware for JSON parsing

// Routes
app.use('/admin', adminRoute); // Login routes
app.use('/users', userRoutes); // User routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
