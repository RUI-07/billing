import {useCallback, useInsertionEffect, useRef} from 'react'

export const useEffectEvent = <T extends any[], U extends any>(fn: (...args: T) => U) => {
  const ref = useRef(fn)
  useInsertionEffect(() => {
    ref.current = fn
  }, [fn])
  return useCallback((...args: T) => {
    const f = ref.current
    return f(...args)
  }, [])
}
