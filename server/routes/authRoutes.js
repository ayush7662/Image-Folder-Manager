const express = require("express");
const { signup, login, me } = require("../controllers/authControllers");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", auth, me);

module.exports = router;