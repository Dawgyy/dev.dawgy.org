import React from 'react';
import { ExperienceSection } from '../components/ExperienceSection';
import { ProjectSection } from '../components/ProjectSection';
import { BlogSection } from '../components/BlogSection';
import { LinksSection } from '../components/LinksSection';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Image from 'next/image';

interface PostItem {
  slug: string;
  title: string;
  date?: string;
  resume: string;
}

interface BlogPost extends PostItem {
  resume: string;
}

interface HomePageProps {
  workItems: PostItem[];
  projectItems: PostItem[];
  blogPosts: BlogPost[];
}

export default function Home({
  workItems,
  projectItems,
  blogPosts,
}: HomePageProps) {
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <div className="container max-w-6xl mx-auto px-4">
      <header className="py-10">
        <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-12">
          <div className="relative w-48 h-48 lg:w-56 lg:h-56 group">
            <Image
              src="/moi.jpeg"
              alt="Votre photo"
              width={224}
              height={224}
              className="w-full h-full object-cover rounded-lg border-4 border-white shadow-lg transform transition-transform duration-300 ease-in-out rotate-90 group-hover:rotate-[96deg]"
            />
            <div className="absolute inset-0 w-full h-full rounded-lg border-4 border-blue-300 transform rotate-6 pointer-events-none"></div>
            <div className="absolute inset-0 w-full h-full rounded-lg border-4 border-gray-400 transform rotate-12 pointer-events-none -z-10"></div>
          </div>

          <div className="text-center lg:text-left space-y-4">
            <h1 className="text-3xl lg:text-4xl font-semibold text-gray-100">
              Alex Gerard - Analyste Développeur
            </h1>
            <p className="text-lg text-gray-400">🌍 Belgique, Luxembourg</p>
            <p className="text-lg text-gray-400">
              👨‍💻 Passionné par le développement et l'analyse de systèmes
              complexes.
            </p>
            <p className="text-lg text-gray-400">🎂 20 ans</p>
            <p className="text-lg text-gray-400">
              🎓 Haute Ecole Robert Schuman, Campus de Libramont
            </p>
            <p className="text-lg text-gray-400">
              🗣️ Français (natif), Anglais
            </p>
          </div>
        </div>

        <main className="mt-10 text-center lg:text-left">
          <p className="text-xl max-w-3xl mx-auto lg:mx-0 text-gray-400">
            Étudiant développeur analyste. J'aime résoudre des problèmes
            complexes et créer des solutions efficaces et élégantes. En dehors
            du travail, j'apprécie l'exploration des dernières technologies et
            l'apprentissage continu.
          </p>
        </main>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <ExperienceSection title="student job" items={workItems} />
        </div>
        <div>
          <ProjectSection title="projects" items={projectItems} />
        </div>
      </main>

      <BlogSection blogPosts={recentPosts} />

      <div className="mt-6 text-center lg:text-left">
        <Link href="/blog" className="font-medium decoration-wavy">
          Voir tous les posts →
        </Link>
      </div>

      <LinksSection />
    </div>
  );
}

export async function getStaticProps() {
  const workDirectory = path.join(process.cwd(), 'src/content/work');
  const workFiles = fs.readdirSync(workDirectory);
  const workItems = workFiles.map((filename) => {
    const filePath = path.join(workDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    return {
      slug: filename.replace('.md', ''),
      title: data.title,
      resume: data.resume,
      date: data.date || '',
    };
  });

  const projectDirectory = path.join(process.cwd(), 'src/content/projects');
  const projectFiles = fs.readdirSync(projectDirectory);
  const projectItems = projectFiles.map((filename) => {
    const filePath = path.join(projectDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    return {
      slug: filename.replace('.md', ''),
      title: data.title,
      resume: data.resume,
      date: data.date || 'Date inconnue',
    };
  });

  const blogDirectory = path.join(process.cwd(), 'src/content/blog');
  const blogFiles = fs.readdirSync(blogDirectory);
  const blogPosts = blogFiles
    .map((filename) => {
      const filePath = path.join(blogDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      return {
        slug: filename.replace('.md', ''),
        title: data.title,
        resume: data.resume,
        date: data.date || 'Date inconnue',
      };
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });

  return {
    props: {
      workItems,
      projectItems,
      blogPosts,
    },
  };
}
