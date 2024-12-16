const axios = require("axios");
const cheerio = require("cheerio");
const cloudinary = require("../controllers/cloudinary");

const Blog = require("../models/blogsModel");

async function scrapeWeatherData() {
    try {
        const { data } = await axios.get(
            "https://nchmf.gov.vn/Kttv/vi-VN/1/thoi-tiet-nguy-hiem-5-15.html"
        );
        const $ = cheerio.load(data);

        const articleLinks = [];
        $("div.main-wrp div.grp-list-item ul.uk-list li ").each(
            (_, element) => {
                const link = $(element)
                    .find("div.uk-width-expand div.text-weather-location a")
                    .attr("href");

                if (link) {
                    articleLinks.push(link);
                }
            }
        );

        for (const url of articleLinks) {
            await scrapeArticle(url);
        }
    } catch (error) {
        console.error("Error scraping data:", error);
    }
}

async function scrapeArticle(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const title = $("h2.tt-content-news").text().trim();
        const content = $("p.MsoNormal")
            .map((_, p) => $(p).text().trim())
            .get()
            .join("&nbsp;&nbsp;");
        const image = $("img.popupImage").attr("src");

        if (title && content) {
            const exists = await Blog.findOne({ title, content });
            if (!exists) {
                await Blog.create({ title, content, image });
            }
        }
    } catch (error) {
        console.error(`Error scraping article from ${url}:`, error.message);
    }
}

const getBlogData = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Lấy tham số trang từ query
        const limit = parseInt(req.query.limit) || 4; // Số lượng phản hồi trên mỗi trang
        const skip = (page - 1) * limit; // Tính số phản hồi cần bỏ qua

        const blogs = await Blog.find()
            .sort({ createdAt: -1 }) // Sắp xếp theo ngày tạo mới nhất
            .skip(skip) // Bỏ qua số phản hồi đã chỉ định
            .limit(limit); // Giới hạn số phản hồi;

        const totalBlogs = await Blog.countDocuments(); // Đếm tổng số phản hồi
        const totalPages = Math.ceil(totalBlogs / limit); // Tính tổng số trang

        res.status(200).json({
            blogs,
            totalPages, // Trả về tổng số trang
            currentBlogsPage: page, // Trả về trang hiện tại
        });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const postBlog = async (req, res) => {
    try {
        const { title, content, image } = req.body;

        if (!title || !content) {
            return res
                .status(400)
                .json({ message: "Title and content are required." });
        }

        const newBlog = new Blog({
            title,
            content,
            image,
        });

        // Lưu tin tức vào cơ sở dữ liệu
        const savedBlog = await newBlog.save();

        res.status(201).json(savedBlog); // Trả về tin tức đã lưu
    } catch (error) {
        console.error("Error saving blog:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const postComment = async (req, res) => {
    try {
        const { blogId, userName, content, image } = req.body;

        // Tìm Blog theo ID
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found." });
        }

        const imageUrl = image || null;

        // Tạo comment mới
        const newComment = {
            userName,
            content,
            image: imageUrl,
            timestamp: new Date(),
        };

        // Thêm comment vào Blog
        blog.comments.push(newComment);

        // Lưu Blog sau khi thêm comment
        const updatedBlog = await blog.save();
        if (!updatedBlog) {
            return res.status(500).json({ message: "Không thể lưu blog." });
        }

        res.status(201).json(updatedBlog);
    } catch (error) {
        console.error("Error saving comment:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { scrapeWeatherData, getBlogData, postBlog, postComment };
