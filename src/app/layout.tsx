import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'KeyGen - 智能密码生成器',
  description: '安全、简单、高效的密码生成解决方案。支持多种密码类型，实时强度评估，本地隐私保护。',
  keywords: ['密码生成器', '密码', '安全', '加密', 'password generator', 'security'],
  authors: [{ name: 'KeyGen Team' }],
  creator: 'KeyGen',
  publisher: 'KeyGen',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://your-domain.com',
    title: 'KeyGen - 智能密码生成器',
    description: '安全、简单、高效的密码生成解决方案',
    siteName: 'KeyGen',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KeyGen - 智能密码生成器',
    description: '安全、简单、高效的密码生成解决方案',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 min-h-screen`}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-F6PSBW19GX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F6PSBW19GX');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
} 