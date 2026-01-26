const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors({
  origin: [
    "https://payviewmarketplace.netlify.app", // your Netlify site
    "https://payview-marketplace-4.onrender.com" // local frontend
  ],
  credentials: true
}));
app.use(express.json());

// --------------------
// In-memory data (replace later with DB)
let users = []; // { id, name, email, phone, password }
let listings = []; // { id, title, category, price, location, phone, description, availability, images, videos, verified, ownerId, views, createdAt }

// --------------------
// ROUTES

// Test route
app.get("/", (req, res) => {
  res.send("PayView Marketplace backend is running 🚀");
});

// ----------- AUTH ROUTES

// Register user
app.post("/api/v1/auth/register", (req, res) => {
  const { name, email, phone, password } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ success: false, message: "Email already registered" });
  }
  const newUser = { id: Date.now(), name, email, phone, password };
  users.push(newUser);
  res.json({ success: true, user: newUser });
});

// Login user
app.post("/api/v1/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });
  res.json({ success: true, user });
});

// ----------- LISTINGS ROUTES

// Get all listings
app.get("/api/v1/listings", (req, res) => {
  res.json({ success: true, listings });
});

// Get listing by id
app.get("/api/v1/listings/:id", (req, res) => {
  const listing = listings.find(l => l.id === parseInt(req.params.id));
  if (!listing) return res.status(404).json({ success: false, message: "Listing not found" });
  res.json({ success: true, listing });
});

// Create a listing
app.post("/api/v1/listings", (req, res) => {
  const { title, category, price, location, phone, description, availability, images, videos, ownerId } = req.body;
  const newListing = {
    id: Date.now(),
    title,
    category,
    price,
    location,
    phone,
    description,
    availability,
    images: images || [],
    videos: videos || [],
    verified: false,
    ownerId,
    views: 0,
    createdAt: new Date().toISOString()
  };
  listings.push(newListing);
  res.json({ success: true, listing: newListing });
});

// Update listing
app.put("/api/v1/listings/:id", (req, res) => {
  const idx = listings.findIndex(l => l.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ success: false, message: "Listing not found" });
  listings[idx] = { ...listings[idx], ...req.body };
  res.json({ success: true, listing: listings[idx] });
});

// Delete listing
app.delete("/api/v1/listings/:id", (req, res) => {
  const idx = listings.findIndex(l => l.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ success: false, message: "Listing not found" });
  listings.splice(idx, 1);
  res.json({ success: true, message: "Listing deleted" });
});

// --------------------
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
