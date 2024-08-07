'use client'
import {BillTable, BillTableRecord, createBillTableRow} from '@/components/bill/BillTable'
import {CustomerPicker} from '@/components/customer/CustomerPicker'
import {Customer} from '@prisma/client'
import {Button, DatetimePicker, Form, Input, Typography} from 'react-vant'
import formatDate from 'dateformat'
import {createBill} from '@/actions/bill/createBill'
import {toastResult} from '@/util/toastResult'
import {BillShareTrigger} from '../BillShareTrigger'

interface FormValues {
  date: Date
  customer?: Customer
  billItems: BillTableRecord[]
  remark?: string
}

interface BillCreateFormProps {
  editId?: number
  initialValues?: FormValues
}
export const BillCreateForm = (props: BillCreateFormProps) => {
  const {
    editId,
    initialValues = {
      date: new Date(),
      billItems: [createBillTableRow()],
    },
  } = props

  const isEdit = !!editId

  const handleCreate = async (values: FormValues) => {
    const {date, billItems, remark, customer} = values
    if (!customer) return
    const result = await createBill({
      date,
      customerId: customer?.id,
      billItems,
      remark,
    })
    toastResult(result)
  }

  const Footer = (
    <Form.Item noStyle shouldUpdate>
      {form => {
        const {customer, date, billItems, remark} = form.getFieldsValue() as FormValues
        const notSubmit = !customer
        return (
          <div style={{margin: '16px 16px 0'}}>
            {notSubmit ? (
              <BillShareTrigger date={date} billItems={billItems} remark={remark}>
                <Button round type="primary" block>
                  发单
                </Button>
              </BillShareTrigger>
            ) : (
              <Button round nativeType="submit" type="primary" block>
                提交
              </Button>
            )}
          </div>
        )
      }}
    </Form.Item>
  )

  return (
    <>
      <div>
        <div style={{textAlign: 'center'}}>
          <Typography.Title level={2}>{isEdit ? '编辑账单' : '新增账单'}</Typography.Title>
        </div>
        <Form initialValues={initialValues} onFinish={handleCreate} footer={Footer}>
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
          <Form.Item name="billItems">
            <BillTable editable />
          </Form.Item>
          <Form.Item label="备注" name="remark">
            <Input placeholder="请输入备注" />
          </Form.Item>
        </Form>
      </div>
    </>
  )
}
