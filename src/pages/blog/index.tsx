import { useEffect, useState } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  resume: string;
}

interface BlogPageProps {
  blogPosts: BlogPost[];
}

export default function BlogPage({ blogPosts }: BlogPageProps) {
  const [views, setViews] = useState<{ [key: string]: number }>({});

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
        })
      );

      setViews(updatedViews);
    };

    fetchViews();
  }, [blogPosts]);

  return (
    <div className="max-w-container mx-auto px-4">
      <main className="py-6">
        <h1 className="text-4xl font-bold mb-6">Tous les articles de blog</h1>
        {blogPosts.map((post) => (
          <div key={post.slug} className="mb-3">
            <a href={`/blog/${post.slug}`} className="text-lg font-semibold hover:underline">
              {post.title}
            </a>
            <p className="text-blue-300 text-opacity-60 m-0">{post.date} • <FontAwesomeIcon icon={faEye} className="text-blue-300 text-opacity-60 w-5 h-5" /> {views[post.slug] || 0} vues</p>
            <p className="m-0 text-gray-400">{post.resume}</p>
          </div>
        ))}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const blogDirectory = path.join(process.cwd(), 'src/content/blog');
  const blogFiles = fs.readdirSync(blogDirectory);

  const blogPosts = blogFiles
    .map((filename) => {
      const filePath = path.join(blogDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      return {
        slug: filename.replace('.md', ''),
        resume: data.resume,
        title: data.title,
        date: data.date,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return {
    props: {
      blogPosts,
    },
  };
}
