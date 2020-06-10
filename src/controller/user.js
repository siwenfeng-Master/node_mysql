/*
 * @Author: siwenfeng
 * @Date: 2020-05-28 11:46:14
 * @LastEditTime: 2020-06-10 17:39:36
 * @Description: this is ....
 * 
 */
const { exec } = require('../db/mysql'); 
const login = (username, password) => {
  const sql = `select username, realname from users where username='${username}';`
  // console.log(sql)
  return exec(sql).then(data => {
    return data[0] || {};
  })
}

module.exports = {
  login
}