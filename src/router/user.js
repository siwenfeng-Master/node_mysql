/*
 * @Author: siwenfeng
 * @Date: 2020-05-28 09:26:19
 * @LastEditTime: 2020-06-10 17:42:38
 * @Description: this is ....
 */ 
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { login } = require('../controller/user');
const handleUserRouter = (req, res) => {
  const method = req.method;
  const path = req.path;

  if (method === 'POST' && path === '/api/user/login') {
    const { username, password } = req.body;
    const result = login(username, password);
    return result.then(data => {
      if (data.username) {
        return new SuccessModel();
      }
      return new ErrorModel('登陆失败');
    })
  }
}
module.exports = handleUserRouter;