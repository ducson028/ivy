const express = require('express');
const svgCaptcha = require('svg-captcha');
const cors = require('cors');
const session = require('express-session');

const app = express();

app.use(cors());
app.use(express.json());
app.use(session({
  secret: 'secretKey123', // Khóa bảo mật
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 } // Session tồn tại 1 phút
}));

// Endpoint tạo CAPTCHA
app.get('/captcha', (req, res) => {
  const captcha = svgCaptcha.create({
    noise: 2,
    color: true,
    size: 5
  });
  req.session.captchaText = captcha.text; // Lưu CAPTCHA vào session
  res.type('svg').status(200).send(captcha.data);
});

// Endpoint xác minh CAPTCHA
app.post('/verify-captcha', (req, res) => {
  const { userInput } = req.body;
  if (userInput === req.session.captchaText) {
    res.json({ success: true, message: 'CAPTCHA chính xác' });
  } else {
    res.json({ success: false, message: 'CAPTCHA không đúng' });
  }
});

const PORT = 5000; // Cổng Backend
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
