import type { Metadata, Viewport } from 'next';
import { Newsreader, Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { site } from '@/lib/site';
import './globals.css';

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: `${site.hook} — ${site.description}`,
  keywords: [
    'file organizer',
    'cli',
    'electron',
    'npm',
    'local-first',
    'privacy',
    'rollback',
    'directory cleaner',
    'duplicate finder',
    'AI SOP',
  ],
  authors: [{ name: site.author.name, url: site.url }],
  creator: site.author.name,
  publisher: site.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: `${site.hook} — ${site.description}`,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.tagline}`,
    description: `${site.hook} — ${site.description}`,
    images: ['/og.png'],
  },
  alternates: { canonical: site.url },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/icon', type: 'image/png', sizes: '32x32' },
      { url: '/favicon.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: dark)' },
      { url: '/favicon-light.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: light)' },
    ],
    apple: '/icon',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0d0b0a' },
    { media: '(prefers-color-scheme: light)', color: '#faf8f3' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

/* Inline pre-hydration script — sets data-theme before paint to avoid flash.
   Reads localStorage first, falls back to prefers-color-scheme, defaults dark. */
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-text focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
