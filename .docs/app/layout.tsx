import type { Metadata } from 'next';
import Script from 'next/script';

import {
  DOCS_AUTHOR,
  DOCS_SITE_DESCRIPTION,
  DOCS_SITE_NAME,
  DOCS_SITE_URL,
  buildDocMetadata,
} from '../lib/seo';

import './globals.css';

const SITE_ICON_URL = `${DOCS_SITE_URL}/icon.png`;

export const metadata: Metadata = {
  metadataBase: new URL(DOCS_SITE_URL),
  applicationName: DOCS_SITE_NAME,
  title: DOCS_SITE_NAME,
  description: DOCS_SITE_DESCRIPTION,
  keywords: [
    'ClawLess',
    'ClawLess Docs',
    'documentation',
    'Vercel',
    'Next.js',
    'AI agent',
  ],
  authors: [{ name: DOCS_AUTHOR }],
  creator: DOCS_AUTHOR,
  publisher: DOCS_AUTHOR,
  category: 'documentation',
  icons: {
    icon: SITE_ICON_URL,
    shortcut: SITE_ICON_URL,
    apple: SITE_ICON_URL,
  },
  ...buildDocMetadata({
    description: DOCS_SITE_DESCRIPTION,
    canonical: DOCS_SITE_URL,
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            (function () {
              var storageKey = 'claw-less-docs-theme';
              var stored = localStorage.getItem(storageKey);
              var theme = stored === 'light' || stored === 'dark'
                ? stored
                : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
              document.documentElement.dataset.theme = theme;
            })();
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
