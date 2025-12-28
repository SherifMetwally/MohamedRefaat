'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { getProjectBySlug, Project } from '@/lib/projects';
import ProjectClient from './ProjectClient';

interface ProjectPageClientProps {
  serverParams?: {
    slug?: string;
  };
}

export default function ProjectPageClient({ serverParams }: ProjectPageClientProps) {
  const pathname = usePathname();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to get slug from server params first, then from URL
    let slug: string | null = null;
    
    if (serverParams?.slug) {
      slug = String(serverParams.slug).replace(/\/$/, '').trim();
    } else {
      // Extract slug from pathname
      const match = pathname.match(/\/work\/([^\/]+)/);
      if (match) {
        slug = match[1].replace(/\/$/, '').trim();
      }
    }
    
    if (slug) {
      const foundProject = getProjectBySlug(slug);
      setProject(foundProject || null);
    }
    setLoading(false);
  }, [pathname, serverParams]);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
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

