import {BillList} from '@/components/bill/BillList'
import {castAsBillWithPayload} from '@/components/bill/BillList/castAsBillWithPayload'
import {getBillsByCursor} from '@/actions/bill/getBillsByCursor'
import {BasePageProps} from '@/type'

const Ledger = async (
  props: BasePageProps<{
    date: string
    customerId: string
    remark: string
  }>,
) => {
  const {searchParams} = props
  const {date, customerId, remark} = searchParams

  const querys = {
    date: date ? new Date(date) : undefined,
    customerId: customerId ? parseInt(customerId) : undefined,
    remark,
  }

  const customers = await getBillsByCursor({
    size: 5,
    ...querys,
  })

  return (
    <div>
      <BillList defaultList={customers.data?.list.map(castAsBillWithPayload) || []} defaultQuerys={querys} />
    </div>
  )
}

export default Ledger
