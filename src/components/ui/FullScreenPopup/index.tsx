import {useEffectEvent} from '@/hooks/useEffectEvent'
import React, {useEffect, useState} from 'react'
import {Popup, PopupProps} from 'react-vant'

export interface FullScreenPopupProps extends Omit<PopupProps, 'visible'> {
  triggerHash: string
  onVisibleWillChange?: (visible: boolean) => void
}
export const FullScreenPopup = (props: FullScreenPopupProps) => {
  const {triggerHash, style, children, onVisibleWillChange, ...other} = props
  const [visible, setVisible] = useState(false)

  const handler = useEffectEvent(() => {
    const val = window.location.hash === triggerHash
    onVisibleWillChange?.(val)
    setVisible(val)
  })

  useEffect(() => {
    handler()
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [handler])

  return (
    <Popup
      {...other}
      visible={visible}
      style={{...style, width: '100%', height: '100%', background: 'var(--page-background)'}}
    >
      {children}
    </Popup>
  )
}
