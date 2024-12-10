const express = require('express');
const router = express.Router();
const { getSuppliersHandler, addService } = require('../controllers/supplierController');
const upload = require('../middleware/upload');

router.get('/suppliers', getSuppliersHandler);
router.post('/suppliers/service', upload.array('images', 3), addService);

module.exports = router;
