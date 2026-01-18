const express = require("express");

const app = express();
// REQUIRE PACKAGES
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/connection");
const serverless = require("serverless-http");

const PORT = process.env.PORT || 3000;

// CORS USED
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ✅ connect DB ONCE (VERY IMPORTANT)
let isConnected = false;
async function dbConnectOnce() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
    console.log("MongoDB connected");
  }
}
dbConnectOnce();

// ROUTES
const userDataRoutes = require("./routes/userDataRoutes");
app.get("/", (req, res) => {
  res.send("Backend running on Vercel 🚀");
});

// API ENDPOINT
app.use("/api/user", userDataRoutes);

module.exports = serverless(app);
