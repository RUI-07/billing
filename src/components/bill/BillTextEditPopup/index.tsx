import {FullScreenPopup, FullScreenPopupProps} from '@/components/ui/FullScreenPopup'
import {useState} from 'react'
import {Button, Input, Toast, Typography} from 'react-vant'
import Styles from './index.module.css'
import copy from 'copy-text-to-clipboard'

interface BillTextEditPopupProps extends FullScreenPopupProps {
  initialValue?: string
  onChange?: (value: string) => void
}
export const BillTextEditPopup = (props: BillTextEditPopupProps) => {
  const {initialValue, onChange, visible, ...others} = props
  const [value, setValue] = useState(initialValue)

  if (!visible && value !== initialValue) {
    setValue(initialValue)
  }

  return (
    <FullScreenPopup {...others} visible={visible} position="right">
      <div className={Styles.content}>
        <div style={{textAlign: 'center'}}>
          <Typography.Title level={2}>信息内容</Typography.Title>
        </div>
        <div className={Styles['textarea-wrap']}>
          <Input.TextArea value={value} onChange={onChange} autoSize={{minHeight: 300}} />
        </div>
        <div className={Styles.footer}>
          <Button
            type="primary"
            block
            round
            onClick={() => {
              copy(value || '')
              Toast.info('复制成功')
            }}
          >
            复制
          </Button>
        </div>
      </div>
    </FullScreenPopup>
  )
}
