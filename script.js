const API_BASE = "https://payview-marketplace-3.onrender.com";

// -------------------- AUTH --------------------

function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
}

function checkAuth() {
    const user = getCurrentUser();
    if (!user && window.location.pathname.includes("dashboard.html")) {
        window.location.href = "login.html";
        return false;
    }
    return true;
}

async function login(email, password) {
    try {
        const res = await fetch(`${API_BASE}/api/v1/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        localStorage.setItem("currentUser", JSON.stringify(data.user));
        return { success: true, user: data.user };
    } catch (err) {
        return { success: false, message: "Server error" };
    }
}

async function register(userData) {
    try {
        const res = await fetch(`${API_BASE}/api/v1/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        localStorage.setItem("currentUser", JSON.stringify(data.user));
        return { success: true, user: data.user };
    } catch (err) {
        return { success: false, message: "Server error" };
    }
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}

// -------------------- LISTINGS API --------------------

async function getListings() {
    const res = await fetch(`${API_BASE}/api/v1/listings`);
    const data = await res.json();
    return data.listings || [];
}

async function getListingById(id) {
    const res = await fetch(`${API_BASE}/api/v1/listings/${id}`);
    const data = await res.json();
    return data.listing;
}

async function saveListing(listing) {
    const user = getCurrentUser();
    listing.ownerId = user.id;

    const method = listing.id ? "PUT" : "POST";
    const url = listing.id
        ? `${API_BASE}/api/v1/listings/${listing.id}`
        : `${API_BASE}/api/v1/listings`;

    const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(listing)
    });

    const data = await res.json();
    return data.listing;
}

async function deleteListing(id) {
    await fetch(`${API_BASE}/api/v1/listings/${id}`, {
        method: "DELETE"
    });
}

// -------------------- DASHBOARD --------------------

async function loadDashboardListings() {
    const user = getCurrentUser();
    if (!user) return;

    const listings = await getListings();
    const myListings = listings.filter(l => l.ownerId === user.id);

    displayListings(myListings, "myListingsGrid", true);

    const totalViews = myListings.reduce((s, l) => s + (l.views || 0), 0);
    const verifiedCount = myListings.filter(l => l.verified).length;

    document.getElementById("totalListings").textContent = myListings.length;
    document.getElementById("totalViews").textContent = totalViews;
    document.getElementById("verifiedListings").textContent = verifiedCount;
}

// -------------------- DISPLAY --------------------

function displayListings(listings, containerId, isOwnerView = false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (listings.length === 0) {
        container.innerHTML = "<p>No listings found.</p>";
        return;
    }

    container.innerHTML = listings.map(l => `
        <div class="listing-card">
            <img src="${l.images?.[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'}">
            <h3>${l.title}</h3>
            <p>${l.location}</p>
            <strong>${formatPrice(l.price)} RWF</strong>
            ${isOwnerView ? `
                <div style="margin-top:10px;">
                    <button onclick="editListing(${l.id})">Edit</button>
                    <button onclick="deleteListingConfirm(${l.id})">Delete</button>
                </div>
            ` : ""}
        </div>
    `).join("");
}

function formatPrice(price) {
    return new Intl.NumberFormat("en-RW").format(price);
}

// -------------------- LISTING FORM --------------------

function openListingForm(listingId = null) {
    const modal = document.getElementById("listingFormModal");
    const form = document.getElementById("listingForm");

    if (listingId) {
        getListingById(listingId).then(listing => {
            form.dataset.listingId = listing.id;
            document.getElementById("listingTitle").value = listing.title;
            document.getElementById("listingCategory").value = listing.category;
            document.getElementById("listingPrice").value = listing.price;
            document.getElementById("listingLocation").value = listing.location;
            document.getElementById("listingPhone").value = listing.phone || "";
            document.getElementById("listingDescription").value = listing.description;
            document.getElementById("listingAvailability").value = listing.availability;
        });
    } else {
        form.reset();
        form.dataset.listingId = "";
    }

    modal.style.display = "block";
}

function closeListingForm() {
    const modal = document.getElementById("listingFormModal");
    modal.style.display = "none";
}

async function saveListingFromForm() {
    const form = document.getElementById("listingForm");
    const listingId = form.dataset.listingId;

    const listing = {
        id: listingId ? parseInt(listingId) : null,
        title: document.getElementById("listingTitle").value,
        category: document.getElementById("listingCategory").value,
        price: parseInt(document.getElementById("listingPrice").value),
        location: document.getElementById("listingLocation").value,
        phone: document.getElementById("listingPhone").value,
        description: document.getElementById("listingDescription").value,
        availability: document.getElementById("listingAvailability").value,
        images: ["https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800"],
        videos: []
    };

    await saveListing(listing);
    closeListingForm();
    loadDashboardListings();
    showNotification("Listing saved successfully!");
}

function editListing(id) {
    openListingForm(id);
}

async function deleteListingConfirm(id) {
    if (confirm("Delete this listing?")) {
        await deleteListing(id);
        loadDashboardListings();
        showNotification("Listing deleted!");
    }
}

// -------------------- LISTINGS PAGE --------------------

async function loadListingsPage() {
    const listings = await getListings();
    displayListings(listings, "listingsGrid");
}

// -------------------- FEATURED --------------------

async function loadFeaturedListings() {
    const listings = await getListings();
    displayListings(listings.slice(0, 3), "featuredListings");
}

// -------------------- NOTIFICATION --------------------

function showNotification(message) {
    const div = document.createElement("div");
    div.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: green;
        color: white;
        padding: 10px 15px;
        border-radius: 8px;
        z-index: 9999;
    `;
    div.innerText = message;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3000);
}

// -------------------- INIT --------------------

document.addEventListener("DOMContentLoaded", () => {

    // Auth pages
    if (window.location.pathname.includes("login.html")) {
        document.getElementById("loginForm").addEventListener("submit", async e => {
            e.preventDefault();
            const email = loginEmail.value;
            const password = loginPassword.value;
            const result = await login(email, password);
            if (result.success) window.location.href = "dashboard.html";
            else showNotification(result.message);
        });
    }

    if (window.location.pathname.includes("register.html")) {
        document.getElementById("registerForm").addEventListener("submit", async e => {
            e.preventDefault();
            const userData = {
                name: regName.value,
                email: regEmail.value,
                phone: regPhone.value,
                password: regPassword.value
            };
            const result = await register(userData);
            if (result.success) window.location.href = "dashboard.html";
            else showNotification(result.message);
        });
    }

    // Dashboard
    if (window.location.pathname.includes("dashboard.html")) {
        if (checkAuth()) {
            loadDashboardListings();
            document.getElementById("logoutBtn")?.addEventListener("click", logout);
            document.getElementById("listingForm")?.addEventListener("submit", e => {
                e.preventDefault();
                saveListingFromForm();
            });
        }
    }

    // Listings page
    if (window.location.pathname.includes("listings.html")) {
        loadListingsPage();
    }

    // Home page
    if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
        loadFeaturedListings();
    }
});
