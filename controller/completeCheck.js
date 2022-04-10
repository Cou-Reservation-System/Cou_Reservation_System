const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

//반품 완료 체크하기
module.exports.receivingCheck = async (req, res) => {
  await ReceivingCheck(req, res);
};

async function ReceivingCheck(req, res) {
  try {
    const targetCarNumber = req.query.targetCarNumber;

    const targetRow = await sequelize.query(
      `SELECT CoupangId AS id, tableName
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
      return res.status(400).json({
        ok: false,
        errorMessage: '해당 차량이 존재하지 않습니다.',
      });
    }

    const targetId = targetRow[0].id;
    const targetTableName = targetRow[0].tableName;
    let returnIsDone;

    if (targetTableName === 'coupangs') {
      returnIsDone = await sequelize.query(
        `update coupangs
      set isDone = if(isDone = 0,true,false)
      where CoupangId = ${targetId}`,
        {
          type: QueryTypes.UPDATE,
        }
      );
    } else if (targetTableName === '3pl') {
      returnIsDone = await sequelize.query(
        `update 3pl
        set isDone = if(isDone = 0,true,false)
        where TPLId = ${targetId}`,
        {
          type: QueryTypes.UPDATE,
        }
      );
    }
    res.status(200).json({
      returnIsDone,
      ok: true,
      message: '체크가 완료되었습니다.',
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      errorMessage: '에러가 발생했습니다.',
    });
  }
}