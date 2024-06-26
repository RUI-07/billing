import {prisma} from '@/lib/prisma'
import {CustomerCreateForm} from './components/CustomerCreateForm'
import {getUser} from '@/util/getUser'

const getCustomer = async (id: number) => {
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

interface CustomerCreateProps {
  searchParams: {
    id?: string
  }
}
const CustomerCreate = async (props: CustomerCreateProps) => {
  console.log('CustomerCreate props', props)
  const {
    searchParams: {id},
  } = props

  if (id) {
    const customer = await getCustomer(+id)
    return (
      <CustomerCreateForm
        editId={+id}
        initialValues={
          customer
            ? {
                name: customer.name,
                type: customer.type,
                statsStartAt: customer.statsStartAt,
                phone: customer.phone || undefined,
              }
            : undefined
        }
      />
    )
  } else {
    return <CustomerCreateForm />
  }
}

export default CustomerCreate
