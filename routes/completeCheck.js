const express = require("express");
const router = express.Router();

const { receivingCheck } = require("../controller/completeCheck")

router.put("/check/receiving", receivingCheck)

module.exports = router;