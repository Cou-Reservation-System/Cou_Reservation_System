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

///admin URL 접속시 main 렌더링
app.get("/admin", (req, res) => {
    res.render("main");
});
//root URL 접속시 reserve 렌더링
app.get("/", (req, res) => {
  res.render("choose");
});
app.get("/coupangreserve", (req, res) => {
  res.render("reserve");
})
app.get("/3plreserve", (req, res) => {
  res.render("reserve3pl");
})

app.get('/adminReserve', (req, res) => {
    res.render('adminReserve');
})

const reserveRouter = require("./routes/reserve");
const adminRouter = require("./routes/admin");

app.use("/reservation", [reserveRouter]);
app.use("/admin", [adminRouter]);

app.listen(port, () => {
    console.log(port, '포트로 서버가 켜졌습니다.');
  });
