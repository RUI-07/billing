import {FullScreenPopup} from '@/components/ui/FullScreenPopup'
import {Typography} from 'react-vant'
import {CustomerList} from '../CustomerList'
import {Customer} from '@prisma/client'
import {Cross} from '@react-vant/icons'
import Styles from './index.module.css'

interface CustomerPickerProps {
  value?: Customer
  onChange?: (value: Customer | undefined) => void
  placeholder?: string
}
export const CustomerPicker = (props: CustomerPickerProps) => {
  const {value, onChange, placeholder} = props

  return (
    <>
      <div className={Styles.flexWrap}>
        <a href="#customer" className={Styles.link}>
          {value?.name === undefined ? (
            <Typography.Text type="secondary">{placeholder}</Typography.Text>
          ) : (
            <Typography.Text>{value?.name}</Typography.Text>
          )}
        </a>
        {value ? (
          <a
            onClick={e => {
              e.preventDefault()
              onChange?.(undefined)
            }}
            className={Styles.cancel}
          >
            <Cross style={{verticalAlign: 'center'}} />
          </a>
        ) : null}
      </div>
      <FullScreenPopup position="right" triggerHash="#customer">
        <CustomerList
          selectable
          onSelect={item => {
            window.location.hash = ''
            onChange?.(item)
          }}
        />
      </FullScreenPopup>
    </>
  )
}
