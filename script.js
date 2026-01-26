/* ===============================
   CONFIG
================================ */
const API_URL = "https://payview-marketplace-4.onrender.com";

/* ===============================
   AUTH HELPERS
================================ */
function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
}

function isLoggedIn() {
    return !!localStorage.getItem("token");
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

/* ===============================
   LOGIN
================================ */
async function login(email, password) {
    try {
        const res = await fetch(`${API_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            return { success: false, message: data.message || "Login failed" };
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("currentUser", JSON.stringify(data.user));

        return { success: true };
    } catch (err) {
        return { success: false, message: "Server error" };
    }
}

/* ===============================
   REGISTER
================================ */
async function register(userData) {
    try {
        const res = await fetch(`${API_URL}/api/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        const data = await res.json();

        if (!res.ok) {
            return { success: false, message: data.message || "Register failed" };
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("currentUser", JSON.stringify(data.user));

        return { success: true };
    } catch (err) {
        return { success: false, message: "Server error" };
    }
}

/* ===============================
   AUTH FORMS
================================ */
function initAuthForms() {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = loginForm.email.value;
            const password = loginForm.password.value;

            const result = await login(email, password);

            if (result.success) {
                window.location.href = "dashboard.html";
            } else {
                alert(result.message);
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const userData = {
                name: registerForm.name.value,
                email: registerForm.email.value,
                phone: registerForm.phone.value,
                password: registerForm.password.value
            };

            const result = await register(userData);

            if (result.success) {
                window.location.href = "dashboard.html";
            } else {
                alert(result.message);
            }
        });
    }
}

/* ===============================
   LISTINGS FETCH
================================ */
async function fetchListings() {
    try {
        const res = await fetch(`${API_URL}/api/listings`);
        const listings = await res.json();
        renderListings(listings);
    } catch {
        console.error("Failed to fetch listings");
    }
}

/* ===============================
   RENDER LISTINGS
================================ */
function renderListings(listings) {
    const container = document.getElementById("listingsContainer");
    if (!container) return;

    container.innerHTML = "";

    listings.forEach(listing => {
        const card = document.createElement("div");
        card.className = "listing-card";

        card.innerHTML = `
            <img src="${listing.images?.[0] || 'https://via.placeholder.com/300'}">
            <h3>${listing.title}</h3>
            <p>${listing.location}</p>
            <strong>${listing.price} RWF</strong>
        `;

        container.appendChild(card);
    });
}

/* ===============================
   UPLOAD LISTING
================================ */
async function saveListingFromForm(form, images, videos) {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please login");
        return;
    }

    const formData = new FormData();
    formData.append("title", form.title.value);
    formData.append("category", form.category.value);
    formData.append("price", form.price.value);
    formData.append("location", form.location.value);
    formData.append("phone", form.phone.value);
    formData.append("description", form.description.value);
    formData.append("availability", form.availability.value);

    images.forEach(img => formData.append("images", img));
    videos.forEach(video => formData.append("videos", video));

    const res = await fetch(`${API_URL}/api/listings`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    });

    if (res.ok) {
        alert("Listing uploaded!");
        window.location.href = "dashboard.html";
    } else {
        alert("Upload failed");
    }
}

/* ===============================
   PAGE GUARDS
================================ */
function protectPage() {
    if (!isLoggedIn()) {
        window.location.href = "login.html";
    }
}

/* ===============================
   INIT
================================ */
document.addEventListener("DOMContentLoaded", () => {
    initAuthForms();
    fetchListings();
});
