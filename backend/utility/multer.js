const muletr = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const cloudinary = require("./cloudinary")


const imgStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "JeweleryImgs",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        transformation: [{ width: 800, height: 800, crop: "limit" }],
    }
})

const upload = muletr({ storage: imgStorage });

module.exports = upload

