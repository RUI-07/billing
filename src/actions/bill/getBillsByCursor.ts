'use server'
import {prisma} from '@/lib/prisma'
import {ResultCode} from '@/type'
import {defineAction} from '@/util/defineAction'
import {z} from 'zod'
import dayjs from 'dayjs'
import {Prisma} from '@prisma/client'

const getBillsByCursorDto = z.object({
  index: z.number().optional(),
  size: z.number(),
  date: z.date().optional(),
  customerId: z.number().optional(),
  remark: z.string().optional(),
})
type GetBillsByCursorDto = z.infer<typeof getBillsByCursorDto>

export const getBillsByCursor = defineAction(async (userInfo, params: GetBillsByCursorDto) => {
  const {index, size, date, customerId, remark} = getBillsByCursorDto.parse(params)
  const userId = parseInt(userInfo.id)

  const firstPage = !index

  const where: Prisma.BillWhereInput = {
    userId,
    isDeleted: false,
    date: date
      ? {
          gte: dayjs(date).startOf('day').toDate(),
          lte: dayjs(date).endOf('day').toDate(),
        }
      : undefined,
    customerId,
    remark,
  }

  let cursorId
  if (firstPage) {
    const firstCustomer = await prisma.bill.findFirst({
      where,
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
        where,
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
