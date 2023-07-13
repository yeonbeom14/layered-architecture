const UserService = require('../services/users.service');

class UsersController {
  userService = new UserService();
  // 회원가입 API
  signupUsers = async (req, res) => {
    const { nickname, password, confirm } = req.body;

    const { code, message } = await this.userService.signupUser(nickname, password, confirm);

    return res.status(code).json({ message });
  };
  // 로그인 API
  loginUsers = async (req, res) => {
    const { nickname, password } = req.body;

    const { code, message, loginToken } = await this.userService.loginUser(nickname, password);

    res.cookie('Authorization', `Bearer ${loginToken}`);
    return res.status(code).json({ message, loginToken });
  };
}

module.exports = UsersController;
