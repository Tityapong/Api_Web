const express = require('express');
const path = require('path');
const fs = require('fs');
const userRoutes = require('./routes/userRoutes');
const adminRoute = require('./routes/adminRoute');
const suppliers = require('./routes/supplierRoutes');
const cors = require('cors');

const app = express();
const PORT = 8000;

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Built-in middleware for JSON parsing

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Routes
app.use('/admin', adminRoute); // Admin routes
app.use('/users', userRoutes); // User routes
app.use('/uploads', express.static(uploadDir)); // Serve uploaded images
app.use('/api', suppliers); // Supplier routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Basic error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});
