const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET,
});

// Multer storage config for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "JeweleryImgs", // Cloudinary folder name
        allowed_formats: ["jpg", "jpeg", "png"], // Allowed image types
        transformation: [{ width: 500, height: 500, crop: "limit" }], // Resize
    },
});

const upload = multer({ storage });

module.exports = upload;
