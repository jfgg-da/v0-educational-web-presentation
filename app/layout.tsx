import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Geist_Mono, Raleway, Montserrat, Nunito, Nunito_Sans, Roboto } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import contentConfig from '@/lib/content.config'

const plusJakartaSans = Nunito_Sans({ 
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap',
})

const geistMono = Roboto({ 
  subsets: ["latin"],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: contentConfig.meta.title,
  description: contentConfig.meta.subtitle,
  generator: 'v0.app',
  authors: contentConfig.meta.authors.map(a => ({ name: a.name })),
  keywords: ['educación', 'competencias digitales', 'universidad', 'aprendizaje', 'ODC'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0F172A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang={contentConfig.meta.language} className="bg-background">
      <body className={`${plusJakartaSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
