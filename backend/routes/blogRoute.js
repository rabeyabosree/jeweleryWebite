const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authmiddware")
const isAdmin = require("../middleware/isAdmin")
const Blog = require("../models/blogModel")
const slugify = require("slugify")
const upload = require("../utility/multer")


// ----- Admin -----
// post blog
router.post("/", upload.single("featuredImage"), isAdmin, authMiddleware, async (req, res) => {
    try {
        const {
            title,
            slug,
            excerpt,
            content,
            tags,
            category,
            productCategory,
            metaTitle,
            metaDescription,
            keywords,
        } = req.body;

        // Basic validation
        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        // Auto-generate slug if not provided
        const blogSlug = slug ? slugify(slug, { lower: true, strict: true }) : slugify(title, { lower: true, strict: true });

        const featuredImage = req.file.path || '';
        // ✅ Convert tags & keywords to arrays
        const formattedTags = tags ? tags.split(",").map(tag => tag.trim()) : [];
        const formattedKeywords = keywords ? keywords.split(",").map(kw => kw.trim()) : [];

        // Create blog document
        const blog = new Blog({
            title,
            slug: blogSlug,
            excerpt,
            content,
            featuredImage,
            tags: formattedTags,
            category,
            productCategory,
            metaTitle,
            metaDescription,
            keywords: formattedKeywords,
        });

        await blog.save();

        res.status(201).json({
            message: "Blog created successfully",
            blog,
        });
    } catch (err) {
        console.error("Create Blog Error:", err);
        res.status(500).json({
            message: "Failed to create blog",
            error: err.message,
        });
    }
});

// get all blog
router.get("/", authMiddleware, isAdmin, async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 }); // latest first
        res.status(200).json({
            message: "Blogs fetched successfully",
            blogs,
        });
    } catch (error) {
        console.error("Get All Blogs Error:", error);
        res.status(500).json({
            message: "Failed to fetch blogs",
            error: error.message,
        });
    }
});

// update route
router.put("/:id", isAdmin, authMiddleware, upload.single("featuredImage"), async (req, res) => {
    try {
        const blogId = req.params.id;
        const existingBlog = await Blog.findById(blogId);

        if (!existingBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Destructure request body
        const {
            title,
            slug,
            excerpt,
            content,
            tags,
            category,
            productCategory,
            metaTitle,
            metaDescription,
            keywords,
        } = req.body;

        // Update fields
        if (title) existingBlog.title = title;
        if (slug) {
            existingBlog.slug = slugify(slug, { lower: true, strict: true });
        } else if (title) {
            existingBlog.slug = slugify(title, { lower: true, strict: true });
        }
        if (excerpt) existingBlog.excerpt = excerpt;
        if (content) existingBlog.content = content;
        if (category) existingBlog.category = category;
        if (productCategory) existingBlog.productCategory = productCategory;
        if (metaTitle) existingBlog.metaTitle = metaTitle;
        if (metaDescription) existingBlog.metaDescription = metaDescription;

        // Parse tags and keywords if provided
        if (tags) {
            existingBlog.tags = tags.split(",").map((t) => t.trim());
        }
        if (keywords) {
            existingBlog.keywords = keywords.split(",").map((k) => k.trim());
        }

        // Update featured image if uploaded
        if (req.file && req.file.path) {
            existingBlog.featuredImage = req.file.path;
        }

        existingBlog.updatedAt = Date.now();

        const updatedBlog = await existingBlog.save();

        res.status(200).json({
            message: "Blog updated successfully",
            blog: updatedBlog,
        });
    } catch (err) {
        console.error("Update Blog Error:", err);

        // Handle duplicate slug error
        if (err.code === 11000 && err.keyValue.slug) {
            return res.status(400).json({
                message: `Slug "${err.keyValue.slug}" already exists. Please use a different one.`,
            });
        }

        res.status(500).json({
            message: "Failed to update blog",
            error: err.message,
        });
    }
});

// delete
router.delete("/:id", isAdmin, authMiddleware, async (req, res) => {
    try {
        const blogId = req.params.id;

        // Find blog by ID
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Delete blog
        await Blog.findByIdAndDelete(blogId);

        res.status(200).json({
            message: "Blog deleted successfully",
            blogId,
        });
    } catch (err) {
        console.error("Delete Blog Error:", err);
        res.status(500).json({
            message: "Failed to delete blog",
            error: err.message,
        });
    }
});

// ----- Public ----- 

// get all published blogs
router.get("/public", async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json({
            message: "Blogs fetched successfully",
            blogs,
        });
    } catch (error) {
        console.error("Get All Blogs Error:", error);
        res.status(500).json({
            message: "Failed to fetch blogs",
            error: error.message,
        });
    }

})

// get single blog
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Find blog by ID and populate comments and likes if needed
        const blog = await Blog.findById(id)
            .populate("comments.user", "name email") // populate user info in comments
            .populate("likes", "name email"); // populate likes info

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Increment viewsCount
        blog.viewsCount = (blog.viewsCount || 0) + 1;
        await blog.save();

        res.status(200).json(blog);
    } catch (err) {
        console.error("Fetch Single Blog Error:", err);
        res.status(500).json({ message: "Failed to fetch blog", error: err.message });
    }
});

// ----- Authenticated Users -----

// like/unlike blog for authenticated users
router.post("/:id/like", authMiddleware, async (req, res) => {
    try {
        const blogId = req.params.id;
        const userId = req.user.userId;

        const blog = await Blog.findById(blogId);
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        const alreadyLiked = blog.likes.includes(userId);

        if (alreadyLiked) {
            // Unlike
            blog.likes = blog.likes.filter(id => id.toString() !== userId);
        } else {
            // Like
            blog.likes.push(userId);
        }

        await blog.save();
        res.status(200).json({
            message: alreadyLiked ? "Blog unliked" : "Blog liked",
            likesCount: blog.likes.length,
            liked: !alreadyLiked,
            userId: req.user.userId // ekhane pathate hobe
        });

    } catch (err) {
        res.status(500).json({ message: "Error liking blog", error: err.message });
    }
});



// comment
router.post("/:id/comment", async (req, res) => {

})
// share
router.post("/:id/share", async (req, res) => {

})

module.exports = router