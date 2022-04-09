const { Admin } = require('../models');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

// 회원가입 Joi
const joinSchema = Joi.object({
  id: Joi.string().alphanum().min(3).required(),
  email: Joi.string().email().min(3).required(),
  password: Joi.string().min(4).required(),
  confirmPassword: Joi.string().min(4).required(),
});

module.exports.join = async (req, res) => {
  try {
    const { id, email, password, confirmPassword } =
      await joinSchema.validateAsync(req.body);

    const existId = await Admin.findOne({ where: { id } });
    if (existId) {
      return res.json({ ok: false, errorMessage: '이미 가입된 아이디입니다.' });
    }

    const existEmail = await Admin.findOne({ where: { email } });
    if (existEmail) {
      return res.json({ ok: false, errorMessage: '이미 가입된 이메일입니다.' });
    }

    if (password !== confirmPassword) {
      return res.json({
        ok: false,
        errorMessage: '비밀번호가 비밀번호 확인란과 동일하지 않습니다.',
      });
    }

    const salt = crypto.randomBytes(64).toString('base64');
    const hashPassword = crypto
      .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
      .toString('base64');

    console.log('솔트는', salt);
    console.log('해쉬비번은', hashPassword);

    await Admin.create({ id, email, password: hashPassword, salt });

    res.json({ ok: true, message: '회원가입이 완료되었습니다.' });
  } catch (err) {
    console.error(`${err}로 인해 회원가입에 실패하였습니다.`);
    res.status(400).json({
      ok: false,
      errorMessage: '요청한 데이터 형식이 올바르지 않습니다.',
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { id, password } = req.body;

    console.log(id, password);

    const admin = await Admin.findOne({ where: { id } });

    // 가입된 아이디 아닐시
    if (!admin) {
      return res.json({
        ok: false,
        errorMessage: '아이디 또는 비밀번호를 확인해주세요.',
      });
    }

    const salt = admin.salt;
    const hashPassword = crypto
      .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
      .toString('base64');

    // 비밀번호 불일치
    if (hashPassword !== admin.password) {
      res.json({
        ok: false,
        errorMessage: '아이디 또는 비밀번호를 확인해주세요.',
      });
    }

    const token = jwt.sign({ adminId: admin.adminId }, process.env.TOKENKEY, {
      expiresIn: '2h',
    });

    res.json({ ok: true, message: '로그인이 완료되었습니다.', token });
  } catch (err) {
    console.error(`${err}로 인해 로그인을 실패하였습니다.`);
    res
      .status(400)
      .json({ ok: false, errorMessage: '요청한 형식이 올바르지 않습니다.' });
  }
};

module.exports.auth = async (req, res) => {
  try {
    const admin = res.locals.admin;
    const adminInfo = {
      adminId: admin.adminId,
      id: admin.id,
      email: admin.email,
    };

    res.json({ ok: true, message: '로그인 확인을 성공하였습니다.', adminInfo });
  } catch (err) {
    console.error(`${err}에러로 로그인 확인을 실패하였습니다.`);
    res
      .status(400)
      .json({ ok: false, errorMessage: '로그인 확인을 실패하였습니다.' });
  }
};
