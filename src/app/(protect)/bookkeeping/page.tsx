'use client'
import {BillTable, BillTableRecord, createBillTableRow} from '@/components/bookkeeping/BillTable'
import {CustomerPicker} from '@/components/customer/CustomerPicker'
import {Customer} from '@prisma/client'
import {Button, DatetimePicker, Form, Input, Typography} from 'react-vant'
import formatDate from 'dateformat'

interface FormValues {
  date: Date
  customer: Customer
  billItems: BillTableRecord[]
  remark?: string
}

export default function Home() {
  return (
    <div>
      <div style={{textAlign: 'center'}}>
        <Typography.Title level={2}>新增账单</Typography.Title>
      </div>
      <Form
        initialValues={{
          date: new Date(),
          billItems: [createBillTableRow()],
        }}
        onFinish={(values: FormValues) => {
          console.log(values)
        }}
        footer={
          <div style={{margin: '16px 16px 0'}}>
            <Button round nativeType="submit" type="primary" block>
              提交
            </Button>
          </div>
        }
      >
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
          <BillTable />
        </Form.Item>
        <Form.Item label="备注" name="remark">
          <Input placeholder="请输入备注" />
        </Form.Item>
      </Form>
    </div>
  )
}
