const Folder = require("../models/Folder");
const Image = require("../models/Image");
const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (buffer, originalName) =>
  new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "image-folder-manager",
        resource_type: "image",
        use_filename: true,
        filename_override: originalName
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );
    uploadStream.end(buffer);
  });

const uploadImage = async (req, res) => {
  try {
    const { folderId, name } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required." });
    }
    if (!folderId || !name) {
      return res.status(400).json({ message: "Folder and image name are required." });
    }

    const folder = await Folder.findOne({ _id: folderId, userId: req.user.id });
    if (!folder) {
      return res.status(404).json({ message: "Folder not found." });
    }

    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return res.status(500).json({ message: "Cloudinary env values are missing." });
    }

    const uploadResult = await uploadToCloudinary(req.file.buffer, name);

    const image = await Image.create({
      name,
      imageUrl: uploadResult.secure_url,
      cloudinaryPublicId: uploadResult.public_id,
      fileName: req.file.originalname,
      size: req.file.size,
      folderId,
      userId: req.user.id
    });

    return res.status(201).json(image);
  } catch (error) {
    return res.status(500).json({ message: "Image upload failed.", error: error.message });
  }
};

const getImagesByFolder = async (req, res) => {
  try {
    const { folderId } = req.params;
    const images = await Image.find({ folderId, userId: req.user.id }).sort({ createdAt: -1 });
    return res.json(images);
  } catch (error) {
    return res.status(500).json({ message: "Could not fetch images.", error: error.message });
  }
};

module.exports = { uploadImage, getImagesByFolder };