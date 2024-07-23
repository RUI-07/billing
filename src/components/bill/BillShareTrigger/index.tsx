import {ActionSheetTrigger} from '@/components/ui/ActionSheetTrigger'
import {ActionSheetProps} from 'react-vant'
import {useBillTextEdit} from '../BillTextEditPopup/useBillTextEdit'
import {useImagePopup} from '../BillImagePopup/useImagePopup'
import {BillTextEditPopup} from '../BillTextEditPopup'
import {BillImagePopup} from '../BillImagePopup'
import {ReactElement} from 'react'

interface BillShareTriggerProps {
  date: Date
  billItems: {
    name: string
    quantity: string
    price: string
  }[]
  children: ReactElement
}
export const BillShareTrigger = (props: BillShareTriggerProps) => {
  const {date, billItems, children} = props
  const {editBillText, props: textEditProps} = useBillTextEdit()
  const {showBillImage, props: showImageProps} = useImagePopup()

  const handleAction: ActionSheetProps['onSelect'] = action => {
    switch (action.name) {
      case '发文字': {
        editBillText(date, billItems)
        break
      }
      case '发图片': {
        showBillImage(date, billItems)
        break
      }
    }
  }

  return (
    <>
      <ActionSheetTrigger actions={[{name: '发图片'}, {name: '发文字'}]} onSelect={handleAction} cancelText="取消">
        {children}
      </ActionSheetTrigger>
      <BillTextEditPopup {...textEditProps} />
      <BillImagePopup {...showImageProps} />
    </>
  )
}
