const express = require("express");
const router = express.Router();

const User = require("../models/users_models.js");

// 회원가입 API
router.post("/users", async (req, res) => {
  const { email, nickname, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.status(400).json({
      errorMessage: "패스워드가 패스워드 확인란과 다릅니다.",
    });
    return;
  }

  // email 또는 nickname이 동일한 데이터가 있는지 확인하기 위해 가져온다.
  const existsUsers = await User.findOne({
    $or: [{ email }, { nickname }],
  });
  if (existsUsers) {
    // NOTE: 보안을 위해 인증 메세지는 자세히 설명하지 않습니다.
    res.status(400).json({
      errorMessage: "이메일 또는 닉네임이 이미 사용중입니다.",
    });
    return;
  }

  const user = new User({ email, nickname, password });

  //닉네임 생성 조건
  var idRef = /^[a-zA-z0-9]{3,12}$/;
  var pwRef = /^[a-zA-z0-9]{4,12}$/;

  if (!idRef.test(nickname)) {
    res.status(400).send({
      errorMessage: "닉네임을 수정해주세요",
    });
    return false;
  } else if (!pwRef.test(password)) {
    res.status(400).send({
      errorMessage: "비밀번호는 영문 대소문자와 숫자 4~12자리를 입력해주세요!",
    });
    return false;
  } else if (nickname == password) {
    res.status(400).json({
      errorMessage: "닉네임과 비밀번호는 같을 수 없습니다.",
    });
    return false;
  } else {
    await user.save();
  }

  res.status(201).json({});
});

module.exports = router;
