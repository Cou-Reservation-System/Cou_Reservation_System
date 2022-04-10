const express = require('express');
const router = express.Router();

const {
  postReserve,
  getReserve,
  putReserve,
  deleteReserve,
} = require('../controller/reserve');

router.post('/', postReserve); // 예약등록
router.get('/', getReserve); // 예약조회
router.put('/', putReserve); // 예약수정
router.delete('/', deleteReserve); // 예약삭제

module.exports = router;
