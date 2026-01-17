const express = require("express");

const app = express();
// REQUIRE PACKAGES
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/connection");

const PORT = process.env.PORT;

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

// ROUTES
const userDataRoutes = require("./routes/userDataRoutes");

// API ENDPOINT
app.use("/api/user", userDataRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server Is Running Port Number ${PORT}`);
});
