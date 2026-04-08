import { notFound } from 'next/navigation';

import { DocsShell } from '../../components/docs-shell';
import { getDocBySlug, getDocSummaries } from '../../lib/docs';
import { DOCS_SITE_NAME, buildDocMetadata, getDocUrl } from '../../lib/seo';

type PageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export function generateStaticParams() {
  return getDocSummaries()
    .filter((doc) => doc.slug.length > 0)
    .map((doc) => ({
      slug: doc.slug,
    }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);

  if (!doc) {
    return buildDocMetadata({
      description: 'ClawLess documentation.',
      canonical: getDocUrl(slug),
    });
  }

  return buildDocMetadata({
    title: `${doc.title} | ${DOCS_SITE_NAME}`,
    description: doc.description,
    canonical: getDocUrl(slug),
  });
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;
  const currentDoc = getDocBySlug(slug);

  if (!currentDoc) {
    notFound();
  }

  return <DocsShell currentDoc={currentDoc} />;
}
