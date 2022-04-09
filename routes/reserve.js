const express = require("express");
const router = express.Router();

const { reserve } = require("../controller/reserve");

router.post("/", reserve); // 예약등록

module.exports = router;
