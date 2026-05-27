const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
        },

        image: {
            type: String,
            required: true,
        },

        date: {
            type: String,
            required: true,
        },

        category: {
            type: Array,
            default: [],
        },

        author: {
            type: String,
            required: true,
        },

        designation: {
            type: String,
            required: true,
        },

        content: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "Blog",
    BlogSchema
);