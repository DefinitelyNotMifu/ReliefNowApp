const express = require("express");
const { getAllUsers, deleteUser } = require("../controllers/userController");
const router = express.Router();
const {
    verifyToken,
    verifyTokenandAdminAuth,
} = require("../middlewares/middlewareController");

router.get("/", verifyToken, getAllUsers);

router.delete("/:id", verifyTokenandAdminAuth, deleteUser);

module.exports = router;
