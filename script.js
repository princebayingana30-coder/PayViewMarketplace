// ================================
// API Configuration
// ================================
const API_BASE_URL = "https://payview-marketplace-3.onrender.com/api/v1";

async function apiRequest(endpoint, options = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
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

async function register(userData) {
    try {
        const res = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
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

    const url = listing.id ? `${API_BASE_URL}/listings/${listing.id}` : `${API_BASE_URL}/listings`;
    const method = listing.id ? "PUT" : "POST";

    const data = await apiRequest(url, {
        method,
        body: JSON.stringify(listing)
    });

    return data.success ? data.listing : null;
}

async function deleteListing(id) {
    const data = await apiRequest(`${API_BASE_URL}/listings/${id}`, { method: "DELETE" });
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
            case "newest":
            default:
                listings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
    }

    displayListings(listings, "listingsGrid");

    const noListings = document.getElementById("noListings");
    if (noListings) {
        noListings.style.display = listings.length === 0 ? "block" : "none";
    }
}

async function loadFeaturedListings() {
    let listings = await getListings();
    listings = listings.slice(0, 3); // Show top 3
    displayListings(listings, "featuredListings");
}

async function loadDashboardListings() {
    const user = getCurrentUser();
    if (!user) return;

    const listings = await getListings();
    const myListings = listings.filter(l => l.ownerId === user.id);

    displayListings(myListings, "myListingsGrid", true);

    const totalViewsEl = document.getElementById("totalViews");
    const verifiedListingsEl = document.getElementById("verifiedListings");
    const totalListingsEl = document.getElementById("totalListings");

    if (totalViewsEl) totalViewsEl.textContent = myListings.reduce((sum, l) => sum + (l.views || 0), 0);
    if (verifiedListingsEl) verifiedListingsEl.textContent = myListings.filter(l => l.verified).length;
    if (totalListingsEl) totalListingsEl.textContent = myListings.length;
}

// ================================
// Product Details
// ================================
async function loadProductDetails(id) {
    const listing = await getListingById(id);
    if (!listing) {
        document.getElementById("productDetailsContent").innerHTML = `
            <div class="no-listings">
                <p>Product not found. <a href="listings.html">Browse all listings</a></p>
            </div>`;
        return;
    }

    // Optionally increment views via backend API
    listing.views = (listing.views || 0) + 1;
    await saveListing(listing);

    displayProductDetails(listing);
}

// ================================
// Listing Form Handlers
// ================================
async function openListingForm(listingId = null) {
    const modal = document.getElementById("listingFormModal");
    const form = document.getElementById("listingForm");
    const title = document.getElementById("listingFormTitle");

    if (listingId) {
        const listing = await getListingById(listingId);
        if (listing) {
            form.dataset.listingId = listingId;
            document.getElementById("listingTitle").value = listing.title;
            document.getElementById("listingCategory").value = listing.category;
            document.getElementById("listingPrice").value = listing.price;
            document.getElementById("listingLocation").value = listing.location;
            document.getElementById("listingPhone").value = listing.phone || "";
            document.getElementById("listingDescription").value = listing.description;
            document.getElementById("listingAvailability").value = listing.availability;
            if (title) title.textContent = "Edit Listing";
        }
    } else {
        form.reset();
        form.dataset.listingId = "";
        if (title) title.textContent = "Create New Listing";
    }

    if (modal) modal.style.display = "block";
    initImageUpload();
    initVideoUpload();
}

async function saveListingFromForm() {
    const form = document.getElementById("listingForm");
    const listingId = form.dataset.listingId;

    const images = window.getUploadedImages ? window.getUploadedImages() : [];
    const videos = window.getUploadedVideos ? window.getUploadedVideos() : [];

    const listing = {
        id: listingId ? parseInt(listingId) : null,
        title: document.getElementById("listingTitle").value,
        category: document.getElementById("listingCategory").value,
        price: parseInt(document.getElementById("listingPrice").value),
        location: document.getElementById("listingLocation").value,
        phone: document.getElementById("listingPhone").value,
        description: document.getElementById("listingDescription").value,
        availability: document.getElementById("listingAvailability").value,
        images: images.length ? images : ["https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800"],
        videos: videos,
        verified: false
    };

    // Preserve ownerId if editing
    if (listingId) {
        const existing = await getListingById(parseInt(listingId));
        if (existing) listing.ownerId = existing.ownerId;
    }

    const saved = await saveListing(listing);
    if (saved) {
        closeListingForm();
        loadDashboardListings();
        showNotification("Listing saved successfully!");
    } else {
        showNotification("Failed to save listing", "error");
    }
}

function closeListingForm() {
    const modal = document.getElementById("listingFormModal");
    if (modal) modal.style.display = "none";

    const form = document.getElementById("listingForm");
    if (form) form.reset();

    if (window.clearUploadedImages) window.clearUploadedImages();
    if (window.clearUploadedVideos) window.clearUploadedVideos();
}

// ================================
// Init & Event Listeners
// ================================
document.addEventListener("DOMContentLoaded", async () => {
    initNavigation();
    initModals();

    if (window.location.pathname.includes("dashboard.html")) {
        if (checkAuth()) {
            await loadDashboardListings();
            initListingForm();
            initLogout();
        }
    } else if (window.location.pathname.includes("listings.html")) {
        await loadListingsPage();
        initFilters();
    } else if (
        window.location.pathname.includes("index.html") ||
        window.location.pathname === "/" ||
        window.location.pathname.endsWith("/bebe/") ||
        window.location.pathname.endsWith("/bebe")
    ) {
        await loadFeaturedListings();
    } else if (window.location.pathname.includes("contact.html")) {
        initContactForm();
    } else if (window.location.pathname.includes("login.html") || window.location.pathname.includes("register.html")) {
        initAuthForms();
    }
});

// ================================
// Navigation, Modals, Notifications
// ================================
function initNavigation() { /* same as your previous code */ }
function initModals() { /* same as your previous code */ }
function showNotification(message, type = "success") { /* same as your previous code */ }
function initFilters() { /* same as your previous code */ }
function initContactForm() { /* same as your previous code */ }
function initAuthForms() {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;
            const result = await login(email, password);
            if (result.success) window.location.href = "dashboard.html";
            else showNotification(result.message || "Login failed", "error");
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const password = document.getElementById("regPassword").value;
            const confirmPassword = document.getElementById("regConfirmPassword").value;
            if (password !== confirmPassword) return showNotification("Passwords do not match", "error");

            const userData = {
                name: document.getElementById("regName").value,
                email: document.getElementById("regEmail").value,
                phone: document.getElementById("regPhone").value,
                password,
                confirmPassword
            };

            const result = await register(userData);
            if (result.success) window.location.href = "dashboard.html";
            else showNotification(result.message || "Registration failed", "error");
        });
    }
}

function initLogout() {
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) logoutBtn.addEventListener("click", e => { e.preventDefault(); logout(); });
}

