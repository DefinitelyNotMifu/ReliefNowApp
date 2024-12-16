const express = require("express");
const router = express.Router();
const { donate, fetchDonor } = require("../controllers/donationController");

router.post("/", donate);
router.get("/", fetchDonor);

module.exports = router;
