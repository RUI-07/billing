import React, {useEffect, useState} from 'react'
import {Popup, Cell, PopupProps} from 'react-vant'

interface FullScreenPopupProps extends PopupProps {
  triggerHash: string
}
export const FullScreenPopup = (props: FullScreenPopupProps) => {
  const {triggerHash, style, children, ...other} = props
  const [visible, setVisible] = useState(window.location.hash === triggerHash)

  useEffect(() => {
    const handler = (e: HashChangeEvent) => {
      setVisible(window.location.hash === triggerHash)
    }
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [triggerHash])

  return (
    <Popup {...other} visible={visible} style={{...style, width: '100%', height: '100%'}}>
      {children}
    </Popup>
  )
}
