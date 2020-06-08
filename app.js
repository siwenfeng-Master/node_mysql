/*
 * @Author: siwenfeng
 * @Date: 2020-05-26 14:39:56
 * @LastEditTime: 2020-06-08 17:12:00
 * @Description: 业务代码
 */ 
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');
const queryString = require('querystring');
const postDataHandle = (req) => {
  
  return new Promise((resolve, reject) => {
    const method = req.method;

    if (method !== 'POST') {
        resolve({})
        return
      }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString();
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(JSON.parse(postData))
    })

  })
}
const serverHandle = (req, res) => {
  // 设置返回数据格式
  res.setHeader('Content-type', 'application/json')

  // 解析url
  const url = req.url;
  req.path = url.split('?')[0]

  // 解析query
  req.query = queryString.parse(url.split('?')[1]);

  postDataHandle(req).then(data => {
    // 博客所有路由处理
    req.body = data;

    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then(blogData => {
        if (blogData) {
          res.end(JSON.stringify(blogData))
        }
      })
      return
    }

    // 用户所有路由处理
    const userData = handleUserRouter(req, res);
    if (userData) {
      res.end(JSON.stringify(userData))
      return;
    }
    // 路由未命中处理 返回404
    res.writeHead(404, { 'Content-type': 'text/plain' })
    res.write('404 Not Found\n');
    res.end();

  })
}

module.exports = serverHandle;
// process.env.NODE_ENV