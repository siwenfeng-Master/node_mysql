/*
 * @Author: siwenfeng
 * @Date: 2020-06-02 14:29:17
 * @LastEditTime: 2020-06-08 16:47:35
 * @Description: this is ....
 */ 
const mysql = require('mysql')
const { MYSQL_CONF, REDIS_CONF } = require('../conf/db');

// 创建链接对象
const con = mysql.createConnection(MYSQL_CONF);

con.connect((err, result) => {
  if (err) {
    console.log(err)
  }
  console.log('mysql connect successful!')
});

// 统一执行sql函数
function exec(sql) {
  
  const promise = new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err)
        return;
      }
      // console.log(result)
      resolve(result);
    })
  })
  return promise;
}

module.exports = {
  exec,
}

// redis 链接
// const redis = require('redis')

// // 创建客户端
// const redisClient = redis.createClient(REDIS_CONF)
// redisClient.auth('siwenfeng')
// redisClient.on('error', err => {
//     console.error(err)
// })

// // 测试
// redisClient.set('myname', 'zhangsan2', redis.print)
// redisClient.get('myname', (err, val) => {
//     if (err) {
//         console.error(err)
//         return
//     }
//     console.log('val ', val)

//     // 退出
//     redisClient.quit()
// })