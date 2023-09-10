import type { Metadata } from 'next'
import './globals.css'

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
        {children}
      </body>
    </html>
  )
}
