import type {Metadata} from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '记账发单',
  description: '简单的记账发单小应用',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
