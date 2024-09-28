async function register(e) {
    e.preventDefault();

    // Lấy dữ liệu từ form
    const formData = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };

    try {
        // Gửi request tới API
        let response = await fetch("http://localhost:8000/v1/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        // Đọc phản hồi JSON
        let result = await response.json();

        // Kiểm tra mã trạng thái
        if (response.ok) {
            // `response.ok` sẽ là true cho mã trạng thái 200-299
            alert("Đăng ký thành công!");
            window.location.href = "index.html";
        } else {
            alert("Đăng ký thất bại: " + result.message || "Có lỗi xảy ra.");
        }
    } catch (error) {
        alert("Có lỗi xảy ra trong quá trình đăng ký.");
        console.error("Error:", error);
    }
}

async function login(e) {
    if (e) e.preventDefault();

    const formData = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
    };

    try {
        let response = await fetch("http://localhost:8000/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        let result = await response.json();

        if (response.ok) {
            alert("Đăng nhập thành công!");
            localStorage.setItem("token", result.token); // Lưu token vào Local Storage
            localStorage.setItem("username", formData.username); // Lưu tên đăng nhập
            updateUI(); // Cập nhật giao diện người dùng
            window.location.href = "index.html";
        } else {
            alert(
                "Đăng nhập thất bại: " + (result.message || "Có lỗi xảy ra.")
            );
        }
    } catch (error) {
        alert("Có lỗi xảy ra trong quá trình đăng nhập.");
        console.error("Error:", error);
    }
}
function updateUI() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (token) {
        // Nếu đã đăng nhập
        document.getElementById("auth").style.display = "none";
        document.getElementById("userDropdown").style.display = "block";
        document.getElementById(
            "usernameDisplay"
        ).innerText = `Hi, ${username}`;
    } else {
        // Nếu chưa đăng nhập
        document.getElementById("auth").style.display = "block";
        document.getElementById("userDropdown").style.display = "none";
    }
}

// Gọi hàm này khi trang được tải
window.onload = function () {
    updateUI();
};
function logout(e) {
    if (e) e.preventDefault();

    localStorage.removeItem("token");
    localStorage.removeItem("username");
    updateUI(); // Cập nhật giao diện người dùng
    alert("Đăng xuất thành công!");
}
