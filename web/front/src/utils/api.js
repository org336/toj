import { request } from "./axios";
import { uploadFile } from "./axios";
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
    return request("/users/password-reset", params, "PUT");
  }
  static async updatePwd(params) {
    return request("/users/password-update", params, "PUT");
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
/**
 * @description -封装Upload类型的接口方法
 */
export class UploadService {
  static async uploadAvatar(uid, params) {
    return uploadFile(`/uploader/avatar?uid=${uid}`, params, "POST");
  }
}
/**
 * @description -封装Message类型的接口方法
 */
export class MessageService {
  static async getSystemMessage(params) {
    return request(`/messages/system/?uid=${params.uid}`, {}, "GET");
  }
  static async createSystemMessage(params) {
    return request("/messages/system", params, "POST");
  }
  static async updateStausSystem(params) {
    return request("/messages/system/status", params, "POST");
  }
  static async getPrivateMessage(params) {
    return request(`/messages/private/?uid=${params.uid}`, {}, "GET");
  }
  static async createPrivateMessage(params) {
    return request("/messages/private", params, "POST");
  }
  static async updateStausPrivate(params) {
    return request("/messages/private/status", params, "POST");
  }
}
/**
 * @description -封装Course类型的接口方法
 */
export class CourseService {
  static async addCourse(params) {
    return request("/courses", params, "POST");
  }
  static async getCourses(params) {
    return request("/courses", params, "GET");
  }
}
