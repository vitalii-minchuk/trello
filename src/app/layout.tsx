import { Navbar } from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'

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
      <body className='dark'>
      <Navbar />
        {children}
      </body>
    </html>
  )
}
