'use server'
import {prisma} from '@/lib/prisma'
import {ResultCode} from '@/type'
import {errorToResult} from '@/util/errorToResult'

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
      code: ResultCode.SUCCESS,
      msg: '注册成功',
    }
  } catch (e) {
    return errorToResult(e)
  }
}
