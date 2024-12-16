const Feedback = require("../models/feedbackModel");

const postFeedbackData = async (req, res) => {
    try {
        const { user, content, images } = req.body;

        // Kiểm tra nếu các trường bắt buộc không được để trống
        if (!user || !content) {
            return res
                .status(400)
                .json({ message: "User and content are required." });
        }

        const newFeedback = new Feedback({
            user,
            content,
            images,
        });

        // Lưu phản hồi vào cơ sở dữ liệu
        const savedFeedback = await newFeedback.save();

        res.status(201).json(savedFeedback); // Trả về phản hồi đã lưu
    } catch (error) {
        console.error("Error saving feedback:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getFeedbackData = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Lấy tham số trang từ query
        const limit = parseInt(req.query.limit) || 3; // Số lượng phản hồi trên mỗi trang
        const skip = (page - 1) * limit; // Tính số phản hồi cần bỏ qua

        const feedbacks = await Feedback.find()
            .populate("user", "fullname username email") // Lấy thông tin người dùng
            .sort({ createdAt: -1 }) // Sắp xếp theo ngày tạo mới nhất
            .skip(skip) // Bỏ qua số phản hồi đã chỉ định
            .limit(limit); // Giới hạn số phản hồi

        const totalFeedbacks = await Feedback.countDocuments(); // Đếm tổng số phản hồi
        const totalPages = Math.ceil(totalFeedbacks / limit); // Tính tổng số trang

        res.status(200).json({
            feedbacks,
            totalPages, // Trả về tổng số trang
            currentFeedbackPage: page, // Trả về trang hiện tại
        });
    } catch (error) {
        console.error("Error fetching feedback:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { postFeedbackData, getFeedbackData };
