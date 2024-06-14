'use client'
import {CustomerType} from '@prisma/client'
import {Button, Calendar, Cell, Form, Input, Selector, SelectorProps, Typography} from 'react-vant'
import {createCustomer} from './actions'
import {ResultCode} from '@/type'
import {toastResult} from '@/util/toastResult'
import {useRouter} from 'next/navigation'

const customerTypeOptions: SelectorProps<CustomerType>['options'] = [
  {
    label: '出货（统计出货额）',
    value: CustomerType.Selling,
  },
  {
    label: '进货（统计进货额）',
    value: CustomerType.Purchase,
  },
]

interface FormValues {
  name: string
  type: CustomerType
  statsStartAt: Date
  phone?: string
}

const CustomerCreate = () => {
  const router = useRouter()

  return (
    <div>
      <div style={{textAlign: 'center'}}>
        <Typography.Title level={2}>新建客户</Typography.Title>
      </div>
      <Form
        initialValues={{
          type: CustomerType.Selling,
          statsStartAt: new Date(),
        }}
        onFinish={async (values: FormValues) => {
          console.log('values', values)
          const result = await createCustomer(values)
          if (result.code !== ResultCode.SUCCESS) {
            toastResult(result)
          } else {
            router.replace('/customer')
          }
        }}
        footer={
          <div style={{margin: '16px 16px 0'}}>
            <Button round nativeType="submit" type="primary" block>
              提交
            </Button>
          </div>
        }
      >
        <Form.Item label="客户名称" name="name" required>
          <Input placeholder="请输入客户名称" />
        </Form.Item>
        <Form.Item name="type" label="客户类型" required>
          <Selector options={customerTypeOptions} />
        </Form.Item>
        <Form.Item name="statsStartAt" label="开始记账日" trigger="onConfirm" required>
          <Calendar>
            {(val, actions) => (
              <Cell
                isLink
                value={val ? (val as Date).toLocaleDateString() : '请选择日期'}
                onClick={() => actions.open()}
              />
            )}
          </Calendar>
        </Form.Item>
        <Form.Item label="客户电话" name="phone">
          <Input placeholder="选填(用于发起呼叫)" clearable />
        </Form.Item>
      </Form>
    </div>
  )
}

export default CustomerCreate
