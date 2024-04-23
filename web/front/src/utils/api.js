import { request } from "./axios";

/**
 * @description -封装User类型的接口方法
 */
export class UserService {
  // 模块一
  /**
   * @description 用户登录
   * @param {string} username - 用户名
   * @return {HttpResponse} result
   */
  static async login1(params) {
    // 接口一
    return request("/login", params, "post");
  }
  static async login2(params) {
    // 接口二
    return request("/login", params, "post");
  }
  static async login3(params) {
    // 接口三
    return request("/login", params, "post");
  }
}

export class CourseService {
  // 模块二
  /**
   * @description 获取地列表
   * @return {HttpResponse} result
   */
  static async addCourse(params) {
    return request("/", params, "get");
  }
}
