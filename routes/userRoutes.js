const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // You can add a middleware for authentication

const router = express.Router();

// Route: Get all users
router.get('/', userController.getAllUsers);

// Route: Register a new user
router.post('/register', userController.addUser);

// Route: User login
router.post('/login', userController.loginUser);

// Route: Admin changes user role
router.post('/change-role', authMiddleware, userController.changeUserRole);

module.exports = router;