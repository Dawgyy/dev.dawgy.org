import { describe, it, expect } from 'vitest';
import { getAllContent, getContentBySlug, getAdjacent } from './content';

describe('content loading', () => {
  it('loads work engagements', () => {
    const work = getAllContent('work');
    expect(work.length).toBeGreaterThan(0);
    for (const w of work) {
      expect(w.slug).toBeTruthy();
      expect(w.title).toBeTruthy();
    }
  });

  it('loads blog posts', () => {
    expect(getAllContent('blog').length).toBeGreaterThan(0);
  });

  it('every entry has a unique slug', () => {
    const slugs = getAllContent('projects').map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('resolves an entry by slug, and null for an unknown one', () => {
    const first = getAllContent('blog')[0];
    expect(getContentBySlug('blog', first.slug)?.slug).toBe(first.slug);
    expect(getContentBySlug('blog', 'does-not-exist')).toBeNull();
  });
});

describe('getAdjacent', () => {
  it('returns siblings around an entry', () => {
    const blog = getAllContent('blog');
    const middle = blog[1];
    const { prev, next } = getAdjacent('blog', middle.slug);
    expect(prev?.slug).toBe(blog[0].slug);
    expect(next?.slug).toBe(blog[2]?.slug ?? undefined);
  });

  it('has no prev for the first entry', () => {
    const blog = getAllContent('blog');
    expect(getAdjacent('blog', blog[0].slug).prev).toBeNull();
  });

  it('respects a category filter for projects', () => {
    const personal = getAllContent('projects').filter(
      (p) => p.category === 'Personal',
    );
    const { prev, next } = getAdjacent(
      'projects',
      personal[0].slug,
      (p) => p.category === 'Personal',
    );
    for (const ref of [prev, next]) {
      if (ref) {
        expect(personal.some((p) => p.slug === ref.slug)).toBe(true);
      }
    }
  });
});
