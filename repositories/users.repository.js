const { Users } = require('../models');

class UserRepository {
  // 닉네임으로 조회
  findUser = async (nickname) => {
    const user = await Users.findOne({ where: { nickname } });

    return user;
  };
  // 회원가입 API
  createUser = async (nickname, password) => {
    await Users.create({ nickname, password });
    return;
  };
}

module.exports = UserRepository;
