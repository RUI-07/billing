import {getBillsByCursor} from '@/actions/bill/getBillsByCursor'
import {ResultCode} from '@/type'
import {toastResult} from '@/util/toastResult'
import {castAsBillWithPayload} from './castAsBillWithPayload'

export async function* billsGen(
  defaultIndex?: number,
  searchOptions?: {
    date?: Date
    customerId?: number
    remark?: string
  },
) {
  const size = 5
  let hasMore = true
  let nextId = defaultIndex
  while (hasMore) {
    const res = await getBillsByCursor({
      size,
      index: nextId,
      ...searchOptions,
    })
    if (res.code !== ResultCode.SUCCESS) {
      toastResult(res)
      hasMore = false
      return
    } else {
      const list = res.data?.list || []
      hasMore = list.length >= size
      yield list.map(castAsBillWithPayload)
      nextId = res.data?.nextId
      if (!nextId) return
    }
  }
}
