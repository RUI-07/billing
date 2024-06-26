'use client'
import {CustomerType} from '@prisma/client'
import {Button, Calendar, Cell, Form, Input, Radio, Typography} from 'react-vant'
import {createCustomer} from './createCustomer'
import {ResultCode} from '@/type'
import {toastResult} from '@/util/toastResult'
import {useRouter} from 'next/navigation'
import {editCustomer} from './editCutomer'

interface FormValues {
  name: string
  type: CustomerType
  statsStartAt: Date
  phone?: string
}

interface CustomerCreateProps {
  editId?: number
  initialValues?: FormValues
}
export const CustomerCreateForm = (props: CustomerCreateProps) => {
  const {
    editId,
    initialValues = {
      type: CustomerType.Selling,
      statsStartAt: new Date(),
    },
  } = props

  const router = useRouter()
  const isEdit = !!editId

  const handleCreate = async (values: FormValues) => {
    const result = await createCustomer(values)
    if (result.code !== ResultCode.SUCCESS) {
      toastResult(result)
    } else {
      router.replace('/customer')
    }
  }

  const handleEdit = async (values: FormValues) => {
    if (!editId) return
    const result = await editCustomer({
      id: editId,
      ...values,
    })
    if (result.code !== ResultCode.SUCCESS) {
      toastResult(result)
    } else {
      router.replace('/customer')
    }
  }

  return (
    <div>
      <div style={{textAlign: 'center'}}>
        <Typography.Title level={2}>{isEdit ? '编辑客户' : '新建客户'}</Typography.Title>
      </div>
      <Form
        initialValues={initialValues}
        onFinish={isEdit ? handleEdit : handleCreate}
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
          <Radio.Group>
            <Radio name={CustomerType.Selling}>出货（统计出货额）</Radio>
            <Radio name={CustomerType.Purchase}>进货（统计进货额）</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="statsStartAt" label="开始记账日" trigger="onConfirm" required>
          <Calendar minDate={new Date(0)} maxDate={new Date()}>
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
