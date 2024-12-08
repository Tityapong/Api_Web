const express = require('express');
const { loginAdmin, changeUserRole } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Route: Admin login
router.post('/login', loginAdmin);

// Route: Change user role (only accessible by admin)
router.post('/change-role', authMiddleware, changeUserRole);

module.exports = router;
