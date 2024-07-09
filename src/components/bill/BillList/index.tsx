'use client'
import {DatetimePicker, Dialog, Form, FormInstance, Input, List, Typography} from 'react-vant'
import {ActionSheetTrigger} from '@/components/ui/ActionSheetTrigger'
import {ListItemFromGen} from '@/type'
import {useListGenerator} from '@/hooks/useListGenerator'
import Styles from './index.module.css'
import {useRouter} from 'next/navigation'
import {removeCustomer} from '@/actions/customer/removeCustomer'
import formatDate from 'dateformat'
import {BillTable} from '../BillTable'
import {debounce, pick} from 'lodash'
import {billsGen} from './billsGen'
import {CustomerPicker} from '@/components/customer/CustomerPicker'
import {useRef, useState} from 'react'
import {Customer} from '@prisma/client'

interface BillListSearchFormValues {
  date?: Date
  customer?: Customer
  remark?: string
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
  const {
    list,
    reload: reloadRaw,
    done,
    loadMore,
  } = useListGenerator(billsGen, [defaultIndex], {
    defaultList,
  })

  const formRef = useRef<FormInstance>(null)
  const reload = () => {
    const searchOptions: BillListSearchFormValues = formRef.current?.getFieldsValue()
    reloadRaw(undefined, {
      date: searchOptions.date,
      customerId: searchOptions.customer?.id,
      remark: searchOptions.remark || undefined,
    })
  }

  const handleDelete = (id: number) => {
    Dialog.confirm({
      title: '确认删除？',
      onConfirm: async () => {
        await removeCustomer({
          id,
        })
        reload()
      },
    })
  }

  return (
    <div className={Styles.listWrap}>
      <Form ref={formRef} onValuesChange={debounce(reload, 600)}>
        <Form.Item
          label="交易日期"
          name="date"
          isLink
          trigger="onConfirm"
          onClick={(_, action) => {
            action?.current?.open()
          }}
        >
          <DatetimePicker popup type="date" minDate={new Date(0)} maxDate={new Date()}>
            {(val: Date) => {
              return val ? <Typography.Text>{formatDate(val, 'yyyy/mm/dd')}</Typography.Text> : '请选择日期'
            }}
          </DatetimePicker>
        </Form.Item>
        <Form.Item label="交易客户" name="customer" isLink>
          <CustomerPicker placeholder="请选择客户" />
        </Form.Item>
        <Form.Item label="备注" name="remark">
          <Input placeholder="请输入备注" />
        </Form.Item>
      </Form>
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
