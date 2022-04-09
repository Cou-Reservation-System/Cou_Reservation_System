const express = require("express");
const router = express.Router();

const { join, login } = require("../controller/admin");

router.post("/join", join);
router.post("/login", login)

module.exports = router;
