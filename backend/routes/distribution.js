const express = require("express");
const router = express.Router();
const distribution = require("../controllers/distributionController");

router.post("/", distribution);

module.exports = router;
