const express = require("express");

const router = express.Router();

const Blog = require("../models/Blog");

/* GET ALL BLOGS */
router.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find().sort({
            createdAt: -1,
        });

        res.json(blogs);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

/* GET SINGLE BLOG */
router.get("/:slug", async (req, res) => {
    try {
        const blog = await Blog.findOne({
            slug: req.params.slug,
        });

        res.json(blog);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

/* CREATE BLOG */
router.post("/", async (req, res) => {
    try {
        const newBlog = new Blog(req.body);

        const savedBlog = await newBlog.save();

        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

/* UPDATE BLOG */
router.put("/:id", async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );

        res.json(updatedBlog);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

/* DELETE BLOG */
router.delete("/:id", async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

        res.json(deletedBlog);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

module.exports = router;