import { useEffect } from 'react';

const SITE = 'Alex Gerard';
const BASE_URL = 'https://dev.dawgy.org';
const DEFAULT_DESC =
  'Alex Gerard — IT Consultant & Developer based in Belgium. A living index of selected work, writing and projects.';
interface SeoOptions {
  /** Page title — appended with the site name. Omit on the home page. */
  title?: string;
  description?: string;
  /** Path used to build the canonical URL, e.g. "/blog/emacs". */
  path?: string;
  /** Explicit OG image URL — otherwise derived from the path. */
  image?: string;
  type?: 'website' | 'article';
}

/** Maps a route path to its pre-rendered OG image (see scripts/generate-og.mjs). */
function ogImageForPath(path: string): string {
  const clean = path.replace(/^\/|\/$/g, '');
  let name = 'default';
  if (clean === 'work') name = 'work';
  else if (clean === 'blog') name = 'writing';
  else if (clean === 'about') name = 'about';
  else if (clean.startsWith('blog/')) name = `blog-${clean.slice(5)}`;
  else if (clean.startsWith('work/')) name = `work-${clean.slice(5)}`;
  else if (clean.startsWith('projects/')) name = `project-${clean.slice(9)}`;
  return `${BASE_URL}/og/${name}.png`;
}

function setMeta(selector: string, attr: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    const [key, val] = selector.replace(/meta\[|\]/g, '').split('=');
    el.setAttribute(key, val.replace(/['"]/g, ''));
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Drives document <title> and social/SEO meta tags per route.
 * Plain DOM updates — no extra dependency, runs after render.
 */
export function useSeo({
  title,
  description = DEFAULT_DESC,
  path = '/',
  image,
  type = 'website',
}: SeoOptions) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} — ${SITE}`
      : `${SITE} — IT Consultant & Developer`;
    const url = `${BASE_URL}${path}`;
    const ogImage = image ?? ogImageForPath(path);

    document.title = fullTitle;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[property="og:image"]', 'content', ogImage);
    setMeta('meta[property="og:type"]', 'content', type);
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'content', fullTitle);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:image"]', 'content', ogImage);
    setLink('canonical', url);
  }, [title, description, path, image, type]);
}
