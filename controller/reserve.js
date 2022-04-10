const { isRef } = require('joi');
const { TPL, Coupang } = require('../models');

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
      isDone : false,
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

    res.json({ ok: true, message: "예약 조회를 성공하였습니다.", reserve });
  } catch (err) {
    console.error(`${err}에러로 예약 조회를 실패하였습니다.`);
    res
      .status(400)
      .json({ ok: false, errorMessage: '예약 조회를 실패하였습니다.' });
  }
};
module.exports.putReserve = async (req, res) => {};
module.exports.deleteReserve = async (req, res) => {};
