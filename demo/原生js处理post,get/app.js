/*
 * @Author: siwenfeng
 * @Date: 2020-05-26 14:39:56
 * @LastEditTime: 2020-05-28 16:17:57
 * @Description: 原生js实现http post
 */ 
// 从浏览器输入一个地址到浏览器显示
// dns解析 ip => tcp 连接（三次握手）=> 发送http请求
// 客户端接受返回数据

const http = require('http');
const queryString = require('querystring');
const server = http.createServer((req, res) => {
  const method = req.method;
  const url = req.url;
  const path = url.split('?')[0];
  const query = queryString.parse(url.split('?')[1]);
  
  // 设置返回数据格式
  res.setHeader('Content-type', 'application/json')
  const resData = {
    method,
    url,
    path,
    query
  }
  // 
  if (method === 'GET') {
    res.end(JSON.stringify(resData))
  }
  if (method === 'POST') {
    let postData = ''
    req.on('data', chunk => {
      console.log(1)
      postData += chunk.toString();
    })
    req.on('end', () => {
      console.log(2)
      resData.postData = postData;
      res.end(JSON.stringify(resData))
    })
  }
})

server.listen(3000, () => {
  console.log('server is runing port 3000!')
});