const { TPL, Coupang } = require("../models");

module.exports.reserve = async (req, res) => {
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

    const isDone = false;

    createInfo = {
      departure,
      password,
      carNumber,
      phoneNumber,
      amountPallet,
      carType,
      DateAndTime,
      isDone,
    };

    // 쿠팡 예약 등록
    if (type === "coupang") {

      const alreadyReserve = await Coupang.findOne({ where: { carNumber } });

      if (alreadyReserve) {
        return res.json({
          ok: false,
          errorMessage:
            "이미 예약한 내역이 있습니다. 반품이 완료된 후에 다시 예약을 등록해주세요.",
        });
      }

      await Coupang.create(createInfo);
    } // 3PL 예약 등록 
    else {

      const alreadyReserve = await TPL.findOne({ where: { carNumber } });

      if (alreadyReserve) {
        return res.json({
          ok: false,
          errorMessage:
            "이미 예약한 내역이 있습니다. 반품이 완료된 후에 다시 예약을 등록해주세요.",
        });
      }

      await TPL.create(createInfo);
    }

    res.status(201).json({ ok: true, message: "예약이 성공적으로 완료되었습니다." });
  } catch (err) {
    res.status(400).json({ ok: false, errorMessage: "예약을 실패하였습니다." });
    console.error(`${err}로 인해 예약을 실패하였습니다. `);
  }
};
