/*
 * @Author: siwenfeng
 * @Date: 2020-06-02 14:29:42
 * @LastEditTime: 2020-06-02 15:32:53
 * @Description: this is ....
 */
// const env = process.env.NODE_ENV || 'env' // 环境参数

// mysql和redis账户配置

let MYSQL_CONF;
let REDIS_CONF;



MYSQL_CONF = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'siwenfeng',
  database: 'blog_server'
}

REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1',
}



module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}