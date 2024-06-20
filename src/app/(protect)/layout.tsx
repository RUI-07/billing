import {cookieJwtCheck} from '@/util/cookieJwtCheck'
import {redirect} from 'next/navigation'
import {HomeTabbar} from './components/HomeTabbar'
import Styles from './index.module.css'

const isLogin = async () => {
  return cookieJwtCheck()
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (!(await isLogin())) {
    redirect('/login')
  }
  return (
    <main className={Styles['page-wrap']}>
      {children}
      <HomeTabbar />
    </main>
  )
}
