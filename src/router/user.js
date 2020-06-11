/*
 * @Author: siwenfeng
 * @Date: 2020-05-28 09:26:19
 * @LastEditTime: 2020-06-11 14:26:07
 * @Description: this is ....
 */ 
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { login } = require('../controller/user');
const { set } = require('../db/redis')

// 获取 cookie 的过期时间
// const getCookieExpires = () => {
//   const d = new Date()
//   d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
//   return d.toGMTString()
// }

const handleUserRouter = (req, res) => {
  const method = req.method;
  const path = req.path;

  if (method === 'POST' && path === '/api/user/login') {
    const { username, password } = req.body;
    const result = login(username, password);
    return result.then(data => {
      if (data.username) {
        // 设置session
        req.session.username = data.username;
        req.session.realname = data.realname;

        // 同步redis
        set(req.sessionId, req.session);

        return new SuccessModel();
      }
      return new ErrorModel('登陆失败');
    })
  }
  
  // 登录验证测试 仅限利用cookie 来判断用户是否登录，改造成seseion
  // if (method === 'GET' && path === '/api/user/loginCheck') {
  //   // setCookie，下次登录用来校验
  //   const { username, password } = req.query;
  //   if (username) {
  //     res.setHeader('Set-Cookie', `username=${username}; path=/; httpOnly; expires=${getCookieExpires()}`)
  //     return Promise.resolve(new SuccessModel())
  //   } else {
  //     return Promise.resolve(new ErrorModel('登录失败'))
  //   }
  // }
  if (method === 'GET' && path === '/api/user/loginCheck') {
    if (req.session.username) {
      return Promise.resolve(new SuccessModel({ session: req.session }))
    } 
    return Promise.resolve(new ErrorModel('尚未登录'))
  }

}
module.exports = handleUserRouter;