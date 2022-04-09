const { Coupang, sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

//예약 전체 조회하기
module.exports.checkEveryReservation = async (req, res) => {
  await checkEveryReservation(req, res);
};

//예약 날짜별 조회하기
module.exports.checkDailyReservation = async (req, res) => {
  await checkDailyReservation(req, res);
};

async function checkEveryReservation(req, res) {
  try {
    const reservedList = await sequelize.query('select * from coupangs union all select * from 3pl', {
        type: QueryTypes.SELECT,
      });
    res.status(200).json({
      reservedList,
      ok: true,
      message: '조회가 완료되었습니다.',
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      errorMessage: '조회에 실패했습니다.',
    });
  }
}

async function checkDailyReservation(req, res) {
  try {
    const date = req.qu         ery.date
    const reservedList = await sequelize.query(`select * from coupangs where \'dateAndTime\' = ${date} union all select * from 3pl where \'dateAndTime\' = ${date}` , {
    })
    res.status(200).json({
        reservedList,
        ok: true,
        message: '조회가 완료되었습니다.',
    })
  } catch (error) {
    res.status(400).json({
      ok: false,
      errorMessage: '조회에 실패했습니다.',
    });
  }
}
