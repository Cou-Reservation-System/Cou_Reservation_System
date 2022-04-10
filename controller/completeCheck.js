const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

//반품 완료 체크하기
module.exports.receivingCheck = async (req, res) => {
  await ReceivingCheck(req, res);
};

async function ReceivingCheck(req, res) {
  try {
    const targetTruck = req.query.carNumber
    const returnIsDone = await sequelize.query(
      `update coupangs
      set isDone = if(isDone = 0,true,false)
      where CoupangId = (select CoupangId from (
      select CoupangId From coupangs where carNumber = \'${targetTruck}\'
      ) tmp)`,
      {
        type: QueryTypes.UPDATE,
      }
    );
    res.status(200).json({
      returnIsDone,
      ok: true,
      message: '체크가 완료되었습니다.',
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      errorMessage: '에러가 발생했습니다.',
    });
  }
}
