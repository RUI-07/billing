'use client'
import {PrecisionPicker} from '@/components/config/PrecisionPicker'
import {Cell} from 'react-vant'

const My = () => {
  return (
    <div>
      <Cell title="数字精度" label="四舍五入保留位数" value={<PrecisionPicker />} isLink />
    </div>
  )
}

export default My
