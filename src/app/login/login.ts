'use server'
import {prisma} from '@/lib/prisma'
import {cookies} from 'next/headers'
import {signJwt} from '@/util/signJwt'
import {redirect} from 'next/navigation'
import {HOME_PAGE} from '@/constant'
import {JwtUserInfo, ResultCode} from '@/type'
import {errorToResult} from '@/util/errorToResult'

interface LoginFormValues {
  username: string
  password: string
}

export const login = async (values: LoginFormValues) => {
  const cookieStore = cookies()
  let success = false
  try {
    const result = await prisma.user.findFirst({
      where: {
        username: values.username,
        password: values.password,
      },
    })
    if (result) {
      const jwtPayload: JwtUserInfo = {id: result.id.toString()}
      const jwt = await signJwt(jwtPayload)
      cookieStore.set('jwt', jwt)
      success = true
    } else {
      return {
        code: ResultCode.PARAM_ERROR,
        msg: '密码错误',
      }
    }
  } catch (e) {
    return errorToResult(e)
  } finally {
    if (success) {
      redirect(HOME_PAGE)
    }
  }
}
