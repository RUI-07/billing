'use client'
import {useState} from 'react'
import {Picker} from 'react-vant'

interface PrecisionPickerProps {
  value?: string
  onChange?: (value: string) => void
  defaultValue?: string
}
export const PrecisionPicker = (props: PrecisionPickerProps) => {
  const {value = '2', onChange} = props
  const [visible, setVisible] = useState(false)

  return (
    <>
      <a onClick={() => setVisible(true)}>保留{value}位小数</a>
      <Picker
        popup
        title="数字精度"
        visible={visible}
        onClose={() => setVisible(false)}
        value={value}
        onConfirm={(v: string) => v && onChange?.(v)}
        placeholder=""
        columns={[
          {text: '保留1位小数', value: '1'},
          {text: '保留2位小数', value: '2'},
          {text: '保留3位小数', value: '3'},
        ]}
      />
    </>
  )
}
