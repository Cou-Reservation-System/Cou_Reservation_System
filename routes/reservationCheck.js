const express = require("express");
const router = express.Router();

const { checkEveryReservation, checkDailyReservation, checkTargetCarRecord } = require("../controller/reservationCheck");
const { authMiddleware } = require("../middleware/authMiddleware")

router.get("/check/calendar",authMiddleware, checkEveryReservation)
router.get("/check/calendar/date",authMiddleware, checkDailyReservation)
router.get("/check",authMiddleware, checkTargetCarRecord)


module.exports = router;
