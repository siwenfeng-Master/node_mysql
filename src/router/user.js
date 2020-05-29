/*
 * @Author: siwenfeng
 * @Date: 2020-05-28 09:26:19
 * @LastEditTime: 2020-05-28 17:04:07
 * @Description: this is ....
 */ 
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { login } = require('../controller/user');
const handleUserRouter = (req, res) => {
  const method = req.method;
  const path = req.path;

  if (method === 'POST' && path === '/api/user/login') {
    const { usrname, password } = req.body;
    const result = login(usrname, password);
    return result ? new SuccessModel(result, 'success') : new ErrorModel('error')
  }
}
module.exports = handleUserRouter;