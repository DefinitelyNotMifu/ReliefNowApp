const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    budget: {
        type: String,
        required: true,
    },
});

const Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = Campaign;
