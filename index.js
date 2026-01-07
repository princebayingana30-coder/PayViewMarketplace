const express = require("express");
const cors = require("cors");

const app = express();

// Allow frontend to access backend
app.use(cors({
  origin: [
    "https://payviewmarketplace.netlify.app",
    "http://localhost:3000"
  ],
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("PayView Marketplace backend is running 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
