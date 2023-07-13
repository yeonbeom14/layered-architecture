const UserRepository = require('../repositories/users.repository');
const jwt = require('jsonwebtoken');

class UserService {
  userRepository = new UserRepository();
  // 회원가입 API
  signupUser = async (nickname, password, confirm) => {
    const nicknameReg = /^[a-zA-Z0-9]{3,}$/; //nickname 형식 검사
    const passwordReg = /^.{4,}$/; //password 형식 검사
    try {
      if (!nicknameReg.test(nickname)) {
        return { code: 412, message: '닉네임의 형식이 일치하지 않습니다.' };
      }
      if (password !== confirm) {
        return { code: 412, message: '패스워드가 일치하지 않습니다.' };
      }
      if (!passwordReg.test(password)) {
        return { code: 412, message: '패스워드 형식이 일치하지 않습니다.' };
      }
      if (password.includes(nickname)) {
        return { code: 412, message: '패스워드에 닉네임이 포함되어 있습니다.' };
      }

      const isExistUser = await this.userRepository.findUser(nickname);
      if (isExistUser) {
        return { code: 412, message: '중복된 닉네임입니다.' };
      }

      await this.userRepository.createUser(nickname, password);

      return { code: 201, message: '회원 가입에 성공하였습니다.' };
    } catch (err) {
      return { code: 400, message: '요청한 데이터 형식이 올바르지 않습니다.' };
    }
  };
  // 로그인 API
  loginUser = async (nickname, password) => {
    try {
      const user = await this.userRepository.findUser(nickname);
      if (!user || password !== user.password) {
        return { code: 412, message: '닉네임 또는 패스워드를 확인해주세요.' };
      }

      const loginToken = jwt.sign({ userId: user.userId }, process.env.secretKey, {
        expiresIn: '60m',
      });

      return { code: 200, loginToken };
    } catch (err) {
      return { code: 400, message: '로그인에 실패하였습니다.' };
    }
  };
}

module.exports = UserService;
