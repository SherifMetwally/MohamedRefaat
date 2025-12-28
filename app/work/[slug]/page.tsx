import Link from 'next/link';
import { getProjectBySlug, projects } from '@/lib/projects';
import ProjectClient from './ProjectClient';

// Generate static params for static export
export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

interface PageProps {
  params: {
    slug: string;
  };
}

export default function ProjectPage({ params }: PageProps) {
  let { slug } = params;
  
  // Normalize slug: remove trailing slash if present
  slug = slug.replace(/\/$/, '');
  
  const project = getProjectBySlug(slug);
  
  // Debug: Log the slug and available projects (only in development)
  if (process.env.NODE_ENV === 'development') {
    console.log('Looking for slug:', slug);
    console.log('Available slugs:', projects.map(p => p.slug));
    console.log('Project found:', project ? project.title : 'NOT FOUND');
  }

  if (!project) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <p className="text-gray-400 mb-8">The project you're looking for doesn't exist.</p>
          <Link
            href="/work"
            className="inline-block px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return <ProjectClient project={project} />;
}

