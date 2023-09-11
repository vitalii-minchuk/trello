import type { Metadata } from 'next'
import './globals.css'

import { Navbar } from '@/components/navbar.component'
import { ReactQueryProvider } from '@/providers'

export const metadata: Metadata = {
  title: 'Trello clone',
  description: 'Trello clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='dark bg-gray-900'>
        <ReactQueryProvider>
          <Navbar />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  )
}
