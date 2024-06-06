import {ActionResult} from '@/type'
import {Toast} from 'react-vant'

export const toastResult = (result: ActionResult) => {
  if (!result.msg) return
  if (result.code !== 0) {
    Toast.success(result.msg)
  } else {
    Toast.fail(result.msg)
  }
}
