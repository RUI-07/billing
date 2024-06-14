import Link from 'next/link'
import Styles from './index.module.css'
import {Plus} from '@react-vant/icons'

export const AddCustomer = () => {
  return (
    <Link href="/customer/create">
      <div className={Styles.add}>
        <Plus />
      </div>
    </Link>
  )
}
