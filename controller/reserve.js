const { TPL, Coupang, sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

// 시간 조회
module.exports.getReserveCount = async (req, res) => {
  try {
    let dateAndTime = await sequelize.query(
      `SELECT DateAndTime AS date FROM Coupangs 
      GROUP BY DateAndTime 
      HAVING COUNT(*) = 5`,
        {
          type: QueryTypes.SELECT,
        }
    );

    dateAndTime = dateAndTime.map((dateAndTime)=>{
      return dateAndTime.date
    })
    
    res.json({ ok: true, message: "해당 시간은 5회가 모두 마감되었습니다.", dateAndTime});
  } catch (err) {
    console.error(`${err}에러로 시간 조회에 실패하였습니다.`);
    res
      .status(400)
      .json({ ok: false, errorMessage: '시간 조회에 실패하였습니다.' });
  }
};

// 예약 등록
module.exports.postReserve = async (req, res) => {
  try {
    const {
      type,
      departure,
      password,
      carNumber,
      phoneNumber,
      amountPallet,
      carType,
      DateAndTime,
    } = req.body;

    createInfo = {
      departure,
      password,
      carNumber,
      phoneNumber,
      amountPallet,
      carType,
      DateAndTime,
      isDone: false,
    };

    // 쿠팡 예약 등록
    if (type === 'coupang') {
      const alreadyReserve = await Coupang.findOne({ where: { carNumber } });

      if (alreadyReserve) {
        if (!alreadyReserve.isDone) {
          return res.json({
            ok: false,
            errorMessage:
              '이미 예약한 내역이 있습니다. 반품이 완료된 후에 다시 예약을 등록해주세요.',
          });
        }
      }

      await Coupang.create(createInfo);

      const newReserve = await Coupang.findOne({
        where: { carNumber, isDone: false },
      });

      res.status(201).json({
        ok: true,
        message: '예약이 성공적으로 완료되었습니다.',
        CoupangId: newReserve.CoupangId,
      });
    }
    // 3PL 예약 등록
    else {
      const alreadyReserve = await TPL.findOne({ where: { carNumber } });

      if (alreadyReserve) {
        if (!alreadyReserve.isDone) {
          return res.json({
            ok: false,
            errorMessage:
              '이미 예약한 내역이 있습니다. 반품이 완료된 후에 다시 예약을 등록해주세요.',
          });
        }
      }

      await TPL.create(createInfo);

      const newReserve = await TPL.findOne({
        where: { carNumber, isDone: false },
      });

      res.status(201).json({
        ok: true,
        message: '예약이 성공적으로 완료되었습니다.',
        TPLId: newReserve.TPLId,
      });
    }
  } catch (err) {
    res.status(400).json({ ok: false, errorMessage: '예약을 실패하였습니다.' });
    console.error(`${err}로 인해 예약을 실패하였습니다. `);
  }
};

// 예약 조회
module.exports.getReserve = async (req, res) => {
  try {
    const { departure, password, carNumber, phoneNumber } = req.body;

    let reserve = await Coupang.findOne({
      where: {
        carNumber,
        isDone: false,
      },
    });

    reserve = reserve
      ? reserve
      : await TPL.findOne({
          where: {
            carNumber,
            isDone: false,
          },
        });

    res.json({ ok: true, message: '예약 조회를 성공하였습니다.', reserve });
  } catch (err) {
    console.error(`${err}에러로 예약 조회를 실패하였습니다.`);
    res
      .status(400)
      .json({ ok: false, errorMessage: '예약 조회를 실패하였습니다.' });
  }
};

// 예약 수정
module.exports.putReserve = async (req, res) => {
  try {
    const { type, typeId } = req.body;
    const reserveInfo = req.body;

    // 예약 되어있는지 찾기
    const reserve =
      type === 'Coupang'
        ? await Coupang.findOne({ where: { CoupangId: typeId } })
        : await TPL.findOne({ where: { TPLId: typeId } });
    console.log(reserve);

    if (!reserve) {
      return res.json({
        ok: false,
        errorMessage: '예약내역이 존재하지 않습니다.',
      });
    }

    // 예약 업데이트
    type === 'Coupang'
      ? await Coupang.update(reserveInfo, { where: { CoupangId: typeId } })
      : await TPL.update(reserveInfo, { where: { TPLId: typeId } });

    res.json({
      ok: true,
      message: '예약 수정을 성공하였습니다.',
      type,
      typeId,
    });
  } catch (err) {
    console.error(`${err}에러로 예약 수정을 실패하였습니다.`);
    res
      .status(400)
      .json({ ok: false, errorMessage: '예약 수정을 실패하였습니다.' });
  }
};

// 예약 삭제
module.exports.deleteReserve = async (req, res) => {
  try {
    const { type, typeId } = req.body;

    //예약 되어있는지 찾기
    const reserve =
      type === 'Coupang'
        ? await Coupang.findOne({ where: { CoupangId: typeId } })
        : await TPL.findOne({ where: { TPLId: typeId } });

    if (!reserve) {
      return res.json({
        ok: false,
        errorMessage: '예약내역이 존재하지 않습니다.',
      });
    }

    // 예약 삭제
    type === 'Coupang'
      ? await Coupang.destroy({ where: { CoupangId: typeId } })
      : await TPL.destroy({ where: { TPLId: typeId } });

    res.json({
      ok: true,
      message: '예약 삭제를 성공하였습니다.',
      type,
      typeId,
    });
  } catch (err) {
    console.error(`${err}에러로 예약 삭제를 실패하였습니다.`);
    res
      .status(400)
      .json({ ok: false, errorMessage: '예약 삭제를 실패하였습니다.' });
  }
};
