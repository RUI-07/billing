import {prisma} from '@/lib/prisma'
import {ResultCode} from '@/type'
import {defineAction} from '@/util/defineAction'
import {z} from 'zod'

const getBillDto = z.object({
  id: z.number(),
})

type GetBillDto = z.infer<typeof getBillDto>

export const getBill = defineAction(async (userInfo, params: GetBillDto) => {
  const {id} = getBillDto.parse(params)
  const result = await prisma.bill.findFirst({
    where: {
      id: id,
      userId: +userInfo.id,
    },
    include: {
      billItems: true,
      customer: true
    },
  })
  if (result) {
    return {
      code: ResultCode.SUCCESS,
      data: result,
    }
  } else {
    return {
      code: ResultCode.NOT_FOUND,
      msg: '没有对应账单',
    }
  }
})
