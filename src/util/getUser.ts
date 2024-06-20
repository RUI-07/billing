import {jwtVerify} from 'jose'
import {cookies} from 'next/headers'
import {ActionResult, JwtUserInfo, ResultCode} from '@/type'

export const getUser = async (): Promise<JwtUserInfo | null> => {
  try {
    const cookieStore = cookies()
    const jwt = cookieStore.get('jwt')?.value
    if (!jwt) return null
    const secret = new TextEncoder().encode(process.env.SECRET)
    const result = await jwtVerify<JwtUserInfo>(jwt, secret)
    return result.payload
  } catch (e) {
    console.error(e)
    return null
  }
}

export function fillUser<T extends readonly any[], U extends Record<string, any> | undefined>(
  fn: (userInfo: JwtUserInfo, ...args: T) => Promise<ActionResult<U>>,
) {
  return async (...args: T): Promise<ActionResult<U>> => {
    const userInfo = await getUser()
    if (!userInfo) {
      return {
        code: ResultCode.UNAUTHENTICATED,
        msg: '无用户信息',
      }
    }
    return await fn(userInfo, ...args)
  }
}
