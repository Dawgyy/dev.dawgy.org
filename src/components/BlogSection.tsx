import React from 'react';
import { useEffect } from 'react';
import Link from 'next/link';

type BlogPost = {
  slug: string;
  title: string;
  date?: string;
  resume: string;
};

interface BlogSectionProps {
  blogPosts: BlogPost[];
}

export function BlogSection({ blogPosts }: BlogSectionProps) {
  useEffect(() => {
    const fetchViews = async () => {
      const updatedViews: { [key: string]: number } = {};

      await Promise.all(
        blogPosts.map(async (post) => {
          try {
            const res = await fetch(`/api/view/${post.slug}`);
            const data = await res.json();
            updatedViews[post.slug] = data.views || 0;
          } catch (error) {
            console.error(`Failed to fetch views for ${post.slug}`, error);
            updatedViews[post.slug] = 0;
          }
        }),
      );
    };

    fetchViews();
  }, [blogPosts]);
  return (
    <section className="mt-12">
      <h3 className="text-2xl font-bold mb-6 text-white">blog</h3>
      {blogPosts.map((post) => (
        <div key={post.slug} className="mb-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-1">
            <Link
              href={`/blog/${post.slug}`}
              className="text-lg text-white hover:underline"
            >
              {post.title}
            </Link>
            <p className="text-blue-300 text-opacity-60 mt-1 md:mt-0">
              {post.date}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
