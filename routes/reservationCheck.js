const express = require("express");
const router = express.Router();

const { checkEveryReservation, checkDailyReservation, checkTargetCarRecord } = require("../controller/reservationCheck");

router.get("/check/calendar", checkEveryReservation)
router.get("/check/calendar/date", checkDailyReservation)
router.get("/check", checkTargetCarRecord)


module.exports = router;
