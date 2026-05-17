import { useEffect } from 'react';

const SITE = 'Alex Gerard';
const BASE_URL = 'https://dev.dawgy.org';
const DEFAULT_DESC =
  'Alex Gerard — IT Consultant & Developer based in Belgium. A living index of selected work, writing and projects.';
const DEFAULT_IMAGE = `${BASE_URL}/moi.jpeg`;

interface SeoOptions {
  /** Page title — appended with the site name. Omit on the home page. */
  title?: string;
  description?: string;
  /** Path used to build the canonical URL, e.g. "/blog/emacs". */
  path?: string;
  image?: string;
  type?: 'website' | 'article';
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
  image = DEFAULT_IMAGE,
  type = 'website',
}: SeoOptions) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} — ${SITE}`
      : `${SITE} — IT Consultant & Developer`;
    const url = `${BASE_URL}${path}`;

    document.title = fullTitle;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[property="og:image"]', 'content', image);
    setMeta('meta[property="og:type"]', 'content', type);
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'content', fullTitle);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:image"]', 'content', image);
    setLink('canonical', url);
  }, [title, description, path, image, type]);
}
