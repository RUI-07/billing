'use client'
import {CustomerList} from '@/components/customer/CustomerList'
import {FullScreenPopup} from '@/components/ui/FullScreenPopup'
import {Customer} from '@prisma/client'
import {useState} from 'react'
import {Calendar, Cell, Input} from 'react-vant'

export default function Home() {
  const [customer, setCustomer] = useState<Customer>()
  return (
    <>
      <div>
        <Cell title="交易日期">
          <Calendar defaultValue={new Date()} minDate={new Date(0)} maxDate={new Date()}>
            {(val, actions) => (
              <Cell
                isLink
                value={val ? (val as Date).toLocaleDateString() : '请选择日期'}
                onClick={() => actions.open()}
              />
            )}
          </Calendar>
        </Cell>
        <a href="#customer">
          <Cell title="交易客户" value={customer?.name} />
        </a>
      </div>
      <FullScreenPopup position="right" triggerHash="#customer">
        <CustomerList
          selectable
          onSelect={item => {
            window.location.hash = ''
            console.log(item)
            setCustomer(item)
          }}
        />
      </FullScreenPopup>
    </>
  )
}
