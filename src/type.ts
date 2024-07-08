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
  NOT_FOUND = 404,
}

export type ActionResult<T extends Record<string, any> | undefined = undefined> = {
  code: ResultCode
  msg?: string
  data?: T
}

export interface JwtUserInfo {
  id: string
}

type ItemOrUnknown<T> = T extends Array<infer U> ? U : unknown
export type ListItemFromGen<T extends () => AsyncGenerator<Array<any>>> = ItemOrUnknown<
  ReturnType<T> extends AsyncGenerator<infer U> ? U : unknown
>
