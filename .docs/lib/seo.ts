import type { Metadata } from 'next';

export const DOCS_SITE_NAME = 'ClawLess Docs';
export const DOCS_SITE_URL = 'https://niapya.github.io/clawless';
export const DOCS_SITE_DESCRIPTION =
  'Documentation for ClawLess, a free AI agent deployed on Vercel.';
export const DOCS_OG_IMAGE = `${DOCS_SITE_URL}/images/preview.png`;
export const DOCS_KEYWORDS = [
  'ClawLess',
  'ClawLess Docs',
  'AI agent',
  'Vercel',
  'Next.js',
  'documentation',
  'chat',
  'memory',
  'skills',
  'channels',
];
export const DOCS_AUTHOR = 'ClawLess Team';

export function getDocUrl(slug: string[]): string {
  if (slug.length === 0) {
    return DOCS_SITE_URL;
  }

  return `${DOCS_SITE_URL}/${slug.join('/')}`;
}

export function buildDocMetadata(input: {
  title?: string;
  description: string;
  canonical: string;
}): Metadata {
  const pageTitle = input.title ?? DOCS_SITE_NAME;

  return {
    ...(input.title ? { title: input.title } : {}),
    description: input.description,
    keywords: DOCS_KEYWORDS,
    alternates: {
      canonical: input.canonical,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: input.canonical,
      siteName: DOCS_SITE_NAME,
      title: pageTitle,
      description: input.description,
      images: [
        {
          url: DOCS_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: DOCS_SITE_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: input.description,
      images: [DOCS_OG_IMAGE],
    },
  };
}
