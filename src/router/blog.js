/*
 * @Author: siwenfeng
 * @Date: 2020-05-28 09:26:11
 * @LastEditTime: 2020-06-08 19:13:58
 * @Description: this is ....
 */ 
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const handleBlogRouter = (req, res) => {
  const method = req.method;
  const path = req.path;
  const query = req.query;

  // 获取博客列表
  if (method === 'GET' && path === '/api/blog/list') {
    const author = query.author || '';
    const keyword = query.keyword || '';
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
    const result = newBlog(req.body);
    return result.then(reqData => {
      return new SuccessModel(reqData, 'success')
    })
  }
  
  // 更新博客
  if (method === 'POST' && path === '/api/blog/update') {
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
    const id = query.id || '';
    const result = delBlog(Number(id));
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