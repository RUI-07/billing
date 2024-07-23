import {useState} from 'react'
import formatDate from 'dateformat'
import {add} from 'lodash'

const TEXT_EDIT_HASH = '#bill-text'

export const useBillTextEdit = () => {
  const [billText, setBillText] = useState('')

  return {
    editBillText: (
      date: Date,
      billItems: {
        name: string
        quantity: string
        price: string
      }[],
    ) => {
      setBillText(
        [
          formatDate(date, 'yyyy年mm月dd日'),
          '',
          '----------',
          '',
          billItems
            ?.filter(item => item.name)
            ?.map(item => {
              const price = parseFloat(item.price)
              const quantity = parseFloat(item.quantity)
              const sum = price * quantity
              return `${item.name}：${quantity} × ${price} = ${sum}`
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
