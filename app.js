require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3018;

const router = require('./routes');

app.use(express.json());
app.use(cookieParser());
app.use('/api', router);

app.listen(PORT, () => {
  console.log(PORT, '포트 번호로 서버가 실행되었습니다.');
});
