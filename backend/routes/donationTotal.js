const express = require("express");
const router = express.Router();
const {
    fetchDonationTotal,
    updateDonationTotal,
} = require("../controllers/donationTotalController");

router.get("/", fetchDonationTotal);
router.post("/", updateDonationTotal);

module.exports = router;
