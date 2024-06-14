'use client'
import {CustomerType} from '@prisma/client'
import {useState} from 'react'
import {Card, Dialog, DropdownMenu, Input} from 'react-vant'

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

export const CustomerList = () => {
  const [search, setSearch] = useState('')

  // const {data: list, run} = useRequest(
  //   async (keyword?: string) => {
  //     const {data} = await api.customer.list({name: keyword})
  //     return data.data
  //   },
  //   {
  //     onError(e) {
  //       showTopTips.error(e.name)
  //     },
  //   },
  // )

  // const handleSearch = useMemo(() => {
  //   return debounce({delay: 300}, (keyword: string) => {
  //     run(keyword)
  //   })
  // }, [run])

  // const [deleteId, setDeleteId] = useState<string>()
  // const handleDelete = () => {
  //   // api.customer.delete()
  // }

  const list: Record<string, string>[] = []

  return (
    <>
      <div className="pb-2">
        <div>
          <Input clearable />
        </div>

        <div className="px-4">
          {list?.map(item => {
            return (
              <Card key={item._id + ''}>
                <Card.Body>
                  <div>
                    <span>客户名称</span>
                    <span>{item.name}</span>
                  </div>
                  <div>
                    <span>客户类型</span>
                    <span>{CustomerTypeOptions.find(option => option.value === item.type)?.label || ''}</span>
                  </div>
                  <div>
                    <span>始记账日</span>
                    <span>{formatDate(item.statsStartAt, 'yyyy年mm月dd日')}</span>
                  </div>
                  <div>
                    <span>客户电话</span>
                    <span>
                      <a href={`tel:${item.phone}`} className="text-blue-600">
                        {item.phone}
                      </a>
                    </span>
                  </div>
                </Card.Body>
                <Card.Footer>
                  <span>
                    <div>账本</div>
                  </span>
                  <span>
                    <DropdownMenu direction="up">
                      <DropdownMenu.Item
                        name="value1"
                        options={[
                          {value: 'edit', text: '编辑'},
                          {value: 'delete', text: '删除'},
                        ]}
                      >
                        更多
                      </DropdownMenu.Item>
                    </DropdownMenu>
                  </span>
                </Card.Footer>
              </Card>
            )
          })}
        </div>
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
