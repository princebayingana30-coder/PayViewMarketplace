// ================================
// API Configuration
// ================================
const API_BASE_URL = "https://payview-marketplace-3.onrender.com/api/v1";

async function apiRequest(endpoint, options = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: { "Content-Type": "application/json" },
        ...options
    });
    return response.json();
}

// ================================
// Authentication
// ================================
function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem("currentUser"));
}

async function login(email, password) {
    try {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (data.success) {
            sessionStorage.setItem("currentUser", JSON.stringify(data.user));
            return { success: true, user: data.user };
        } else {
            return { success: false, message: data.message };
        }

    } catch (err) {
        console.error(err);
        return { success: false, message: "Login failed" };
    }
}

async function register(name, email, phone, password) {
    try {
        const res = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                email,
                phone,
                password
            })
        });

        const data = await res.json();

        if (data.success) {
            sessionStorage.setItem("currentUser", JSON.stringify(data.user));
            return { success: true, user: data.user };
        } else {
            return { success: false, message: data.message };
        }

    } catch (err) {
        console.error(err);
        return { success: false, message: "Registration failed" };
    }
}

function logout() {
    sessionStorage.removeItem("currentUser");
    window.location.href = "index.html";
}

function checkAuth() {
    const user = getCurrentUser();
    if (!user && window.location.pathname.includes("dashboard.html")) {
        window.location.href = "login.html";
        return false;
    }
    return !!user;
}

// ================================
// Listings API
// ================================
async function getListings() {
    const data = await apiRequest("/listings");
    return data.success ? data.listings : [];
}

async function getListingById(id) {
    const data = await apiRequest(`/listings/${id}`);
    return data.success ? data.listing : null;
}

async function saveListing(listing) {
    const user = getCurrentUser();
    if (!user) return null;

    listing.ownerId = listing.ownerId || user.id;

    const url = listing.id
        ? `/listings/${listing.id}`
        : `/listings`;

    const method = listing.id ? "PUT" : "POST";

    const data = await apiRequest(url, {
        method,
        body: JSON.stringify(listing)
    });

    return data.success ? data.listing : null;
}

async function deleteListing(id) {
    const data = await apiRequest(`/listings/${id}`, { method: "DELETE" });
    return data.success;
}

// ================================
// Listings Display
// ================================
function formatPrice(price) {
    return new Intl.NumberFormat('en-RW').format(price);
}

async function loadListingsPage() {
    let listings = await getListings();

    const categoryFilter = document.getElementById("categoryFilter");
    const sortFilter = document.getElementById("sortFilter");

    if (categoryFilter && categoryFilter.value !== "all") {
        listings = listings.filter(l => l.category === categoryFilter.value);
    }

    if (sortFilter) {
        switch (sortFilter.value) {
            case "price-low":
                listings.sort((a, b) => a.price - b.price);
                break;
            case "price-high":
                listings.sort((a, b) => b.price - a.price);
                break;
            default:
                listings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
    }

    displayListings(listings, "listingsGrid");
}

// ================================
// Product Details
// ================================
async function loadProductDetails(id) {
    const listing = await getListingById(id);

    if (!listing) return;

    listing.views = (listing.views || 0) + 1;
    await saveListing(listing);

    displayProductDetails(listing);
}

// ================================
// Init
// ================================
document.addEventListener("DOMContentLoaded", async () => {

    if (window.location.pathname.includes("dashboard.html")) {
        if (checkAuth()) {
            await loadDashboardListings();
            initLogout();
        }
    }

    if (
        window.location.pathname.includes("login.html") ||
        window.location.pathname.includes("register.html")
    ) {
        initAuthForms();
    }
});

// ================================
// Forms
// ================================
function initAuthForms() {

    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value;

            const result = await login(email, password);

            if (result.success) {
                window.location.href = "dashboard.html";
            } else {
                alert(result.message || "Login failed");
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.getElementById("fullName").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            if (password !== confirmPassword) {
                alert("Passwords do not match");
                return;
            }

            const result = await register(name, email, phone, password);

            if (result.success) {
                window.location.href = "dashboard.html";
            } else {
                alert(result.message || "Registration failed");
            }
        });
    }
}

function initLogout() {
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", e => {
            e.preventDefault();
            logout();
        });
    }
}

}
