const { Coupang } = require('../models/coupang');

//데이터 불러오기, 날짜별 조회할 경우 그 냘의 수량도 불러오기
module.exports.findReservedList = async (options = {
    date: null,
}) => {
    let stage = {}

    if (date !== null) {
        stage.push(
            {
                where: { DateAndTime: date },
              }
        )

        return Coupang.findAndCountAll(...stage)
    }

    return Coupang.findAll(...stage)
}

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
    const reservedList = await findReservedList()

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
    const date = req.query.date
    const reservedList = await findReservedList({
        date,
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
