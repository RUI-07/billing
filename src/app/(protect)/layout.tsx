import {cookieJwtCheck} from '@/util/cookieJwtCheck'
import {redirect} from 'next/navigation'
import {HomeTabbar} from './components/HomeTabbar'

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
    <main>
      {children}
      <HomeTabbar />
    </main>
  )
}
