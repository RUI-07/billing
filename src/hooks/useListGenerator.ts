import {useCallback, useRef, useState} from 'react'

export function useListGenerator<T extends any[], U extends AsyncGenerator<V[], void, void>, V>(
  createGenerator: (...args: T) => U,
  defaultParams: T,
  options?: {
    defaultList?: V[]
  },
): {
  list: V[]
  loadingMore: boolean
  loadMore: () => Promise<V[] | undefined>
  reload: (...args: T) => Promise<V[] | undefined>
  done: boolean
} {
  const {defaultList} = options || {}

  const [list, setList] = useState(defaultList || [])
  const [generator, setGenerator] = useState(createGenerator(...defaultParams))
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const generatorRef = useRef(generator)
  const loadMore = useCallback(async () => {
    setLoading(true)
    const {value, done} = await generatorRef.current.next()
    if (!done) {
      setList(v => [...v, ...value])
      return value
    } else {
      setDone(true)
    }
    setLoading(false)
  }, [])

  const reload = async (...args: T) => {
    const newGenerator = createGenerator(...args)
    generatorRef.current = newGenerator
    setGenerator(newGenerator)
    setDone(false)
    return loadMore()
  }

  return {
    list,
    loadingMore: loading,
    loadMore,
    reload,
    done,
  }
}
