'use server'
import {prisma} from '@/lib/prisma'
import {ResultCode} from '@/type'
import {defineAction} from '@/util/defineAction'
import {z} from 'zod'

const removeCustomerDto = z.object({
  id: z.number(),
})
type RemoveCustomerDto = z.infer<typeof removeCustomerDto>

export const removeCustomer = defineAction(async (userInfo, params: RemoveCustomerDto) => {
  const {id} = removeCustomerDto.parse(params)
  const result = await prisma.customer.updateMany({
    data: {
      isDeleted: true,
    },
    where: {
      id,
      user: +userInfo.id,
    },
  })
  if (result.count > 0) {
    return {
      code: ResultCode.SUCCESS,
    }
  } else {
    return {
      code: ResultCode.PARAM_INVALID,
      msg: '客户不存在',
    }
  }
})
