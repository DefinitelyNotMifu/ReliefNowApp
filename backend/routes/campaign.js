const express = require("express");
const router = express.Router();
const {
    postCampainData,
    getCampaignData,
} = require("../controllers/campaignController");

router.post("/", postCampainData);
router.get("/", getCampaignData);

module.exports = router;
