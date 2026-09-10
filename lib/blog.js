import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blogue');

import { SITE_URL } from './site';
export { SITE_URL };

export const CATEGORIES = {
  thermopompes: 'Thermopompes',
  entretien: 'Entretien',
  chauffage: 'Chauffage',
  financement: 'Financement',
  conseils: 'Conseils',
};

export const FILTERS = ['thermopompes', 'entretien', 'chauffage', 'financement'];

function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function readingTime(markdown) {
  const words = markdown.replace(/[#>*_`\-\[\]()]/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(iso) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('fr-CA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function decodeEntities(text) {
  return text
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function toIsoDate(value) {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  const s = String(value).trim();
  return /^\d{4}-\d{2}-\d{2}/.test(s) ? s.slice(0, 10) : null;
}

function addHeadingIds(html) {
  return html.replace(/<h([23])>(.*?)<\/h\1>/g, (m, level, inner) => {
    const text = decodeEntities(inner.replace(/<[^>]+>/g, ''));
    return `<h${level} id="${slugify(text)}">${inner}</h${level}>`;
  });
}

function toPost(file) {
  const slug = file.replace(/\.md$/, '');
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
  const { data, content } = matter(raw);
  const category = CATEGORIES[data.category] ? data.category : 'conseils';

  return {
    slug,
    url: `/blogue/${slug}`,
    title: data.title || slug,
    excerpt: data.excerpt || '',
    description: data.description || data.excerpt || '',
    category,
    categoryLabel: CATEGORIES[category],
    tags: Array.isArray(data.tags) ? data.tags : [],
    date: toIsoDate(data.date) || '1970-01-01',
    updated: toIsoDate(data.updated),
    author: data.author || 'Bellechasse Énergie',
    image: data.image || '/hero.jpg',
    metaTitle: data.metaTitle || data.title,
    imageAlt: data.imageAlt || data.title || '',
    imageFit: data.imageFit || 'cover',
    featured: Boolean(data.featured),
    video: data.video || null,
    faq: Array.isArray(data.faq) ? data.faq : [],
    readingTime: readingTime(content),
    content,
  };
}

export function getAllPosts() {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.md') && f.toLowerCase() !== 'readme.md')
    .map(toPost)
    .filter((p) => p.title && p.date !== '1970-01-01')
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Lightweight version safe to pass to client components (no markdown body). */
export function getPostSummaries() {
  return getAllPosts().map(({ content, ...rest }) => rest);
}

export function getPostBySlug(slug) {
  const file = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const post = toPost(`${slug}.md`);
  const html = addHeadingIds(marked.parse(post.content, { gfm: true, breaks: false }));
  return { ...post, html };
}

export function getRelatedPosts(post, limit = 3) {
  const all = getPostSummaries().filter((p) => p.slug !== post.slug);
  const score = (p) =>
    (p.category === post.category ? 2 : 0) + p.tags.filter((t) => post.tags.includes(t)).length;
  return all.sort((a, b) => score(b) - score(a) || (a.date < b.date ? 1 : -1)).slice(0, limit);
}
