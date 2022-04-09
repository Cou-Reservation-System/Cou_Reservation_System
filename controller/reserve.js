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
    } else {

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
  } catch (error) {
    res.status(400).json({ ok: false, errorMessage: "예약에 실패하였습니다." });
    console.error(`${error}로 인해 예약에 실패하였습니다. `);
  }
};
