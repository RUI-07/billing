import {AddCustomer} from './components/AddCustomer'
import {CustomerList} from './components/CustomerList'

const Customer = async () => {
  return (
    <div>
      <CustomerList />
      <AddCustomer />
    </div>
  )
}

export default Customer
