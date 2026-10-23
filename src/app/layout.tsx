import type { Metadata, Viewport } from 'next';
import { Bodoni_Moda, Hanken_Grotesk } from 'next/font/google';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { site } from '@/site.config';
import './globals.css';

// шрифты темы: меняются вместе с tokens.css, имена переменных --ff-display и --ff-body не трогать
// Bodoni — высокий контраст штрихов, как резьба по камню; на крупных кеглях держит оптический размер
const display = Bodoni_Moda({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--ff-display',
  display: 'swap',
});

const body = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--ff-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}, ${site.tagline.toLowerCase()}`, template: `%s | ${site.name}` },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: site.locale,
    siteName: site.name,
    title: site.name,
    description: site.description,
    images: [{ url: site.ogImage, width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#eee8dd',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={site.lang} className={`${display.variable} ${body.variable}`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
