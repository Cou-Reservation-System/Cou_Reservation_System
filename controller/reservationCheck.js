const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

//예약 전체 조회하기 (미완료만)
module.exports.checkEveryReservation = async (req, res) => {
  await checkEveryReservation(req, res);
};

//예약 기간별 조회하기
module.exports.checkDailyReservation = async (req, res) => {
  await checkDailyReservation(req, res);
};

//차 번호별 조회하기
module.exports.checkTargetCarRecord = async (req, res) => {
  await checkTargetCarRecord(req, res);
};

async function checkEveryReservation(req, res) {
  try {
    const reservedList = await sequelize.query(
      "SELECT *,'coupangs' AS tableName FROM coupangs WHERE isDone = 0 UNION ALL SELECT *,'3pl' FROM 3pl WHERE isDone = 0",
      {
        type: QueryTypes.SELECT,
      }
    );

    if (reservedList.length === 0) {
      return res.status(200).json({
        ok: true,
        message: '예약된 목록이 없습니다.',
      });
    }
    res.status(200).json({
      reservedList,
      ok: true,
      message: '조회가 완료되었습니다.',
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      errorMessage: '조회에 실패했습니다.',
    });
  }
}

async function checkDailyReservation(req, res) {
  try {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const reservedList = await sequelize.query(
      `SELECT *,\'coupangs\' AS tableName FROM coupangs 
      WHERE NOT (DateAndTime < \'${startDate}\' OR DateAndTime > \'${endDate}\')
      UNION ALL 
      SELECT *,\'3pl\' FROM 3pl 
      WHERE NOT (DateAndTime < \'${startDate}\' OR DateAndTime > \'${endDate}\')`,
      {
        type: QueryTypes.SELECT,
      }
    );
    const countReservedList = await sequelize.query(
      `SELECT SUM(CNT) AS totalCount 
      FROM (SELECT COUNT(*) AS CNT FROM coupangs 
      WHERE NOT (DateAndTime < \'${startDate}\' OR DateAndTime > \'${endDate}\') 
      UNION ALL 
      SELECT COUNT(*) AS CNT FROM 3pl 
      WHERE NOT (DateAndTime < \'${startDate}\' OR DateAndTime > \'${endDate}\')) tmp`,
      {
        type: QueryTypes.SELECT,
      }
    );
    const totalReservedList = countReservedList[0].totalCount;

    if (reservedList.length === 0) {
      return res.status(200).json({
        ok: true,
        message: '예약된 목록이 없습니다.',
      });
    }
    res.status(200).json({
      reservedList,
      totalReservedList,
      ok: true,
      message: '조회가 완료되었습니다.',
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      errorMessage: '조회에 실패했습니다.',
    });
  }
}

async function checkTargetCarRecord(req, res) {
  try {
    const targetCarNumber = req.query.targetCarNumber;

    const targetRow = await sequelize.query(
      `SELECT *
        FROM
        (
            SELECT *,'coupangs' AS tableName
            FROM coupangs
            UNION ALL
            SELECT *,'3pl'
            FROM 3pl
        ) truckHouse
        WHERE truckHouse.carNumber = ${targetCarNumber}`,
      {
        type: QueryTypes.SELECT,
      }
    );

    if (targetRow.length === 0) {
      return res.status(200).json({
        ok: false,
        errorMessage: '해당 차량이 존재하지 않습니다.',
      });
    }

    return res.status(200).json({
      targetRow,
      ok: true,
      message: '조회에 성공했습니다.',
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      errorMessage: '에러가 발생했습니다.',
    });
  }
}
