const express = require("express");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const { uploadImage, getImagesByFolder } = require("../controllers/imageController");

const router = express.Router();

router.use(auth);
router.post("/", upload.single("image"), uploadImage);
router.get("/folder/:folderId", getImagesByFolder);

module.exports = router;
