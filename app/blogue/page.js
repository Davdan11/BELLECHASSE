import EditorialNavbar from '../../components/EditorialNavbar';
import EditorialFooterFull from '../../components/EditorialFooterFull';
import BlogHero from '../../components/BlogHero';
import BlogList from '../../components/BlogList';
import BlogCTA from '../../components/BlogCTA';
import { getPostSummaries, SITE_URL } from '../../lib/blog';

export const metadata = {
  title: 'Blogue : conseils thermopompe, chauffage et climatisation',
  description:
    "Le journal Bellechasse : des conseils clairs pour choisir, entretenir et mieux comprendre votre thermopompe, votre climatisation et votre chauffage au Québec.",
  alternates: {
    canonical: `${SITE_URL}/blogue`,
  },
  openGraph: {
    title: 'Le journal Bellechasse | Conseils chauffage et climatisation',
    description:
      'Des conseils et des repères pour choisir, entretenir et mieux connaître votre système.',
    url: `${SITE_URL}/blogue`,
    type: 'website',
  },
};

export default function BloguePage() {
  const posts = getPostSummaries();

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE_URL}/blogue#blog`,
    url: `${SITE_URL}/blogue`,
    name: 'Le journal Bellechasse',
    description: metadata.description,
    inLanguage: 'fr-CA',
    publisher: { '@id': `${SITE_URL}/#organization` },
    blogPost: posts.slice(0, 20).map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${SITE_URL}${p.url}`,
      datePublished: p.date,
      image: `${SITE_URL}${p.image}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <EditorialNavbar theme="light" />
      <main>
        <BlogHero />
        <BlogList posts={posts} />
        <BlogCTA />
      </main>
      <EditorialFooterFull />
    </>
  );
}
