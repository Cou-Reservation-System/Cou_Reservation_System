const jwt = require('jsonwebtoken');
const { Admin } = require('../models');

module.exports.authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [tokenType, tokenValue] = authorization.split(' ');

    console.log(authorization);

    if (tokenType !== 'Bearer') {
      return res.json({
        ok: false,
        errorMessage: '로그인 후 이용 가능한 기능입니다.',
      });
    }

    const { id } = jwt.verify(tokenValue, process.env.TOKENKEY);
    console.log(id);
    const admin = await Admin.findOne({ where: { id } });
    res.locals.admin = admin;

    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.json({
        ok: false,
        errorMessage: '로그인 유효기간이 지났습니다. 다시 로그인 해주세요.',
      });
    }

    console.error(`${err}에러로 로그인 확인을 실패하였습니다.`);

    res.status(400).json({
      ok: false,
      errorMessage: '로그인 확인을 실패하였습니다.',
    });
  }
};
