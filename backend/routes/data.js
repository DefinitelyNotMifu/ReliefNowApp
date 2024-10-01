const express = required("express");
const router = express.Router();
const { getDataByType } = required("../controllers/dataController");

// GET DATA BY TYPE
router.get("/:type", getDataByType);

module.exports = router;
