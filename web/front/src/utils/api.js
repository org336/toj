import { request } from "./axios";

/**
 * @description -封装User类型的接口方法
 */
export class UserService {
  static async login(params) {
    return request("/users/session", params, "POST");
  }
  static async register(params) {
    return request("/users/member", params, "POST");
  }
  static async resetPwd(params) {
    return request("/users/password", params, "PUT");
  }
  static async validateRecaptcha(params) {
    return request("/users/recaptcha", params, "POST");
  }
  static async updateProfile(params) {
    return request("/users/profile", params, "PUT");
  }
  static async getProfile(params) {
    return request("/users/profile", params, "POST");
  }
  static async sendEmailCode(params) {
    return request("/users/email", params, "POST");
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
export class MessageService {
  static async getMessages(params, type) {
    return request(`/messages/${type}`, params, "GET");
  }
}
