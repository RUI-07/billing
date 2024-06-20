import {ActionResult, ResultCode} from '@/type'
import {cookieJwtCheck} from '@/util/cookieJwtCheck'
import {errorToResult} from './errorToResult'

export function guard<T extends readonly any[], U extends Record<string, any> | undefined>(
  action: (...args: T) => Promise<ActionResult<U>>,
) {
  return async (...args: T): Promise<ActionResult<U>> => {
    if (!(await cookieJwtCheck())) {
      return {
        code: ResultCode.UNAUTHENTICATED,
        msg: '请先登录',
      }
    }
    try {
      return await action(...args)
    } catch (e) {
      return errorToResult(e) as ActionResult<U>
    }
  }
}
