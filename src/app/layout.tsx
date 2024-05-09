import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '指针的 CD 架',
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
