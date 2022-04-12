const jwt = require('jsonwebtoken');
const { Admin } = require('../models');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [tokenType, tokenValue] = authorization.split(' ');

    if (tokenType !== 'Bearer') {
      return res.json({
        ok: false,
        errorMessage: '로그인 후 이용 가능한 기능입니다.',
      });
    }

    const {adminId} = jwt.verify(tokenValue, process.env.TOKENKEY);
    Admin.findOne({ where: { adminId } }).then(()=> {
      res.locals.adminId = adminId;
      next();
    })
   
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.json({
        ok: false,
        errorMessage: '로그인 유효기간이 지났습니다. 다시 로그인 해주세요.',
      });
    }

    console.error(`${err}에러로 authmiddleware 로그인 확인을 실패하였습니다.`);

    res.status(400).json({
      ok: false,
      errorMessage: '로그인 확인을 실패하였습니다.',
    });
  }
};
