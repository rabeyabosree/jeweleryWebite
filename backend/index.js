const express = require('express')
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const products = require("./utility/data")
const Blog = require("./models/blogModel")
const app = express()

const PORT = process.env.PORT

// cors
app.use(cors(
    {
        origin: process.env.BASE_URL,
        credentials: true
    }
))

// json and formdat data middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//mongoose connection
const MONGO_URI = process.env.MONGO_URL
mongoose.connect(MONGO_URI)
    .then(() => console.log("Mongodb connected"))
    .catch((error) => console.error("mongodb error", error))

// const seedProducts = async () => {
//   try {
//     await mongoose.connect(MONGO_URI);
//     console.log("MongoDB connected");

//     // Optional: Clear existing data
//     await Blog.deleteMany();

//     // Insert dummy products
//     await Blog.insertMany(products);
//     console.log("✅ Products inserted successfully");

//     process.exit(); // Exit the script
//   } catch (err) {
//     console.error("MongoDB error:", err);
//     process.exit(1);
//   }
// };

// seedProducts()

// Run the seeder



// routes
const productRoute = require("./routes/productRoute")
const authRoute = require("./routes/authRoute")
const orderRoute = require("./routes/OrderRoute")
const blogRoute = require("./routes/blogRoute")

app.use("/api/products", productRoute)
app.use("/api/auth", authRoute)
app.use("/api/orders", orderRoute)
app.use("/api/blogs", blogRoute)



// app listening
app.listen(PORT, () => { console.log(`Server is running at http://localhost:${PORT}`) })

// app response
app.use("/", (req, res) => {
    res.send("Hello world")
})