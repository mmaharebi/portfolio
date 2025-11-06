export function generateArticleJsonLd({
  headline,
  description,
  datePublished,
  authorName,
}: {
  headline: string;
  description: string;
  datePublished: string;
  authorName: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    datePublished,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Portfolio Blog',
    },
  };
}
