import { getCustomer } from '@/actions/customer/getCustomer'
import {CustomerCreateForm} from './components/CustomerCreateForm'

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
