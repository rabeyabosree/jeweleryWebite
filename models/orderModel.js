const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        orderItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                title: { type: String, required: true },
                image: { type: String },
                qty: { type: Number, required: true },
                price: { type: Number, required: true },
            },
        ],

        shippingAddress: {
            name: { type: String, required: true },
            phone: { type: String, required: true },
            district: { type: String, required: true },
            subDistrict: { type: String, required: true },
            area: { type: String, required: true },
        },

        paymentMethod: {
            type: String,
            enum: ["cod", "card", "bkash"],
            required: true,
        },

        paymentInfo: {
            id: { type: String },
            status: { type: String },
            update_time: { type: String }
        },

        shippingFee: {
            type: Number,
            default: 0,
        },

        subtotal: {
            type: Number,
            required: true,
        },

        totalPrice: {
            type: Number,
            required: true,
        },

        // 🔹 Order status system
        status: {
            type: String,
            enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
            default: "Pending",
        },

        isPaid: {
            type: Boolean,
            default: false,
        },

        paidAt: {
            type: Date,
        },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
