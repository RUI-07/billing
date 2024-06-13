export enum ResultCode {
  SUCCESS = 0,
  PARAM_ERROR = 1000,
  PARAM_INVALID = 1001,
  UNAUTHORIZED = 1002,
  UNAUTHENTICATED = 1003,
  SERVER_ERROR = 5000,
  DATABASE_ERROR = 5002,
  BUSINESS_RULE_VIOLATED = 6000,
  UNKNOWN_ERROR = 9999,
}

export interface ActionResult {
  code: ResultCode
  msg?: string
}

export interface JwtUserInfo {
  id: string
}
