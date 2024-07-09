'use server'
import {prisma} from '@/lib/prisma'
import {ResultCode} from '@/type'
import {defineAction} from '@/util/defineAction'
import {z} from 'zod'

const removeBillDto = z.object({
  id: z.number(),
})
type RemoveBillDto = z.infer<typeof removeBillDto>

export const removeBill = defineAction(async (userInfo, params: RemoveBillDto) => {
  const {id} = removeBillDto.parse(params)
  await prisma.bill.update({
    data: {
      isDeleted: true,
      billItems: {
        updateMany: {
          where: {},
          data: {
            isDeleted: true,
          },
        },
      },
    },
    where: {
      id,
      userId: +userInfo.id,
    },
  })
  return {
    code: ResultCode.SUCCESS,
  }
})
