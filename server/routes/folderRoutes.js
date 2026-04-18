const express = require("express");
const auth = require("../middleware/auth");
const { createFolder, getFolders, getFolderTree } = require("../controllers/folderController");

const router = express.Router();

router.use(auth);
router.get("/", getFolders);
router.get("/tree", getFolderTree);
router.post("/", createFolder);

module.exports = router;
