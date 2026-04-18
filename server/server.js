const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const folderRoutes = require("./routes/folderRoutes");
const imageRoutes = require("./routes/imageRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/image-folder-manager";

const uploadsPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(uploadsPath));

app.get("/", (_req, res) => {
  res.json({ message: "Image Folder Manager API is running." });
});

app.use("/api/auth", authRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/images", imageRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully ✅");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:❌", error.message);
    process.exit(1);
  });