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
  const {initialValue, onChange, ...others} = props
  const [value, setValue] = useState(initialValue)

  const handleVisibleChange = (visible: boolean) => {
    if (visible && value !== initialValue) {
      setValue(initialValue)
    }
  }

  const handleChange = (val: string) => {
    setValue(val)
    onChange?.(val)
  }

  const handleCopy = () => {
    copy(value || '')
    Toast.info('复制成功')
  }

  return (
    <FullScreenPopup {...others} position="right" onVisibleWillChange={handleVisibleChange}>
      <div className={Styles.content}>
        <div style={{textAlign: 'center'}}>
          <Typography.Title level={2}>信息内容</Typography.Title>
        </div>
        <div className={Styles['textarea-wrap']}>
          <Input.TextArea value={value} onChange={handleChange} autoSize={{minHeight: 300}} />
        </div>
        <div className={Styles.footer}>
          <Button type="primary" block round onClick={handleCopy}>
            复制
          </Button>
        </div>
      </div>
    </FullScreenPopup>
  )
}
