export enum ApiCode {
  SUCCESS = 200, // 请求成功

  BUSINESS_ERROR = 401, // 业务错误
  PARAMS_ERROR = 402, // 参数错误
  SIGN_ERROR = 403, // token错误
  NOT_FOUND = 404, // 未找到资源
  TOKEN_INVALID = 405, // 无效的Token
  ACCESS_DENIED = 406, // 没有权限
  TIMEOUT = 429, // 请求过于频繁
  SERVER_ERROR = 500, // 服务器内部错误
  SERVICE_UNAVAILABLE = 503, // 服务不可用
}
