import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/lib/site';

const inter = Inter({
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
  variable: '--font-sans'
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'ООО «Элтехника» — поставка электрооборудования для объектов энергетики и строительства',
    template: '%s | ООО «Элтехника»'
  },
  description: siteConfig.description,
  openGraph: {
    title: 'ООО «Элтехника»',
    description: siteConfig.description,
    type: 'website',
    locale: 'ru_RU',
    url: '/'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} bg-background font-sans text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}
