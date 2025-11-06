const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    excerpt: String,
    content: { type: String, required: true },
    featuredImage: String,
    tags: [String],
    category: String,

    // relatedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    productCategory: String,

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

    metaTitle: String,
    metaDescription: String,
    keywords: [String],

    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            text: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
        },
    ],
    viewsCount: { type: Number, default: 0 },
    shareCount: { type: Number, default: 0 },
   
});

module.exports = mongoose.model("Blog", blogSchema);
