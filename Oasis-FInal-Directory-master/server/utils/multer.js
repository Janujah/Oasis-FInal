const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer storage with Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'images', // Optional - specify a folder in your Cloudinary account
        allowedFormats: ['jpg', 'jpeg', 'png'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }], // Optional - specify image transformations
        resource_type: 'auto' // Optional - specify the type of resource (auto, image, video, raw)
    }
});

// Create multer middleware with Cloudinary storage
const uploaded = multer({ storage: storage }).single('profileImage');

module.exports = { uploaded };
