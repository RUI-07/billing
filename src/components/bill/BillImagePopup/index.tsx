import {FullScreenPopup, FullScreenPopupProps} from '@/components/ui/FullScreenPopup'
import formatDate from 'dateformat'
import {add} from 'lodash'
import Styles from './index.module.css'
import {Button, Typography} from 'react-vant'
import html2canvas from 'html2canvas'
import {saveAs} from 'file-saver'
import {useState} from 'react'

interface BillImagePopupProps extends FullScreenPopupProps {
  date?: Date
  billItems?: {
    name: string
    quantity: string
    price: string
  }[]
  remark?: string
}
export const BillImagePopup = (props: BillImagePopupProps) => {
  const {date, billItems, remark, ...others} = props

  const [dataUrl, setDataUrl] = useState<string>()
  const handleSaveImage = async () => {
    dataUrl && saveAs(dataUrl, `账单_${formatDate(date, 'yyyy-mm-dd')}.png`)
  }

  return (
    <FullScreenPopup
      {...others}
      style={{
        background: 'var(--page-background)',
      }}
      position="right"
      onVisibleWillChange={visible => {
        setTimeout(async () => {
          if (visible) {
            const elem = document.querySelector(`.${Styles.wrap}`) as HTMLElement | null
            if (!elem) return
            const canvas = await html2canvas(elem)
            setDataUrl(canvas.toDataURL())
          } else {
            setDataUrl(undefined)
          }
        }, 300)
      }}
    >
      <div>
        <div style={{textAlign: 'center'}}>
          <Typography.Title level={2}>图片内容</Typography.Title>
        </div>
        {dataUrl ? (
          <img className={Styles['bill-img']} src={dataUrl} alt="账单" />
        ) : (
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
              {remark ? <div className={Styles.remark}>备注：{remark}</div> : null}
              <div className={Styles.total}>
                ¥{billItems?.map(item => parseFloat(item.price) * parseFloat(item.quantity)).reduce(add, 0) || 0}
              </div>
            </div>
          </div>
        )}
        <div className={Styles['button-wrap']}>
          <Button type="primary" block round onClick={handleSaveImage}>
            保存
          </Button>
        </div>
      </div>
    </FullScreenPopup>
  )
}
