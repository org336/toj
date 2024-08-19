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
    return request("/email/verify-code", params, "POST");
  }
  static async sendWelcomeEmail(params) {
    return request("/email/welcome", params, "POST");
  }
  static async getAllStudents() {
    return request("/users/all?identity=1", {}, "GET");
  }
}
/**
 * @description -封装Upload类型的接口方法
 */
export class UploadService {
  static async uploadAvatar(uid, params) {
    return uploadFile(`/uploader/avatar?uid=${uid}`, params, "POST");
  }
  static async uploadIdentity(uid, params) {
    return request(`/uploader/authentication?uid=${uid}`, params, "POST");
  }
}
/**
 * @description -封装Message类型的接口方法
 */
export class MessageService {
  static async getSystemMessage(params) {
    return request(
      `/messages/system/?uid=${params.uid}&identity=${params.identity}`,
      {},
      "GET"
    );
  }
  static async createSystemMessage(face, uid, params) {
    return request(`/messages/system?face=${face}&uid=${uid}`, params, "POST");
  }
  static async updateStausSystem(params) {
    return request("/messages/system/status", params, "POST");
  }
  static async getAllPrivateMessage(params) {
    return request(`/messages/private/?&uid=${params}`, {}, "GET");
  }
  static async createPrivateMessage(params) {
    return request("/messages/private", params, "POST");
  }
  static async updateStausPrivate(params) {
    return request("/messages/private/status", params, "POST");
  }
  static async deletePrivateMessage(params) {
    return request(`/messages/private?id=${params}`, {}, "DELETE");
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
/**
 * @description -封装Class类型的接口方法
 */
export class ClassService {
  static async addClass(params) {
    return request("/classes", params, "POST");
  }
  static async getAllClasses() {
    return request("/classes", {}, "GET");
  }
  static async getManyByClass(id) {
    return request(`/classes/${id}/all`, {}, "GET");
  }
  static async addStudentsToClass(id, params) {
    return request(`/classes/${id}/all`, params, "POST");
  }
  static async removeStudentsFromClass(id, params) {
    return request(`/classes/${id}/all`, params, "DELETE");
  }
  static async updateClass(id, params) {
    return request(`/classes/${id}`, params, "PUT");
  }
  static async deleteClass(id) {
    return request(`/classes/${id}`, {}, "DELETE");
  }
  static async deleteStudent(id, uid) {
    return request(`/classes/${id}/${uid}`, {}, "DELETE");
  }
  static async getClass(id) {
    return request(`/classes/${id}`, {}, "GET");
  }
}
