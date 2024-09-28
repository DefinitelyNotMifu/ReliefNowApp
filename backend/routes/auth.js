const express = require("express");
const {
    authRegister,
    authLogin,
    requestRefreshToken,
    userLogout,
} = require("../controllers/authController");

const {
    verifyToken,
    verifyTokenandAdminAuth,
} = require("../middlewares/middlewareController");

const router = express.Router();

// reigister
router.post("/register", authRegister);

// login
router.post("/login", authLogin);

// refresh
router.post("/refresh", requestRefreshToken);

//logout
router.post("/logout", verifyToken, userLogout);

module.exports = router;
