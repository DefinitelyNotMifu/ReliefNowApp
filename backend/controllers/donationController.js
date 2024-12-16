const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const Donation = require("../models/donationModel");

const donate = async (req, res) => {
    try {
        const { donor, amount, items } = req.body;

        const newDonate = new Donation({
            donor,
            amount,
            items,
        });

        const saveDonate = await newDonate.save();

        res.status(200).json(saveDonate);
    } catch (err) {
        console.log("Error saving donate", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const fetchDonor = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Lấy tham số trang từ query
        const limit = parseInt(req.query.limit) || 3; // Số lượng phản hồi trên mỗi trang
        const skip = (page - 1) * limit; // Tính số phản hồi cần bỏ qua

        const donates = await Donation.find()
            .sort({ createdAt: -1 }) // Sắp xếp theo ngày tạo mới nhất
            .skip(skip) // Bỏ qua số phản hồi đã chỉ định
            .limit(limit); // Giới hạn số phản hồi

        const totalDonates = await Donation.countDocuments(); // Đếm tổng số phản hồi
        const totalPages = Math.ceil(totalDonates / limit); // Tính tổng số trang

        res.status(200).json({
            donates,
            totalPages, // Trả về tổng số trang
            currentPage: page, // Trả về trang hiện tại
        });
    } catch (error) {
        console.error("Error fetching donor:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { donate, fetchDonor };
