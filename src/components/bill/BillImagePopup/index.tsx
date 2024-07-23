import {FullScreenPopup, FullScreenPopupProps} from '@/components/ui/FullScreenPopup'
import formatDate from 'dateformat'
import {add} from 'lodash'
import Styles from './index.module.css'
import {Button} from 'react-vant'
import html2canvas from 'html2canvas'
import {saveAs} from 'file-saver'

export const saveImage = (canvas: HTMLCanvasElement, fileName: string) => {
  canvas.toBlob(blob => {
    if (blob) {
      saveAs(blob, fileName)
    }
  })
}

interface BillImagePopupProps extends FullScreenPopupProps {
  date?: Date
  billItems?: {
    name: string
    quantity: string
    price: string
  }[]
}
export const BillImagePopup = (props: BillImagePopupProps) => {
  const {date, billItems, ...others} = props

  const handleSaveImage = async () => {
    const canvas = await html2canvas(document.querySelector(`.${Styles.wrap}`)!)
    saveImage(canvas, `账单_${formatDate(date, 'yyyy-mm-dd')}.png`)
  }

  return (
    <FullScreenPopup
      {...others}
      style={{
        background: 'var(--page-background)',
      }}
      position="right"
    >
      <div>
        <div className={Styles.wrap}>
          <div className={Styles.date}>{formatDate(date, 'yyyy-mm-dd')}</div>
          <div className={Styles.items}>
            {billItems
              ?.filter(item => item.name)
              ?.map((item, index) => {
                const price = parseFloat(item.price)
                const quantity = parseFloat(item.quantity)
                const sum = price * quantity
                return (
                  <div key={index}>
                    {item.name}：{quantity} × {price} = {sum}
                  </div>
                )
              })}
          </div>
          <div className={Styles.footer}>
            <div className={Styles.total}>
              ¥{billItems?.map(item => parseFloat(item.price) * parseFloat(item.quantity)).reduce(add, 0) || 0}
            </div>
          </div>
        </div>
        <div className={Styles['button-wrap']}>
          <Button type="primary" block round onClick={handleSaveImage}>
            保存
          </Button>
        </div>
      </div>
    </FullScreenPopup>
  )
}
