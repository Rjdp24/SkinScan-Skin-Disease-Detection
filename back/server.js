const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
console.log("MongoDB URI:", process.env.MONGO_URI);

// Connect to MongoDB Atlas
connectDB().then(() => {
  console.log("Connected to MongoDB Atlas");
}).catch((err) => {
  console.error(err);
  process.exit(1);
});

// Import Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

