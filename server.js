const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/user.routes"); 
const authRoutes = require("./routes/auth.routes");
const propertyRoutes = require("./routes/property.routes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json()); // for parsing JSON
app.use(express.static(path.join(__dirname, '..'))); // Serve static files

app.use("/api/auth", authRoutes); // auth routes
app.use("/api/users", userRoutes); // user routes
app.use("/api/properties", propertyRoutes); // property routes

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err)); 

