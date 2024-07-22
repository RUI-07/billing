import {useState} from 'react'
import formatDate from 'dateformat'
import {BillTableRecord} from '../BillTable'
import {add} from 'lodash'

const TEXT_EDIT_HASH = '#bill-text'

export const useBillTextEdit = () => {
  const [billText, setBillText] = useState('')

  return {
    editBillText: (date: Date, billItems: BillTableRecord[]) => {
      setBillText(
        [
          formatDate(date, 'yyyy年mm月dd日'),
          '',
          '----------',
          '',
          billItems
            ?.filter(item => item.name)
            ?.map(item => {
              return `${item.name}：${parseFloat(item.price) * parseFloat(item.quantity)}`
            })
            .join('\n'),
          '',
          '----------',
          '',
          `共${billItems.map(item => parseFloat(item.price) * parseFloat(item.quantity)).reduce(add, 0) || 0}元`,
        ].join('\n'),
      )
      setTimeout(() => {
        window.location.hash = TEXT_EDIT_HASH
      }, 0)
    },
    props: {
      initialValue: billText,
      triggerHash: TEXT_EDIT_HASH,
    },
  }
}
