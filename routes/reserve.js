const express = require('express');
const router = express.Router();

const {
  getReserveCount,
  postReserve,
  getReserve,
  putReserve,
  deleteReserve,
} = require('../controller/reserve');

router.get('/count', getReserveCount); // 예약 건수 조회
router.post('/', postReserve); // 예약등록
router.get('/getReservation', getReserve); // 예약조회
router.put('/edit', putReserve); // 예약수정
router.delete('/delete', deleteReserve); // 예약삭제

module.exports = router;
