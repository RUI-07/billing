import {ActionResult, JwtUserInfo, ResultCode} from '@/type'
import {getUser} from '@/util/getUser'
import {cookieJwtCheck} from '@/util/cookieJwtCheck'
import {errorToResult} from './errorToResult'

export function defineAction<T extends readonly any[], U extends Record<string, any> | undefined>(
  action: (userInfo: JwtUserInfo, ...args: T) => Promise<ActionResult<U>>,
) {
  return async (...args: T): Promise<ActionResult<U>> => {
    if (!(await cookieJwtCheck())) {
      return {
        code: ResultCode.UNAUTHENTICATED,
        msg: '请先登录',
      }
    }

    const userInfo = await getUser()
    if (!userInfo) {
      return {
        code: ResultCode.UNAUTHENTICATED,
        msg: '无用户信息',
      }
    }

    try {
      return await action(userInfo, ...args)
    } catch (e) {
      return errorToResult(e) as ActionResult<U>
    }
  }
}
