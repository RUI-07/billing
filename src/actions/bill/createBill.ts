'use server'
import {prisma} from '@/lib/prisma'
import {ResultCode} from '@/type'
import {defineAction} from '@/util/defineAction'
import {customerSchema} from '@/zod'
import {z} from 'zod'

const createCustomerDto = z.object({
  date: z.date(),
  customerId: customerSchema.shape.id,
  billItems: z.array(
    z.object({
      name: z.string(),
      quantity: z.string(),
      price: z.string(),
    }),
  ),
  remark: z.string().optional(),
})

type CreateCustomerDto = z.infer<typeof createCustomerDto>

export const createBill = defineAction(async (userInfo, values: CreateCustomerDto) => {
  const {date, customerId, billItems, remark} = createCustomerDto.parse(values)
  await prisma.bill.create({
    data: {
      date,
      customerId,
      userId: +userInfo.id,
      remark,
      billItems: {
        createMany: {
          data: billItems.map(item => {
            const priceCent = Math.floor(parseFloat(item.price) * 100)
            const quantity = parseInt(item.quantity)
            return {
              name: item.name,
              quantity,
              price: priceCent,
              total: priceCent * quantity,
            }
          }),
        },
      },
    },
  })
  return {
    code: ResultCode.SUCCESS,
    msg: '创建成功',
  }
})
