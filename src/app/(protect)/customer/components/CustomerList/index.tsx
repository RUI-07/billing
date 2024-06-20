'use client'
import {Customer, CustomerType} from '@prisma/client'
import {useState} from 'react'
import {Cell, Input, List} from 'react-vant'
import formatDate from 'dateformat'
import {ActionSheetTrigger} from '@/components/ActionSheetTrigger'
import {getCustomersByCursor} from './getCustomersByCursor'
import {ResultCode} from '@/type'
import {toastResult} from '@/util/toastResult'
import {useListGenerator} from '@/hooks/useListGenerator'

async function* customersGen(defaultIndex?: number, keyword?: string) {
  const size = 5
  let hasMore = true
  let nextId = defaultIndex
  while (hasMore) {
    const res = await getCustomersByCursor({
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
      yield list
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
  const [search, setSearch] = useState('')

  const defaultIndex = defaultList.findLast(() => true)?.id
  const {list, reload, done, loadMore} = useListGenerator(customersGen, [defaultIndex], {
    defaultList,
  })

  // const [deleteId, setDeleteId] = useState<string>()
  // const handleDelete = () => {
  //   // api.customer.delete()
  // }

  return (
    <>
      <div>
        <Cell>
          <Input
            placeholder="请输入搜索关键字"
            clearable
            onChange={v => {
              reload(undefined, v)
            }}
          />
        </Cell>
        <List
          onLoad={async () => {
            await loadMore()
          }}
          finished={done}
        >
          {list?.map((item, index) => {
            return (
              <Cell key={index}>
                <div>
                  <div>
                    <span>客户ID：</span>
                    <span>{item.id}</span>
                  </div>
                  <div>
                    <span>客户名称：</span>
                    <span>{item.name}</span>
                  </div>
                  <div>
                    <span>客户类型：</span>
                    <span>{CustomerTypeOptions.find(option => option.value === item.type)?.label || ''}</span>
                  </div>
                  <div>
                    <span>始记账日：</span>
                    <span>{formatDate(item.statsStartAt, 'yyyy年mm月dd日')}</span>
                  </div>
                  <div>
                    <span>客户电话：</span>
                    <span>
                      <a href={`tel:${item.phone}`} className="text-blue-600">
                        {item.phone}
                      </a>
                    </span>
                  </div>
                  <div>
                    <span>账本</span>
                    <ActionSheetTrigger actions={[{name: '编辑'}, {name: '删除'}]} cancelText="取消">
                      <span>更多</span>
                    </ActionSheetTrigger>
                  </div>
                </div>
              </Cell>
            )
          })}
        </List>
      </div>
      {
        // <Dialog
        //   visible={!!deleteId}
        //   onClose={() => setDeleteId(undefined)}
        //   title="确认删除"
        //   action={{
        //     main: <div onClick={handleDelete}>删除</div>,
        //     secondary: '取消',
        //   }}
        // />
      }
    </>
  )
}
