'use server'
import {prisma} from '@/lib/prisma'
import {cookies} from 'next/headers'
import {signJwt} from './signJwt'
import {redirect} from 'next/navigation'

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
      const jwt = await signJwt({id: result.id.toString()})
      cookieStore.set('jwt', jwt)
      success = true
    } else {
      return {
        code: 0,
        msg: '密码错误',
      }
    }
  } catch (e) {
    console.error(e)
    return {
      code: 0,
      msg: e + '',
    }
  } finally {
    if (success) {
      redirect('/')
    }
  }
}
