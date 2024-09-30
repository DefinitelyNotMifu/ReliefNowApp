const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

// VERIFY TOKEN
const verifyToken = (req, res, next) => {
    const token = req.headers.token;
    if (token) {
        const accessToken = token.split(" ")[1];
        jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (error, user) => {
            if (error) {
                res.status(403).json("Token is not valid");
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json("You are not authenticated");
    }
};

// VERIFY TOKEN WITH ADMIN AUTHENTICATED
const verifyTokenandAdminAuth = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id == req.params.id || req.user.admin) {
            next();
        } else {
            res.status(403).json("You are not allowed to delete other");
        }
    });
};

// Thiết lập nơi lưu trữ và tên tệp
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Đường dẫn nơi lưu trữ ảnh
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Đặt tên tệp theo thời gian
    },
});

module.exports = { verifyToken, verifyTokenandAdminAuth };
