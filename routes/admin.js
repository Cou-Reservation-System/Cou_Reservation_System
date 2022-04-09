const express = require("express");
const router = express.Router();

const { join, login, auth } = require("../controller/admin");
const { authMiddleware } = require("../middleware/authMiddleware")

router.post("/join", join);
router.post("/login", login)
router.get("/auth", authMiddleware, auth)

module.exports = router;
