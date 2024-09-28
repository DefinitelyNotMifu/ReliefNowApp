const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

dotenv.config();
const app = express();

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Kết nối đến MongoDB Atlas thành công!");
    })
    .catch((err) => {
        console.error("Không thể kết nối đến MongoDB");
    });

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.listen(8000, () => {
    console.log("Server is running");
});

// ROUTES
app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);

// AUTHENTICATION
