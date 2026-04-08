import type { Metadata } from 'next';

import { DocsShell } from '../components/docs-shell';
import { getDocBySlug } from '../lib/docs';
import {
  DOCS_SITE_DESCRIPTION,
  DOCS_SITE_URL,
  buildDocMetadata,
} from '../lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const home = getDocBySlug([]);

  if (!home) {
    return buildDocMetadata({
      description: DOCS_SITE_DESCRIPTION,
      canonical: DOCS_SITE_URL,
    });
  }

  return buildDocMetadata({
    description: home.description,
    canonical: DOCS_SITE_URL,
  });
}

export default function HomePage() {
  const home = getDocBySlug([]);

  if (!home) {
    throw new Error('Missing index.md in .docs/content.');
  }

  return <DocsShell currentDoc={home} />;
}
