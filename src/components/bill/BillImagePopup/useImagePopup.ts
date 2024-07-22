import {useState} from 'react'
import {BillTableRecord} from '../BillTable'

const SHOW_IMAGE_HASH = '#bill-image'
export const useImagePopup = () => {
  const [data, setData] = useState<{
    date: Date
    billItems: BillTableRecord[]
  }>()

  return {
    showBillImage: (date: Date, billItems: BillTableRecord[]) => {
      setData({date, billItems})
      setTimeout(() => {
        window.location.hash = SHOW_IMAGE_HASH
      }, 0)
    },
    props: {
      ...data,
      triggerHash: SHOW_IMAGE_HASH,
    },
  }
}
