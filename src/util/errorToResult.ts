import {ActionResult, ResultCode} from '@/type'
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library'
import {ZodError} from 'zod'

export const errorToResult = (e: unknown): ActionResult => {
  const prismaErros = [
    PrismaClientInitializationError,
    PrismaClientKnownRequestError,
    PrismaClientRustPanicError,
    PrismaClientUnknownRequestError,
    PrismaClientValidationError,
  ]
  console.error(e)
  if (e instanceof ZodError) {
    return {
      code: ResultCode.PARAM_INVALID,
      msg: e.issues.map(item => item.message).join('\n'),
    }
  } else if (prismaErros.some(error => e instanceof error)) {
    return {
      code: ResultCode.DATABASE_ERROR,
      msg: '数据库错误',
    }
  } else {
    return {
      code: ResultCode.UNKNOWN_ERROR,
      msg: '未知错误',
    }
  }
}
