/*
 * @Author: siwenfeng
 * @Date: 2020-05-28 11:46:10
 * @LastEditTime: 2020-06-11 14:19:52
 * @Description: this is ....
 */
// 引入数据库
const { exec } = require('../db/mysql')

// 根据作者和关键字 获取博客列表
const getList = (author, keyword) => {
  let sql = `SELECT blogs.id, title, content, createtime, state, realname FROM blogs, users where 1=1 and blogs.user_id = users.id `
  if (author) {
    sql += `and realname='${author}'`
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
   sql += `order by createtime desc;`
   console.log(sql)
  return exec(sql);
}
// 获取博客详情
const getDetail = (id) => {
  const sql =  `select id, title, content, createtime, state from blogs where 1=1 and id=${id};`
  return exec(sql)
}

// 新建博客信息
const newBlog = (blogData = {}) => {
  const { title, content } = blogData;
  const createTime = Date.now();
  const user_id = 5;
  const sql = `insert into blogs(title, content, createtime, user_id, state) values('${title}', '${content}', '${createTime}', '${user_id}', 1);`
  return exec(sql).then(insertData => {
    return {
      id: user_id
    }
  })
}
// 根据id更新博客信息
const updateBlog = (id, blogData = {}) => {
  const { title, content } = blogData;
  // 根据id 插库
  const sql = `
        update blogs set title='${title}', content='${content}' where id=${id}
    `
    return exec(sql).then(updateData => {
      // console.log('updateData is ', updateData)
      if (updateData.affectedRows > 0) {
          return true
      }
      return false
  })
}
// 根据id删除博客信息
const delBlog = (id, author) => {
  // 数据库删除
  const sql = `
        delete from blogs where id=${id} and author='${author}'`
    return exec(sql).then(deleteData => {
      // console.log('updateData is ', updateData)
      if (deleteData.affectedRows > 0) {
          return true
      }
      return false
  })
}


module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
