'use server'
import {prisma} from '@/lib/prisma'
import {ResultCode} from '@/type'
import {defineAction} from '@/util/defineAction'
import {customerSchema} from '@/zod'
import {z} from 'zod'

const editCustomerDto = customerSchema.pick({
  id: true,
  name: true,
  type: true,
  statsStartAt: true,
  phone: true,
})
type EditCustomerDto = z.infer<typeof editCustomerDto>

export const editCustomer = defineAction(async (userInfo, parmas: EditCustomerDto) => {
  const {id, ...values} = editCustomerDto.parse(parmas)
  const result = await prisma.customer.updateMany({
    where: {
      id,
      userId: +userInfo.id,
    },
    data: values,
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
