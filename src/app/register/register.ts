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
      success: 1,
      msg: '注册成功',
    }
  } catch (e) {
    console.error(e)
    return {
      success: 0,
      msg: e + '',
    }
  }
}