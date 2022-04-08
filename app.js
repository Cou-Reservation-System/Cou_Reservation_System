require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const { sequelize } = require('./models');

// force: 서버 실행 시 마다 테이블을 재생성 할 것인지 아닌지
sequelize.sync({force: false})
    .then(()=>{
        console.log("DB Connected Success");
    })
    .catch((err)=> {
        console.error(err);
    });

const requestMiddleware = (req, res, next) => {
    console.log('Request URL:', req.originalUrl, ' - ', new Date());
    next();
    };
    
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(requestMiddleware);
app.use(cors());

app.listen(port, () => {
    console.log(port, '포트로 서버가 켜졌습니다.');
  });
  