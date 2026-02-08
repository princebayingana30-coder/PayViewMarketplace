const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Allow frontend to access backend
app.use(cors({
  origin: [
    "http://payviewmarketplace.netlify.app",
    "https://payviewmarketplace.netlify.app",
    "http://localhost:3000",
    "http://localhost:5000",
    process.env.FRONTEND_URL || "*"
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.send("PayView Marketplace backend is running 🚀");
});

// Health check endpoint for Render
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
