const express = require("express");
const router = express.Router();

const { receivingCheck } = require("../controller/completeCheck")
const authMiddleware = require("../middleware/authMiddleware")

router.put("/check/receiving",authMiddleware, receivingCheck)

module.exports = router;