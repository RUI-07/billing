import {BillList} from '@/components/bill/BillList'
import {castAsBillWithPayload} from '@/components/bill/BillList/castAsBillWithPayload'
import {getBillsByCursor} from '@/actions/bill/getBillsByCursor'

const Ledger = async () => {
  const customers = await getBillsByCursor({
    size: 5,
  })
  return (
    <div>
      <BillList defaultList={customers.data?.list.map(castAsBillWithPayload) || []} />
    </div>
  )
}

export default Ledger
