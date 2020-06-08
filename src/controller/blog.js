/*
 * @Author: siwenfeng
 * @Date: 2020-05-28 11:46:10
 * @LastEditTime: 2020-06-08 16:45:37
 * @Description: this is ....
 */
// 引入数据库
const { exec } = require('../db/mysql')

// 根据作者和关键字 获取博客列表
const getList = (author, keyword) => {
  let sql = `select  blogs.id, title, content, createtime, state, realname from blogs  left join users on blogs.user_id = users.id where 1=1 `
  if (author) {
    sql += `and realname='${author}'`
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
   sql += `order by createtime desc;`
  return exec(sql);
}
// 获取博客详情
const getDetail = (id) => {
  return {
    author: 'siwenfeng',
    updateTime: new Date().getTime()
  }
}

// 新建博客信息
const newBlog = (blogData = {}) => {
  // blogData 插入数据库
  return true;
}
// 根据id更新博客信息
const updateBlog = (id, blogData = {}) => {
  // 根据id 插库
  return false
}
// 根据id删除博客信息
const delBlog = (id) => {
  // 数据库删除
  return true
}


module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
