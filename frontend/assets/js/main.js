// REGISTER
async function register(e) {
    e.preventDefault();

    const formData = {
        fullname: document.getElementById("fullname").value,
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        role: document.getElementById("role").value,
        password: document.getElementById("password").value,
        password_confirmation: document.getElementById("password_confirmation")
            .value,
    };

    if (!validatePasswords(formData.password, formData.password_confirmation)) {
        return;
    }

    try {
        let response = await fetch("http://localhost:8000/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        let result = await response.json();

        if (response.ok) {
            showSuccessToast("Đăng ký", "Đăng ký thành công!");
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
        } else {
            showErrorToast("Đăng ký", "Có lỗi xảy ra, vui lòng thử lại sau!");
        }
    } catch (error) {
        showErrorToast("Đăng ký", "Có lỗi xảy ra, vui lòng thử lại sau!");
    }
}

// LOGIN
async function login(e) {
    if (e) e.preventDefault();

    const formData = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
    };

    try {
        let response = await fetch("http://localhost:8000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        let result = await response.json();

        if (response.ok) {
            showSuccessToast("Đăng nhập", "Đăng nhập thành công!");

            localStorage.setItem("user", JSON.stringify(result));
            localStorage.setItem("token", result.accessToken);
            localStorage.setItem("username", result.username);

            updateUI();
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
        } else {
            showErrorToast("Đăng nhập", "Có lỗi xảy ra, vui lòng thử lại sau!");
        }
    } catch (error) {
        showErrorToast("Đăng nhập", "Có lỗi xảy ra, vui lòng thử lại sau!");
    }
}

// LOGOUT
function logout(e) {
    if (e) e.preventDefault();

    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("user");

    updateUI();
    showSuccessToast("Đăng xuất", "Đăng xuất thành công!");
}

// UPDATE UI
function updateUI() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (token) {
        document.getElementById("auth").style.display = "none";
        document.getElementById("userDropdown").style.display = "block";
        document.getElementById(
            "usernameDisplay"
        ).innerText = `Hi,  ${username}`;
    } else {
        document.getElementById("auth").style.display = "block";
        document.getElementById("userDropdown").style.display = "none";
    }
}

// CHECK VALIDATION PASSWORD
function validatePasswords(password, password_confirmation) {
    if (password === password_confirmation) {
        return true;
    } else {
        showErrorToast("Đăng ký", "Mật khẩu và xác nhận mật khẩu không khớp!");
        return false;
    }
}

// AUTO UPDATE UI WHEN LOADING PAGE
window.onload = function () {
    updateUI();
};

// TOAST
function showSuccessToast(activity, state) {
    myToast({
        title: activity,
        message: state,
        type: "success",
        duration: 5000,
    });
}

function showErrorToast(activity, state) {
    myToast({
        title: activity,
        message: state,
        type: "error",
        duration: 5000,
    });
}

function myToast({ title = "", message = "", type = "info", duration = 3000 }) {
    const main = document.getElementById("myToast");
    if (main) {
        const myToast = document.createElement("div");

        // Auto remove toast
        const autoRemoveId = setTimeout(function () {
            main.removeChild(myToast);
        }, duration + 1000);

        // Remove toast when clicked
        myToast.onclick = function (e) {
            if (e.target.closest(".myToast__close")) {
                main.removeChild(myToast);
                clearTimeout(autoRemoveId);
            }
        };

        const icons = {
            success: "fas fa-check-circle",
            info: "fas fa-info-circle",
            warning: "fas fa-exclamation-circle",
            error: "fas fa-exclamation-circle",
        };
        const icon = icons[type];
        const delay = (duration / 1000).toFixed(2);

        myToast.classList.add("myToast", `myToast--${type}`);
        myToast.style.animation = `slideInLeft ease .1s, fadeOut linear 1s ${delay}s forwards`;

        myToast.innerHTML = `
                      <div class="myToast__icon">
                          <i class="${icon}"></i>
                      </div>
                      <div class="myToast__body">
                          <h3 class="myToast__title">${title}</h3>
                          <p class="myToast__msg">${message}</p>
                      </div>
                      <div class="myToast__close">
                          <i class="fas fa-times"></i>
                      </div>
                  `;
        main.appendChild(myToast);
    }
}

//RENDER INFORMATION
function userInformation() {
    const userTableBody = document.getElementById("userTableBody");

    const user = localStorage.getItem("user");
    const userObj = JSON.parse(user);

    let roleDisplay;
    switch (userObj.role) {
        case "donor":
            roleDisplay = "Người đóng góp";
            break;
        case "recipient":
            roleDisplay = "Người cần hỗ trợ";
            break;
        case "organization":
            roleDisplay = "Tổ chức từ thiện";
            break;
        case "adminstrator":
            roleDisplay = "Quản trị viên hệ thống";
            break;
        default:
            roleDisplay = "";
            break;
    }

    const table = `
        <tbody>
                        <tr>
                            <th>Họ Và Tên</th>
                            <td>${userObj.fullname}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>${userObj.email}</td>
                        </tr>
                        <tr>
                            <th>Số Điện Thoại</th>
                            <td>${userObj.phoneNumber}</td>
                        </tr>
                        <tr>
                            <th>Địa Chỉ</th>
                            <td>${userObj.address}</td>
                        </tr>
                        <tr>
                            <th>Vai trò</th>
                            <td>${roleDisplay}</td>
                        </tr>
                    </tbody>
    `;

    userTableBody.innerHTML = table;
}
