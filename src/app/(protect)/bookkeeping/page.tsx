'use client'
import {Calendar, Cell, Input} from 'react-vant'

export default function Home() {
  return (
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
      <Cell title="交易客户">
        <Input />
      </Cell>
    </div>
  )
}
