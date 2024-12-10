const multer = require('multer');
const path = require('path');

// Set up storage configuration for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory to store uploaded images
    },
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname);
        cb(null, Date.now() + extension); // Unique filename
    }
});

// Set up multer instance for multiple file uploads
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only JPEG, PNG, and JPG images are allowed'));
        }
    }
});

module.exports = upload;
