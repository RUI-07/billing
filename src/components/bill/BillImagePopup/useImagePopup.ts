import {useState} from 'react'
import {BillTableRecord} from '../BillTable'

interface ShowBillImageOptions {
  date: Date
  billItems: BillTableRecord[]
  remark?: string
}

const SHOW_IMAGE_HASH = '#bill-image'
export const useImagePopup = () => {
  const [data, setData] = useState<ShowBillImageOptions>()

  return {
    showBillImage: (options: ShowBillImageOptions) => {
      setData(options)
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
