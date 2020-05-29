/*
 * @Author: siwenfeng
 * @Date: 2020-05-28 11:46:10
 * @LastEditTime: 2020-05-28 17:09:33
 * @Description: this is ....
 */
// 获取博客列表
const getList = (author, keyword) => {
  return [{
      id: 1
    },
    {
      id: 2
    }
  ]
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
