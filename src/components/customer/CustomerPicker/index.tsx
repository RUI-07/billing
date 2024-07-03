import {FullScreenPopup} from '@/components/ui/FullScreenPopup'
import {Typography} from 'react-vant'
import {CustomerList} from '../CustomerList'
import {Customer} from '@prisma/client'

interface CustomerPickerProps {
  value?: Customer
  onChange?: (value: Customer) => void
  placeholder?: string
}
export const CustomerPicker = (props: CustomerPickerProps) => {
  const {value, onChange, placeholder} = props

  return (
    <>
      <a href="#customer" style={{width: '100%', display: 'inline-block'}}>
        {value?.name === undefined ? (
          <Typography.Text type="secondary">{placeholder}</Typography.Text>
        ) : (
          <Typography.Text>{value?.name}</Typography.Text>
        )}
      </a>
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
