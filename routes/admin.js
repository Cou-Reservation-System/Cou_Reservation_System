const express = require("express");
const router = express.Router();

const { join, login, auth, findPassword, resetPassword } = require("../controller/admin");
const { authMiddleware } = require("../middleware/authMiddleware")

router.post("/join", join);
router.post("/login", login)
router.get("/auth", authMiddleware, auth)
router.post("/findPassword", findPassword)
router.put("/resetPassword", resetPassword)

module.exports = router;
