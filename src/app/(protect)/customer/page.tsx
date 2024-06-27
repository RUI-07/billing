import {AddCustomer} from '@/components/customer/AddCustomer'
import {CustomerList} from '@/components/customer/CustomerList'
import {getCustomersByCursor} from '@/actions/customer/getCustomersByCursor'

const Customer = async () => {
  const customers = await getCustomersByCursor({
    size: 5,
  })
  return (
    <div>
      <CustomerList defaultList={customers.data?.list || []} />
      <AddCustomer />
    </div>
  )
}

export default Customer
