'use client'
import {CashOnDeliver, ChartTrendingO, FriendsO, Records, UserCircleO} from '@react-vant/icons'
import {usePathname, useRouter} from 'next/navigation'
import {useEffect} from 'react'
import {Tabbar, TabbarProps} from 'react-vant'

const items = [
  {name: 'bookkeeping', icon: <Records />, title: '记账'},
  {name: 'ledger', icon: <CashOnDeliver />, title: '总帐本'},
  {name: 'customer', icon: <FriendsO />, title: '客户'},
  {name: 'statistics', icon: <ChartTrendingO />, title: '查询统计'},
  {name: 'my', icon: <UserCircleO />, title: '我的'},
]

export const HomeTabbarClient = (props: TabbarProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const firstPath = pathname.split('/').slice(1)[0]

  useEffect(() => {
    items.forEach(item => router.prefetch('/' + item.name))
  }, [router])

  return (
    <Tabbar
      {...props}
      value={firstPath}
      onChange={v => {
        v && router.push('/' + v)
      }}
    >
      {items.map(item => {
        return (
          <Tabbar.Item key={item.name} name={item.name} icon={item.icon}>
            {item.title}
          </Tabbar.Item>
        )
      })}
    </Tabbar>
  )
}
