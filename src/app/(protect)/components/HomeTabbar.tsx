'use client'
import {CashOnDeliver, ChartTrendingO, FriendsO, Records, UserCircleO} from '@react-vant/icons'
import {useRouter} from 'next/navigation'
import {Tabbar} from 'react-vant'

export const HomeTabbar = () => {
  const router = useRouter()
  const page = window.location.pathname.split('/')[1]
  return (
    <Tabbar
      defaultValue={page}
      onChange={v => {
        v && router.push('/' + v)
      }}
    >
      <Tabbar.Item name="bookkeeping" icon={<Records />}>
        记账
      </Tabbar.Item>
      <Tabbar.Item name="ledger" icon={<CashOnDeliver />}>
        总帐本
      </Tabbar.Item>
      <Tabbar.Item name="customer" icon={<FriendsO />}>
        客户
      </Tabbar.Item>
      <Tabbar.Item name="statistics" icon={<ChartTrendingO />}>
        查询统计
      </Tabbar.Item>
      <Tabbar.Item name="my" icon={<UserCircleO />}>
        我的
      </Tabbar.Item>
    </Tabbar>
  )
}
