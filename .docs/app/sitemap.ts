import fs from 'node:fs';
import path from 'node:path';

import type { MetadataRoute } from 'next';

import { getDocSummaries } from '../lib/docs';
import { DOCS_SITE_URL, getDocUrl } from '../lib/seo';

export const dynamic = 'force-static';

const contentDirectory = path.join(process.cwd(), 'content');

function getDocLastModified(slug: string[]): Date | undefined {
  const relativePath = slug.length === 0 ? 'index.md' : `${slug.join('/')}.md`;
  const filePath = path.join(contentDirectory, relativePath);

  if (!fs.existsSync(filePath)) {
    return undefined;
  }

  return fs.statSync(filePath).mtime;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return getDocSummaries().map((doc) => ({
    url: doc.slug.length === 0 ? DOCS_SITE_URL : getDocUrl(doc.slug),
    lastModified: getDocLastModified(doc.slug),
  }));
}
