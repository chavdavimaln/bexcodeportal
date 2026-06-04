const express = require("express");

const router = express.Router();

const Blog = require("../models/Blog");

/*
|--------------------------------------------------------------------------
| GET BLOG LIST
|--------------------------------------------------------------------------
*/
router.get("/list", async (req, res) => {
    try {
        const blogs = await Blog.find().sort({
            createdAt: -1,
        });

        return res.json({
            status: true,
            message: "Blogs fetched successfully.",
            data: blogs,
            total: blogs.length,
            page_no: 1,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
});

/*
|--------------------------------------------------------------------------
| BLOG DETAILS
|--------------------------------------------------------------------------
*/
router.get("/details/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(
            req.params.id
        );

        if (!blog) {
            return res.status(404).json({
                status: false,
                message: "Blog not found",
            });
        }

        return res.json({
            status: true,
            message: "Blog fetched successfully.",
            data: {
                blog: [blog],
            },
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
});

/*
|--------------------------------------------------------------------------
| CREATE BLOG
|--------------------------------------------------------------------------
*/
router.post("/create", async (req, res) => {
    try {
        const blog = new Blog(req.body);

        const savedBlog =
            await blog.save();

        return res.status(201).json({
            status: true,
            message:
                "Blog created successfully.",
            data: {
                blog: [savedBlog],
            },
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
});

/*
|--------------------------------------------------------------------------
| UPDATE BLOG
|--------------------------------------------------------------------------
*/
router.put("/update/:id", async (req, res) => {
    try {
        const updatedBlog =
            await Blog.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                }
            );

        return res.json({
            status: true,
            message:
                "Blog updated successfully.",
            data: updatedBlog,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
});

/*
|--------------------------------------------------------------------------
| DELETE BLOG
|--------------------------------------------------------------------------
*/
router.delete("/delete/:id", async (req, res) => {
    try {
        await Blog.findByIdAndDelete(
            req.params.id
        );

        return res.json({
            status: true,
            message:
                "Blog deleted successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
});

module.exports = router;