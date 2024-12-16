const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
    image: {
        type: String,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    comments: [commentSchema],
    createAt: {
        type: Date,
        default: Date.now,
    },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
