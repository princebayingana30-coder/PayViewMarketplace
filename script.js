/* =================================================
   CONFIG
================================================= */
const API_URL = "https://payview-marketplace-4.onrender.com";

/* =================================================
   AUTH STATE
================================================= */
function isLoggedIn() {
  return !!localStorage.getItem("currentUser");
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

/* =================================================
   LOGIN
================================================= */
async function login(email, password) {
  const res = await fetch(`${API_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Login failed");
  }

  localStorage.setItem("currentUser", JSON.stringify(data.user));
  return data.user;
}

/* =================================================
   REGISTER
================================================= */
async function register(userData) {
  const res = await fetch(`${API_URL}/api/v1/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData)
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Registration failed");
  }

  localStorage.setItem("currentUser", JSON.stringify(data.user));
  return data.user;
}

/* =================================================
   AUTH FORMS
================================================= */
function initAuthForms() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        await login(
          loginForm.email.value,
          loginForm.password.value
        );
        window.location.href = "dashboard.html";
      } catch (err) {
        alert(err.message);
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        await register({
          name: registerForm.name.value,
          email: registerForm.email.value,
          phone: registerForm.phone.value,
          password: registerForm.password.value
        });
        window.location.href = "dashboard.html";
      } catch (err) {
        alert(err.message);
      }
    });
  }
}

/* =================================================
   LISTINGS
================================================= */
async function fetchListings() {
  const res = await fetch(`${API_URL}/api/v1/listings`);
  const data = await res.json();

  if (!data.success) return;
  renderListings(data.listings);
}

function renderListings(listings) {
  const container = document.getElementById("listingsContainer");
  if (!container) return;

  container.innerHTML = "";

  listings.forEach(l => {
    const div = document.createElement("div");
    div.className = "listing-card";
    div.innerHTML = `
      <h3>${l.title}</h3>
      <p>${l.location}</p>
      <strong>${l.price} RWF</strong>
    `;
    container.appendChild(div);
  });
}

/* =================================================
   CREATE LISTING
================================================= */
async function saveListingFromForm(form) {
  const user = getCurrentUser();
  if (!user) return alert("Please login");

  const data = {
    title: form.title.value,
    category: form.category.value,
    price: form.price.value,
    location: form.location.value,
    phone: form.phone.value,
    description: form.description.value,
    availability: form.availability.value,
    ownerId: user.id,
    images: [],
    videos: []
  };

  const res = await fetch(`${API_URL}/api/v1/listings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if (!result.success) {
    alert("Upload failed");
  } else {
    alert("Listing uploaded");
    window.location.href = "dashboard.html";
  }
}

/* =================================================
   PAGE GUARD
================================================= */
function protectPage() {
  if (!isLoggedIn()) {
    window.location.href = "login.html";
  }
}

/* =================================================
   INIT
================================================= */
document.addEventListener("DOMContentLoaded", () => {
  initAuthForms();
  fetchListings();
});
