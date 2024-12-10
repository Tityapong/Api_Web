const { getSuppliers , writeDatabase  , readDatabase} = require('../utils/dbUtils');

const getSuppliersHandler = (req, res) => {
    const suppliers = getSuppliers();
    res.status(200).json(suppliers);
};

// Controller function for adding a service
const addService = (req, res) => {
    // Handle the uploaded files and form data
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'At least one image is required.' });
    }

    const { title, category, price, description } = req.body;

    // Validate required fields
    if (!title || !category || !price || !description) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Respond with a success message
    res.status(201).json({
        message: 'Service uploaded successfully',
        service: {
            title,
            category,
            price,
            description,
            images: req.files.map(file => `/uploads/${file.filename}`),
        },
    });
};


module.exports = {
    getSuppliersHandler,
    addService
};
