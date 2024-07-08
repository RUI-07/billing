import {BillList} from '@/components/bill/BillList'
import {getBillsByCursor} from '@/actions/bill/getBillsByCursor'

const Ledger = async () => {
  const customers = await getBillsByCursor({
    size: 5,
  })
  return (
    <div>
      <BillList defaultList={customers.data?.list || []} />
    </div>
  )
}

export default Ledger
