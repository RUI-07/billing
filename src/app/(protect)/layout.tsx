import {cookieJwtCheck} from '@/util/cookieJwtCheck'
import {redirect} from 'next/navigation'

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
  return children
}
