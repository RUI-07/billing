import React, {ReactElement, cloneElement, useState} from 'react'
import {ActionSheet, ActionSheetProps} from 'react-vant'

interface ActionSheetTriggerProps extends Omit<ActionSheetProps, 'visible'> {
  children: ReactElement
}
export const ActionSheetTrigger = (props: ActionSheetTriggerProps) => {
  const {children, onClose, onSelect, ...others} = props
  const [visible, setVisible] = useState(false)

  return (
    <>
      {cloneElement(children, {
        onClick: (...args: any[]) => {
          children?.props.onClick?.(...args)
          setVisible(true)
        },
      })}
      <ActionSheet
        visible={visible}
        {...others}
        onClose={() => {
          setVisible(false)
          onClose?.()
        }}
        onSelect={(...args) => {
          onSelect?.(...args)
          setVisible(false)
        }}
      />
    </>
  )
}
