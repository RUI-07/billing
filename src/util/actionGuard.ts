import {ActionResult} from '@/type'
import {cookieJwtCheck} from '@/util/cookieJwtCheck'

export function guard<T>(action: (...args: T[]) => Promise<ActionResult>) {
  return async (...args: T[]): Promise<ActionResult> => {
    if (!(await cookieJwtCheck())) {
      return {
        code: 0,
        msg: '请先登录',
      }
    }

    return action(...args)
  }
}
