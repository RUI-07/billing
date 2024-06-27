import {prisma} from '@/lib/prisma'
import {getUser} from '@/util/getUser'

export const getCustomer = async (id: number) => {
  const userInfo = await getUser()
  if (!userInfo?.id) return null
  const customer = await prisma.customer.findFirst({
    where: {
      id: +id,
      user: +userInfo.id,
      isDeleted: false,
    },
  })
  return customer
}

