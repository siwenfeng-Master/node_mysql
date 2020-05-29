/*
 * @Author: siwenfeng
 * @Date: 2020-05-28 10:26:20
 * @LastEditTime: 2020-05-28 16:45:44
 * @Description: this is ....
 */ 
class BaseModel {
  constructor(data, message) {
    if (typeof data === 'string') {
      this.msg = data;
      data = null;
      message = null;
    }
    if (data) {
      this.data = data;
    }
    if (message) {
      this.msg = message;
    }
  }
}
class SuccessModel extends BaseModel {
  constructor(data, message) {
    // 调用父类constructor创建this
    super(data, message);
    this.code = '000000';
  }
}
class ErrorModel extends BaseModel {
  constructor(data, message) {
    super(data, message);
    this.code = '000001';
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
};