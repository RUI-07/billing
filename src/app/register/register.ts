'use server'
import {prisma} from '@/lib/prisma'

interface RegisterFormValues {
  username: string
  password: string
}

export const register = async (values: RegisterFormValues) => {
  try {
    await prisma.user.create({
      data: values,
    })
    return {
      code: 1,
      msg: '注册成功',
    }
  } catch (e) {
    console.error(e)
    return {
      code: 0,
      msg: e + '',
    }
  }
}
