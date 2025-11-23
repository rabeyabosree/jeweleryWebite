const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: 3,
            maxlength: 50,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Please fill a valid email address",
            ],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
        },
        profile: { type: String },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        resetOTP: {
            type: String,
            minlength: 6,
        },
        otpExpire: {
            type: String,
           },
    },
    { timestamps: true }
);

// 🔹 Password hashing before save
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // only hash if modified
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// 🔹 Method to compare password for login
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
