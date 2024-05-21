import { request } from "./axios";

/**
 * @description -封装User类型的接口方法
 */
export class UserService {
  static async login(params) {
    return request("/user/session", params, "POST");
  }
  static async register(params) {
    return request("/user/profile", params, "POST");
  }
  static async updateProfile(params) {
    return request("/user/profile", params, "PUT");
  }
  static async reset(params) {
    return request("/password", params, "PUT");
  }
  static async getMessages(params, type) {
    return request(`/messages/${type}`, params, "GET");
  }
}

export class CourseService {
  static async addCourse(params) {
    return request("/courses", params, "POST");
  }
  static async getCourses(params) {
    return request("/courses", params, "GET");
  }
}
