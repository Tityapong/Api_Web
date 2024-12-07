const express = require('express');
const userRoutes = require('./routes/userRoutes');


const app = express();
const PORT = 8000;

// Middleware
app.use(express.json()); // Built-in middleware for JSON parsing

// Routes
app.use('/users', userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
