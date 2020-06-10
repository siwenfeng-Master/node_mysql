/*
 * @Author: siwenfeng
 * @Date: 2020-05-26 14:39:56
 * @LastEditTime: 2020-06-10 17:42:25
 * @Description: 业务代码
 */
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');
const queryString = require('querystring');

// 获取 cookie 的过期时间
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  console.log('d.toGMTString() is ', d.toGMTString())
  return d.toGMTString()
}

// // session 数据
// const SESSION_DATA = {}

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

  // 解析 cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || '' // k1=v1;k2=v2;k3=v3
  cookieStr.split(';').forEach(item => {
    if (!item) {
      return
    }
    const arr = item.split('=')
    const key = arr[0].trim()
    const val = arr[1].trim()
    req.cookie[key] = val
  })
  res.setHeader('Set-Cookie', `path=/; httpOnly; expires=${getCookieExpires()}`)
  console.log(cookieStr)
  // 解析 session
  // let needSetCookie = false
  // let userId = req.cookie.userid
  // if (userId) {
  //   if (!SESSION_DATA[userId]) {
  //     SESSION_DATA[userId] = {}
  //   }
  // } else {
  //   needSetCookie = true
  //   userId = `${Date.now()}_${Math.random()}`
  //   SESSION_DATA[userId] = {}
  // }
  
  // req.session = SESSION_DATA[userId]

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
      userData.then(data => {
        if (data) {
          res.end(JSON.stringify(data))
        }
      })
      return;
    }
    // 路由未命中处理 返回404
    res.writeHead(404, {
      'Content-type': 'text/plain'
    })
    res.write('404 Not Found\n');
    res.end();

  })
}

module.exports = serverHandle;
// process.env.NODE_ENV