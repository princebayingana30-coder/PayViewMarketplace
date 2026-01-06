const express = require("express");
const path = require("path");

const app = express();

// Serve static files if needed
app.use(express.static(path.join(__dirname, "public")));

// Test route (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.send("PayView Marketplace backend is running 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
