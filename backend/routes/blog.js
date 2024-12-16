const express = require("express");
const router = express.Router();
const {
    getBlogData,
    postBlog,
    postComment,
} = require("../controllers/blogController");

router.get("/", getBlogData);
router.post("/", postBlog);
router.post("/comment", postComment);

module.exports = router;
