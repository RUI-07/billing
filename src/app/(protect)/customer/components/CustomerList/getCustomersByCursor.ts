'use server'
import {prisma} from '@/lib/prisma'
import {ResultCode} from '@/type'
import {defineAction} from '@/util/defineAction'
import {z} from 'zod'

const getCustomersByCursorDto = z.object({
  index: z.number().optional(),
  size: z.number(),
  keyword: z.string().optional(),
})
type GetCustomersByCursorDto = z.infer<typeof getCustomersByCursorDto>

export const getCustomersByCursor = defineAction(async (userInfo, params: GetCustomersByCursorDto) => {
  const {index, size, keyword} = getCustomersByCursorDto.parse(params)
  const userId = parseInt(userInfo.id)

  const firstPage = !index

  let cursorId
  if (firstPage) {
    const firstCustomer = await prisma.customer.findFirst({
      where: {
        user: userId,
        isDeleted: false,
      },
      orderBy: {
        id: 'desc',
      },
    })
    cursorId = firstCustomer?.id
  } else {
    cursorId = index
  }

  const customers = cursorId
    ? await prisma.customer.findMany({
        cursor: {
          id: cursorId,
        },
        take: size,
        skip: firstPage ? 0 : 1,
        where: {
          name: {
            contains: keyword,
          },
          user: userId,
          isDeleted: false,
        },
        orderBy: {
          id: 'desc',
        },
      })
    : []

  const lastCustomers = customers.slice(-1)[0]

  return {
    code: ResultCode.SUCCESS,
    data: {
      list: customers,
      nextId: lastCustomers?.id,
    },
  }
})
