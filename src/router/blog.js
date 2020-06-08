/*
 * @Author: siwenfeng
 * @Date: 2020-05-28 09:26:11
 * @LastEditTime: 2020-06-08 16:56:05
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
    const detailData = getDetail(id);

    return new SuccessModel(detailData, 'success')
  }
  // 新建一篇博客
  if (method === 'POST' && path === '/api/blog/new') {
    const reqData = newBlog(req.body);
    return new SuccessModel(reqData, 'success')
  }
  
  // 更新博客
  if (method === 'PUT' && path === '/api/blog/update') {
    const id = query.id || '';
    const result = updateBlog(id, req.body)
    return result ? new SuccessModel(result, 'success') : new ErrorModel(result, 'error')
  }
  // 删除博客
  if (method === 'DELETE' && path === '/api/blog/del') {
    const id = query.id || '';
    return new SuccessModel(delBlog(Number(id)), 'success')
  }
}

module.exports = handleBlogRouter;