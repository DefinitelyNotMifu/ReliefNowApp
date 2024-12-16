const express = require("express");
const router = express.Router();
const {
    postFeedbackData,
    getFeedbackData,
} = require("../controllers/feedbackController");

router.post("/", postFeedbackData);
router.get("/", getFeedbackData);

module.exports = router;
