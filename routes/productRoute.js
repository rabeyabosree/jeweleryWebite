const express = require("express")
const Product = require('./../models/productModel')
const upload = require("../utility/multer")
const User = require("../models/authModel")
const isAdmin = require("../middleware/isAdmin")
const authMiddlware = require("../middleware/authmiddware")
const mongoose = require("mongoose")

const router = express.Router()


// products uplod for admin
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { category, title, description, price, stock, materials, sale, additionalDescription } = req.body;

    // Validation
    if (!category || !title || !description || !price || !stock) {
      return handleError(res, "All required fields must be provided", 400);
    }

    if (!req.file) {
      return handleError(res, "Product image is required", 400);
    }

    // Materials parsing
    let materialsArray = [];
    if (materials) {
      try {
        materialsArray = JSON.parse(materials);
      } catch {
        materialsArray = materials.split(",").map((m) => m.trim());
      }
    }

    // Create product document
    const newProduct = new Product({
      category: category.trim(),
      title: title.trim(),
      description: description.trim(),
      price: parseFloat(price),
      stock: parseInt(stock),
      image: req.file.path,
      materials: materialsArray,
      sale: sale ? parseInt(sale) : 0,
      additionalDescription: additionalDescription ? additionalDescription.trim() : "",
    });

    const savedProduct = await newProduct.save();

    // Structured success response
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Create Product Error:", error);
    handleError(res);
  }
});

// get all produts for admin
router.get("/all", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json({
      success: true,
      products: products,
      message: "Products fetched successfuly"
    });
  } catch (error) {
    console.error("Fetch all products error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }

})

// get single product for admin
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, product: product, message: "single product fetched successfully" });
  } catch (error) {
    console.error("Fetch single product error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }

})

// edit single product for admin
router.put("/edit/:id", upload.single("image"), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    const {
      category,
      title,
      description,
      price,
      stock,
      materials,
      sale,
      additionalDescription,
    } = req.body;

    // Update fields if provided
    if (category) product.category = category;
    if (title) product.title = title;
    if (description) product.description = description;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (materials) {
      try {
        product.materials = JSON.parse(materials);
      } catch {
        product.materials = materials.split(",");
      }
    }
    if (sale) product.sale = sale;
    if (additionalDescription) product.additionalDescription = additionalDescription;

    // Update image if new file uploaded
    if (req.file) product.image = req.file.path;

    const updatedProduct = await product.save();
    res.status(200).json({ success: true, message: "Product updated", product: updatedProduct });
  } catch (error) {
    console.error("Edit product error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }

})

// get single product for public
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    await product.deleteOne(); // remove from DB
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// get all products for public
router.get("/all", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json({ success: true, products: products, message: "all product fetched successfuly" });
  } catch (error) {
    console.error("Get all products error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// get single product for public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, product: product, message: "fetched single product" });
  } catch (error) {
    console.error("Get single product error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});


// Add review to a product
router.post("/review/:id", authMiddlware, async (req, res) => {
  try {
    const productId = req.params.id;
    const { rating, comment } = req.body;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId))
      return res.status(400).json({ message: "Invalid product ID" });

    const userId = req.user?.userId;
    if (!userId)
      return res.status(401).json({ message: "User not authenticated" });

    // Find the product
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Find user to get name
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Create review object
    const newReview = {
      user: user._id,
      name: user.name,
      rating,
      comment,
    };

    // Push into product reviews
    product.reviews.push(newReview);

    // Recalculate average rating
    product.averageRating =
      product.reviews.reduce((acc, item) => acc + item.rating, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({
      message: "Review added successfully",
      reviews: product.reviews,
      averageRating: product.averageRating,
    });
  } catch (error) {
    console.error("Add Review Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Get all reviews for a product
router.get("/reviews/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("reviews.user", "name profile");
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ reviews: product.reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router


