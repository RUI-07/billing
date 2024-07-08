'use server'
import {prisma} from '@/lib/prisma'
import {ResultCode} from '@/type'
import {defineAction} from '@/util/defineAction'
import {z} from 'zod'

const getBillsByCursorDto = z.object({
  index: z.number().optional(),
  size: z.number(),
})
type GetBillsByCursorDto = z.infer<typeof getBillsByCursorDto>

export const getBillsByCursor = defineAction(async (userInfo, params: GetBillsByCursorDto) => {
  const {index, size} = getBillsByCursorDto.parse(params)
  const userId = parseInt(userInfo.id)

  const firstPage = !index

  let cursorId
  if (firstPage) {
    const firstCustomer = await prisma.bill.findFirst({
      where: {
        userId: userId,
        isDeleted: false,
      },
      include: {
        billItems: true,
        customer: true,
      },
      orderBy: {
        date: 'desc',
      },
    })
    cursorId = firstCustomer?.id
  } else {
    cursorId = index
  }

  const bills = cursorId
    ? await prisma.bill.findMany({
        cursor: {
          id: cursorId,
        },
        take: size,
        skip: firstPage ? 0 : 1,
        where: {
          userId: userId,
          isDeleted: false,
        },
        include: {
          billItems: true,
          customer: true,
        },
        orderBy: {
          date: 'desc',
        },
      })
    : []

  const lastCustomers = bills.slice(-1)[0]

  return {
    code: ResultCode.SUCCESS,
    data: {
      list: bills,
      nextId: lastCustomers?.id,
    },
  }
})
