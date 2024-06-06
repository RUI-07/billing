'use server'
import {prisma} from '@/lib/prisma'

interface LoginFormValues {
  username: string
  password: string
}

export const login = async (values: LoginFormValues) => {
  try {
    const result = await prisma.user.findFirst({
      where: {
        username: values.username,
        password: values.password,
      },
    })
    if (result) {
      return {
        success: 1,
        msg: '登入成功',
      }
    } else {
      return {
        success: 0,
        msg: '密码错误',
      }
    }
  } catch (e) {
    return {
      success: 0,
      msg: e + '',
    }
  }
}
