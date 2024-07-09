import {fenToYuan} from "@/util/fenToYuan"
import {Prisma} from "@prisma/client"

export const castAsBillWithPayload = (
  item: Prisma.BillGetPayload<{
    include: {
      customer: true
      billItems: true
    }
  }>,
) => {
  return {
    ...item,
    billItems: item.billItems.map(item => {
      return {
        ...item,
        quantity: item.quantity + '',
        price: fenToYuan(item.price),
      }
    }),
  }
}
