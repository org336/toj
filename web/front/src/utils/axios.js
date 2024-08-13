import axios from "axios";
import { ElMessage } from "element-plus"; // 引入el 提示框

// 上传文本数据的textService实例
const textService = axios.create({
  baseURL: import.meta.env.VITE_API_POST,
  timeout: 5000, // 请求超时时间
  withCredentials: true, //携带HttpOnly cookie(包含用户的jwt令牌)
});

//http request 拦截器
textService.interceptors.request.use(
  (config) => {
    // 配置请求头
    config.headers = {
      "Content-Type": "application/json;charset=UTF-8",
      "X-Requested-With": "XMLHttpRequest",
      "Cache-Control": "no-store",
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//http response 拦截器
textService.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      return Promise.resolve(error.response.data);
    } else {
      ElMessage.error("网络错误或请求未发出");
      return Promise.reject(error);
    }
  }
);

// 封装 GET POST PUT请求并导出
export function request(url = "", params = {}, type = "") {
  return new Promise((resolve, reject) => {
    let promise;
    switch (type) {
      case "GET":
        promise = textService.get(url);
        break;
      case "POST":
        promise = textService.post(url, params);
        break;
      case "PUT":
        promise = textService.put(url, params);
        break;
      case "DELETE":
        promise = textService.delete(url);
      default:
    }
    //处理返回
    promise
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
// 上传文件的fileService实例
const fileService = axios.create({
  baseURL: import.meta.env.VITE_API_POST,
  timeout: 10000, // 请求超时时间
  withCredentials: true, //携带HttpOnly cookie
});
// request拦截器
fileService.interceptors.request.use(
  (config) => {
    // 配置请求头
    config.headers = {
      "Content-Type": "multipart/form-data",
      "X-Requested-With": "XMLHttpRequest",
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// response拦截器
fileService.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      return Promise.resolve(error.response.data);
    } else {
      ElMessage.error("网络错误或请求未发出");
      return Promise.reject(error);
    }
  }
);
export function uploadFile(url = "", params = {}) {
  return new Promise((resolve, reject) => {
    fileService
      .post(url, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
