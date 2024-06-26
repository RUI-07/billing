'use client'
import {Customer, CustomerType} from '@prisma/client'
import {useCallback, useMemo, useState} from 'react'
import {Cell, Dialog, Input, List, Space} from 'react-vant'
import formatDate from 'dateformat'
import {ActionSheetTrigger} from '@/components/ActionSheetTrigger'
import {getCustomersByCursor} from './getCustomersByCursor'
import {ResultCode} from '@/type'
import {toastResult} from '@/util/toastResult'
import {useListGenerator} from '@/hooks/useListGenerator'
import {debounce} from 'lodash'
import Styles from './index.module.css'
import {useRouter} from 'next/navigation'
import {removeCustomer} from './removeCustomer'

async function* customersGen(defaultIndex?: number, keyword?: string) {
  const size = 5
  let hasMore = true
  let nextId = defaultIndex
  while (hasMore) {
    const res = await getCustomersByCursor({
      size,
      index: nextId,
      keyword,
    })
    if (res.code !== ResultCode.SUCCESS) {
      toastResult(res)
      hasMore = false
      return
    } else {
      const list = res.data?.list || []
      hasMore = list.length >= size
      yield list
      nextId = res.data?.nextId
      if (!nextId) return
    }
  }
}

const CustomerTypeOptions = [
  {
    label: '出货(统计出货额)',
    value: CustomerType.Selling,
  },
  {
    label: '进货(统计进货额)',
    value: CustomerType.Purchase,
  },
]
interface CustomerListProps {
  defaultList?: Customer[]
}
export const CustomerList = (props: CustomerListProps) => {
  const {defaultList = []} = props
  const router = useRouter()

  const defaultIndex = defaultList.findLast(() => true)?.id
  const {list, reload, done, loadMore} = useListGenerator(customersGen, [defaultIndex], {
    defaultList,
  })

  const [search, setSearch] = useState('')
  const handleSearch = useMemo(() => {
    return debounce((v: string) => {
      setSearch(v)
      reload(undefined, v)
    }, 300)
  }, [reload])

  return (
    <div>
      <Cell>
        <Input value={search} placeholder="请输入搜索关键字" clearable onChange={handleSearch} />
      </Cell>
      <List
        className={Styles.list}
        onLoad={async () => {
          await loadMore()
        }}
        finished={done}
      >
        {list?.map((item, index) => {
          const customerTypeText = CustomerTypeOptions.find(option => option.value === item.type)?.label || ''
          return (
            <div key={index} className={Styles.item}>
              <div className={Styles.main}>
                <div className={Styles.title}>{item.name}</div>
                <div className={Styles.secondary}>{customerTypeText}</div>
                <div className={Styles.content}>
                  <div>
                    <span className={Styles.secondary}>始记账日</span>
                    <span>{formatDate(item.statsStartAt, 'yyyy年mm月dd日')}</span>
                  </div>
                  <div>
                    <span className={Styles.secondary}>客户电话</span>
                    <span>
                      <a href={`tel:${item.phone}`} className="text-blue-600">
                        {item.phone}
                      </a>
                    </span>
                  </div>
                </div>
              </div>
              <div className={Styles.footer}>
                <ActionSheetTrigger
                  actions={[{name: '编辑'}, {name: '删除', className: Styles.red}]}
                  cancelText="取消"
                  onSelect={action => {
                    switch (action.name) {
                      case '删除': {
                        Dialog.confirm({
                          title: '确认删除？',
                          onConfirm: async () => {
                            console.log('delete')
                            await removeCustomer({
                              id: item.id,
                            })
                            reload(undefined, search)
                          },
                        })
                        break
                      }
                      case '编辑': {
                        router.push(`/customer/create?id=${item.id}`)
                        break
                      }
                    }
                  }}
                >
                  <span>更多</span>
                </ActionSheetTrigger>
                <span>账本</span>
              </div>
            </div>
          )
        })}
      </List>
    </div>
  )
}
