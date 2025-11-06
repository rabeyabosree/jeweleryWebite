const mongoose = require("mongoose")

// 🔹 Embedded Review Schema
const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // from your User model
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// 🔹 Main Product Schema
const productSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    image: 
      {
        type: String,
        required: true,
      },
    materials: {
      type: [String],
      default: [],
    },
    sale: {
      type: Number, // Example: 10 means 10% off
      default: 0,
    },
    additionalDescription: {
      type: String,
      default: "",
    },
    reviews: [reviewSchema], // ✅ Embedded reviews
    averageRating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// 🔹 Auto-calculate average rating before saving
productSchema.pre("save", function (next) {
  if (this.reviews.length > 0) {
    const total = this.reviews.reduce((acc, rev) => acc + rev.rating, 0);
    this.averageRating = Math.round((total / this.reviews.length) * 10) / 10;
  } else {
    this.averageRating = 0;
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
