import {HomeTabbarClient} from './HomeTabbarClient'
import {headers} from 'next/headers'

export const HomeTabbar = () => {
  const path = headers().get('x-current-path') || ''
  const page = path.split('/')[1]

  return <HomeTabbarClient defaultValue={page} />
}
