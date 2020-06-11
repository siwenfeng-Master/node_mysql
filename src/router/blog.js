/*
 * @Author: siwenfeng
 * @Date: 2020-05-28 09:26:11
 * @LastEditTime: 2020-06-11 15:05:43
 * @Description: this is ....
 */ 
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');

// 统一的登录验证函数
const loginCheck = (req) => {
  if (!req.session.username) {
      return Promise.resolve(
          new ErrorModel('尚未登录')
      )
  }
}

const handleBlogRouter = (req, res) => {
  const method = req.method;
  const path = req.path;
  const query = req.query;

  // 获取博客列表
  if (method === 'GET' && path === '/api/blog/list') {
    let author = query.author || '';
    const keyword = query.keyword || '';
    if (req.query.isadmin) {
      // 管理员界面
      const loginCheckResult = loginCheck(req)
      if (loginCheckResult) {
          // 未登录
          return loginCheckResult
      }
      // 强制查询自己的博客 登录后只能管理自己的博客
      author = req.session.username
    }
    const result = getList(author, keyword);

    return result.then(data => {
      return new SuccessModel(data, 'success');
    })
  }

  // 获取博客详情
  if (method === 'GET' && path === '/api/blog/detail') {
    const id = query.id || '';
    const result = getDetail(id);
    return result.then(detailData => {
      return new SuccessModel(detailData, 'success')
    })
  }
  // 新建一篇博客
  if (method === 'POST' && path === '/api/blog/new') {
    // const result = newBlog(req.body);
    // return result.then(reqData => {
    //   return new SuccessModel(reqData, 'success')
    // })
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
        // 未登录
        return loginCheckResult
    }

    req.body.author = req.session.username
    const result = newBlog(req.body)
    return result.then(data => {
        return new SuccessModel(data, 'success')
    })
  }
  
  // 更新博客
  if (method === 'POST' && path === '/api/blog/update') {

    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
        // 未登录
        return loginCheckResult
    }

    const id = query.id || '';
    const result = updateBlog(id, req.body)
    return result.then(val => {
      if (val) {
          return new SuccessModel()
      } else {
          return new ErrorModel('更新博客失败！')
      }
    })
  }
  // 删除博客
  if (method === 'DELETE' && path === '/api/blog/del') {

    if (loginCheckResult) {
      // 未登录
      return loginCheckResult
    }
    const id = query.id || '';
    const author = req.session.username;
    const result = delBlog(Number(id), author);
    return result.then(data => {
      if (data) {
        return new SuccessModel()
      } else {
        return new ErrorModel('删除博客失败！')
      }
    })
  }
}

module.exports = handleBlogRouter;