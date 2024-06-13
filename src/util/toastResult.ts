import {ActionResult, ResultCode} from '@/type'
import {Toast} from 'react-vant'

export const toastResult = (result: ActionResult) => {
  if (!result.msg) return
  if (result.code === ResultCode.SUCCESS) {
    Toast.success(result.msg)
  } else {
    Toast.fail(result.msg)
  }
}
