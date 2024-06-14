import {jwtVerify} from 'jose'
import {cookies} from 'next/headers'
import {JwtUserInfo} from '@/type'

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

export function fillUser<T extends readonly any[], U extends Promise<any>>(
  fn: (userInfo: JwtUserInfo | null, ...args: T) => U,
) {
  return async (...args: T): Promise<Awaited<U>> => {
    const userInfo = await getUser()
    return await fn(userInfo, ...args)
  }
}
