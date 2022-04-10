const express = require("express");
const router = express.Router();

const { checkEveryReservation, checkDailyReservation } = require("../controller/reservationCheck");

router.get("/check/calendar", checkEveryReservation)
router.get("/check/calendar/date", checkDailyReservation)


module.exports = router;
