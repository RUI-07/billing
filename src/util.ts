import {Toast} from 'react-vant'

interface Result {
  success: number
  msg?: string
}

export const toastResult = (result: Result) => {
  if (!result.msg) return
  if (result.success) {
    Toast.success(result.msg)
  } else {
    Toast.fail(result.msg)
  }
}
