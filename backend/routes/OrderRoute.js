const express = require("express");
const User = require("../models/authModel");
const Product = require("../models/productModel")
const Order = require("../models/orderModel")
const authMiddleware = require("../middleware/authmiddware")
const isAdmin = require("../middleware/isAdmin")

const router = express.Router();

// create order 
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, subtotal } = req.body;
    const userId = req.user.userId;

    let shippingFee = 0;
    if (shippingAddress.district.toLowerCase() === "dhaka") {
      shippingFee = 60;
    } else {
      shippingFee = 120;
    }

    const totalPrice = subtotal + shippingFee;

    // Step 1: Create initial order (pending payment if online)
    const order = await Order.create({
      user: userId,
      orderItems,
      shippingAddress,
      paymentMethod,
      shippingFee,
      subtotal,
      totalPrice,
      isPaid: paymentMethod === "COD" ? true : false,
      paidAt: paymentMethod === "COD" ? Date.now() : null,
      status: paymentMethod === "COD" ? "Processing" : "Pending"
    });

    // Step 2: If online, return payment gateway link
    if (paymentMethod === "card" || paymentMethod === "bkash") {
      return res.json({
        success: true,
        message: "Redirect to payment",
        orderId: order._id,
        paymentUrl: `/pay/${order._id}`
      });
    }

    res.json({ success: true, message: "Order placed successfully (COD)", order: order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/orders/online-payment
router.post("/payment/success/:orderId", authMiddleware, async (req, res) => {
  try {
    const { orderId } = req.params;
    const paymentInfo = req.body; // transactionId etc.

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = paymentInfo;
    order.status = "Processing";

    await order.save();

    res.json({ success: true, message: "Payment successful", order });
  } catch (error) {
    res.status(500).json({ message: error.message });

  }
});

// get all orders
router.get("/myorders", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId })
      .sort({ createdAt: -1 })
      .populate("orderItems.product", "name price images");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


// get all orders for admin
router.get("/admin", authMiddleware, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("user", "name email")
      .populate("orderItems.product", "name price image");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single order by ID
router.get("/:orderId", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate("user");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


// update order status route
router.put("/:id/status", authMiddleware, isAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = req.body.status || order.status;
    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




module.exports = router;