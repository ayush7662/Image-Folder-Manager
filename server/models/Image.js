const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true },
    cloudinaryPublicId: { type: String, required: true },
    fileName: { type: String, required: true },
    size: { type: Number, required: true, min: 0 },
    folderId: { type: mongoose.Schema.Types.ObjectId, ref: "Folder", required: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", imageSchema);