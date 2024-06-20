import {AddCustomer} from './components/AddCustomer'
import {CustomerList} from './components/CustomerList'
import {getCustomersByCursor} from './components/CustomerList/getCustomersByCursor'

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
