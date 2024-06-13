import {ActionResult, ResultCode} from '@/type'
import {cookieJwtCheck} from '@/util/cookieJwtCheck'

export function guard<T extends readonly any[]>(action: (...args: T) => Promise<ActionResult>) {
  return async (...args: T): Promise<ActionResult> => {
    if (!(await cookieJwtCheck())) {
      return {
        code: ResultCode.UNAUTHENTICATED,
        msg: '请先登录',
      }
    }

    return action(...args)
  }
}
