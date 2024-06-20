'use server'

import {JwtUserInfo, ResultCode} from '@/type'
import {guard} from '@/util/actionGuard'
import {errorToResult} from '@/util/errorToResult'
import {fillUser} from '@/util/getUser'
import {customerSchema} from '@/zod'
import {z} from 'zod'
import {prisma} from '@/lib/prisma'

const CreateCustomerDto = customerSchema.pick({
  name: true,
  type: true,
  statsStartAt: true,
  phone: true,
})

export const createCustomer = guard(
  fillUser(async (userInfo: JwtUserInfo | null, values: z.infer<typeof CreateCustomerDto>) => {
    try {
      const customer = CreateCustomerDto.parse(values)
      if (!userInfo) {
        return {code: ResultCode.UNAUTHENTICATED, msg: '请先登入'}
      }
      await prisma.customer.create({
        data: {
          ...customer,
          user: parseInt(userInfo.id),
        },
      })
      return {
        code: ResultCode.SUCCESS,
      }
    } catch (e) {
      return errorToResult(e)
    }
  }),
)
