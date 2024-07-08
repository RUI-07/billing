'use client'
import {Bill, Prisma} from '@prisma/client'
import {Dialog, List} from 'react-vant'
import {ActionSheetTrigger} from '@/components/ui/ActionSheetTrigger'
import {ListItemFromGen, ResultCode} from '@/type'
import {toastResult} from '@/util/toastResult'
import {useListGenerator} from '@/hooks/useListGenerator'
import Styles from './index.module.css'
import {useRouter} from 'next/navigation'
import {removeCustomer} from '@/actions/customer/removeCustomer'
import {getBillsByCursor} from '@/actions/bill/getBillsByCursor'
import formatDate from 'dateformat'
import {BillTable} from '../BillTable'
import {fenToYuan} from '@/util/fenToYuan'
import {pick} from 'lodash'

async function* billsGen(defaultIndex?: number) {
  const size = 5
  let hasMore = true
  let nextId = defaultIndex
  while (hasMore) {
    const res = await getBillsByCursor({
      size,
      index: nextId,
    })
    if (res.code !== ResultCode.SUCCESS) {
      toastResult(res)
      hasMore = false
      return
    } else {
      const list = res.data?.list || []
      hasMore = list.length >= size
      yield list.map(item => {
        return {
          ...item,
          billItems: item.billItems.map(item => {
            return {
              ...item,
              quantity: item.quantity + '',
              price: fenToYuan(item.price),
            }
          }),
        }
      })
      nextId = res.data?.nextId
      if (!nextId) return
    }
  }
}

type BillWithPayload = ListItemFromGen<typeof billsGen>

interface CustomerListProps {
  defaultList?: BillWithPayload[]
  selectable?: boolean
  onSelect?: (item: BillWithPayload) => void
}
export const BillList = (props: CustomerListProps) => {
  const {defaultList = [], selectable, onSelect} = props
  const router = useRouter()

  const defaultIndex = defaultList.findLast(() => true)?.id
  const {list, reload, done, loadMore} = useListGenerator(billsGen, [defaultIndex], {
    defaultList,
  })

  const handleDelete = (id: number) => {
    Dialog.confirm({
      title: '确认删除？',
      onConfirm: async () => {
        console.log('delete')
        await removeCustomer({
          id,
        })
        reload()
      },
    })
  }

  return (
    <div className={Styles.listWrap}>
      <List
        className={Styles.list}
        onLoad={async () => {
          await loadMore()
        }}
        finished={done}
      >
        {list?.map((item, index) => {
          return (
            <div key={index} className={Styles.item} onClick={() => onSelect?.(item)}>
              <div className={Styles.main}>
                <div className={Styles.title}>{formatDate(item.date, 'yyyy年mm月dd日')}</div>
                <div className={Styles.content}>
                  <div>
                    <span className={Styles.secondary}>客户</span>
                    <span>{item.customer.name}</span>
                  </div>
                  <div>
                    <span className={Styles.secondary}>备注</span>
                    <span>{item.remark}</span>
                  </div>
                  <div>
                    <BillTable
                      value={item.billItems.map(item => {
                        return pick(item, 'name', 'quantity', 'price')
                      })}
                    />
                  </div>
                </div>
              </div>
              {!selectable && (
                <div className={Styles.footer}>
                  <ActionSheetTrigger
                    actions={[{name: '编辑'}, {name: '删除', className: Styles.red}]}
                    cancelText="取消"
                    onSelect={action => {
                      switch (action.name) {
                        case '删除': {
                          handleDelete(item.id)
                          break
                        }
                        case '编辑': {
                          router.push(`/bookkeeping?id=${item.id}`)
                          break
                        }
                      }
                    }}
                  >
                    <span>更多</span>
                  </ActionSheetTrigger>
                  <span>详情</span>
                </div>
              )}
            </div>
          )
        })}
      </List>
    </div>
  )
}
