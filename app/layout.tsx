import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'

import './globals.css'
import styles from './layout.module.css'

// TODO ssr antd 样式有延迟，页面闪烁

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className={styles.main}>
          <Suspense>{children}</Suspense>
        </main>
      </body>
    </html>
  )
}
