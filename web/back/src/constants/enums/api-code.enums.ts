export enum ApiCode {
  TIMEOUT = -1, // 系统繁忙
  SUCCESS = 0, // 请求成功

  BUSINESS_ERROR = 401, // 业务错误
  PARAMS_ERROR = 402, // 参数不合法
  SIGN_ERROR = 403, // 登录失败
  TOKEN_ERROR = 404, // token不合法
}
