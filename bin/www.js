/*
 * @Author: siwenfeng
 * @Date: 2020-05-27 11:32:02
 * @LastEditTime: 2020-05-28 09:31:18
 * @Description: 服务启动入口文件
 */ 
const http = require('http');
const PORT = 8088;
const serverHandle = require('../app');
const server = http.createServer(serverHandle);
server.listen(PORT, () => {
  console.log('service is running at port 8088!')
});