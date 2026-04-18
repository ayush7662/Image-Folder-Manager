const mongoose = require("mongoose");
const Folder = require("../models/Folder");
const Image = require("../models/Image");

const buildSizeMaps = async (userId) => {
  const imageSizes = await Image.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    { $group: { _id: "$folderId", total: { $sum: "$size" } } }
  ]);

  const directSizeMap = {};
  imageSizes.forEach((item) => {
    directSizeMap[item._id?.toString()] = item.total;
  });

  return directSizeMap;
};

const createFolder = async (req, res) => {
  try {
    const { name, parentFolderId = null } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Folder name is required." });
    }

    if (parentFolderId) {
      const parent = await Folder.findOne({ _id: parentFolderId, userId: req.user.id });
      if (!parent) {
        return res.status(404).json({ message: "Parent folder not found." });
      }
    }

    const folder = await Folder.create({
      name,
      userId: req.user.id,
      parentFolderId: parentFolderId || null
    });

    return res.status(201).json(folder);
  } catch (error) {
    return res.status(500).json({ message: "Could not create folder.", error: error.message });
  }
};

const getFolders = async (req, res) => {
  try {
    const folders = await Folder.find({ userId: req.user.id }).sort({ createdAt: 1 });
    return res.json(folders);
  } catch (error) {
    return res.status(500).json({ message: "Could not fetch folders.", error: error.message });
  }
};

const getFolderTree = async (req, res) => {
  try {
    const folders = await Folder.find({ userId: req.user.id }).lean();
    const directSizeMap = await buildSizeMaps(req.user.id);

    const childrenMap = new Map();
    folders.forEach((folder) => {
      const key = folder.parentFolderId ? folder.parentFolderId.toString() : "root";
      if (!childrenMap.has(key)) childrenMap.set(key, []);
      childrenMap.get(key).push(folder);
    });

    const computeNode = (folder) => {
      const folderId = folder._id.toString();
      const children = (childrenMap.get(folderId) || []).map(computeNode);
      const childrenSize = children.reduce((sum, child) => sum + child.totalSize, 0);
      const ownSize = directSizeMap[folderId] || 0;
      return {
        ...folder,
        ownSize,
        totalSize: ownSize + childrenSize,
        children
      };
    };

    const roots = (childrenMap.get("root") || []).map(computeNode);
    return res.json(roots);
  } catch (error) {
    return res.status(500).json({ message: "Could not build folder tree.", error: error.message });
  }
};

module.exports = { createFolder, getFolders, getFolderTree };