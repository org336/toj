import { request } from "./axios";

/**
 * @description -封装User类型的接口方法
 */
export class UserService {
  static async login(params) {
    return request("/user/login", params, "POST");
  }
  static async register(params) {
    return request("/user/profile", params, "POST");
  }
  static async register(params) {
    return request("/user/profile", params, "PUT");
  }
  static async reset(params) {
    return request("/user/password", params, "PUT");
  }
}

export class CourseService {
  static async addCourse(params) {
    return request("/courses", params, "get");
  }
}
