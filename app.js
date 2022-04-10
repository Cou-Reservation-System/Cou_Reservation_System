const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3000;
const { sequelize } = require("./models");
const { Router } = require("express");


// force: 서버 실행 시 마다 테이블을 재생성 할 것인지 아닌지
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB Connected Success");
  })
  .catch((err) => {
    console.error(err);
  });

const requestMiddleware = (req, res, next) => {
  console.log(
    "Request URL:",
    req.originalUrl,
    " - ",
    new Date(+new Date() + 3240 * 10000)
      .toISOString()
      .replace("T", " ")
      .replace(/\..*/, "")
  );
  next();
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(requestMiddleware);
app.use(cors());

//ejs view
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//정적파일 사용
app.use(express.static("./views"));

//root URL 접속시 reserve 렌더링
app.get("/", (req, res) => {
  res.render("choose");
});
// 일반 예약 
app.get("/coupangreserve", (req, res) => {
  res.render("reserve");
})
// 3pl예약
app.get("/3plreserve", (req, res) => {
  res.render("reserve3pl");
})
//수정 삭제
app.get('/editDelete', (req, res) => {
  res.render("editDelete")
})
// 내정보 조회하기 
app.get("/checkReservation", (req, res) => {
  res.render("checkReservation");
})

///관리자 로그인
app.get("/login", (req, res) => {
  res.render("login");
});
//관리자 회원가입
app.get("/join", (req, res) => {
  res.render("join");
}); 
//관리자 비밀번호 찾기
app.get("/findPass", (req, res) => {
  res.render("findPass");
});
// 관리자 페이지
app.get('/adminReserve', (req, res) => {
  res.render('adminReserve');
})

const reserveRouter = require("./routes/reserve");
const adminRouter = require("./routes/admin");
const reservationCheckRouter = require("./routes/reservationCheck")
const completeCheckRouter = require("./routes/completeCheck")

app.use("/reservation", [reserveRouter]);
app.use("/admin", [adminRouter, reservationCheckRouter, completeCheckRouter]);
app.listen(port, () => {
    console.log(port, '포트로 서버가 켜졌습니다.');
  });
