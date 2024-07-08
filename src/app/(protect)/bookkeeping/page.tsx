import {getBill} from '@/actions/bill/getBill'
import {BillCreateForm} from '@/components/bill/BillCreateForm'
import {ResultCode} from '@/type'
import {fenToYuan} from '@/util/fenToYuan'

interface BookkeepingProps {
  searchParams: {
    id?: string
  }
}
export default async function Bookkeeping(props: BookkeepingProps) {
  const {
    searchParams: {id},
  } = props

  if (id) {
    const result = await getBill({
      id: +id,
    })
    if (result.code !== ResultCode.SUCCESS || !result.data) {
      return <div>无此账单</div>
    } else {
      const data = result.data
      return (
        <BillCreateForm
          editId={+id}
          initialValues={{
            date: data.date,
            customer: data.customer,
            billItems: data.billItems.map(item => {
              return {
                name: item.name,
                quantity: item.quantity + '',
                price: fenToYuan(item.price),
              }
            }),
            remark: data.remark || '',
          }}
        />
      )
    }
  } else {
    return <BillCreateForm />
  }
}
