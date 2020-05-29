/*
 * @Author: siwenfeng
 * @Date: 2020-05-28 11:46:14
 * @LastEditTime: 2020-05-28 17:03:37
 * @Description: this is ....
 */ 
const login = (username, password) => {
  if (username === 'siwenfeng') {
    return true;
  }
  return false;
}

module.exports = {
  login
}