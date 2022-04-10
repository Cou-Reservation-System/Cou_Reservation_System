const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

//예약 전체 조회하기 (미완료만)
module.exports.checkEveryReservation = async (req, res) => {
  await checkEveryReservation(req, res);
};

//예약 날짜별 조회하기
module.exports.checkDailyReservation = async (req, res) => {
  await checkDailyReservation(req, res);
};

async function checkEveryReservation(req, res) {
  try {
    const reservedList = await sequelize.query(
      'select * from coupangs where isDone = 0 union all select * from 3pl where isDone =0',
      {
        type: QueryTypes.SELECT,
      }
    );
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
    const date = req.query.DateAndTime;
    const reservedList = await sequelize.query(
      `select * from coupangs where DateAndTime = \'${date}\' union all select * from 3pl where DateAndTime = \'${date}\'`,
      {
        type: QueryTypes.SELECT,
      }
    );
    const countReservedList = await sequelize.query(
      `select sum(CNT) as totalCount from (select count(*) as CNT from coupangs where DateAndTime = \'${date}\'
    union all
    select count(*) as CNT from 3pl where DateAndTime = \'${date}\') ad`,
      {
        type: QueryTypes.SELECT,
      }
    );
    const totalReservedList = countReservedList[0].totalCount;
    res.status(200).json({
      reservedList,
      totalReservedList,
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
