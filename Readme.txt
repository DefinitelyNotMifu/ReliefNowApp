Bước 1: Cài Đặt Node.js và MongoDB
- Cài đặt Node.js (v16.x trở lên) và npm từ nodejs.org.
- Cài đặt MongoDB trên máy hoặc sử dụng MongoDB Atlas (Cloud).

Bước 2: Chuyển Đến Thư Mục Backend
- Mở Terminal hoặc Command Prompt.
- Dùng lệnh sau để di chuyển vào thư mục backend: cd backend

Bước 3: Cài Đặt Các Thư Viện
- Chạy lệnh sau để cài đặt tất cả các dependencies cần thiết:   
    npm install axios bcrypt bcryptjs cheerio cloudinary cookie-parser cors5 dotenv express jsonwebtoken mongodb mongoose multer multer-storage-cloudinary node-cron pdfkit twilio 

Bước 4: Chạy Ứng Dụng Backend
- Khởi động server bằng lệnh:   npm start
- Nếu thành công, server sẽ chạy trên cổng mặc định (ví dụ: http://localhost:8000). 

Ghi Chú: + Đảm bảo MongoDB đã được khởi động và cấu hình kết nối trong tệp .env.
	 + Kiểm tra hoạt động backend thông qua Thunder Client hoặc API client khác.

