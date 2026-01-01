'use client';

import Link from 'next/link';
import { Project } from '@/lib/projectScanner';
import ProjectClient from './ProjectClient';

interface ProjectPageClientProps {
  project: Project | undefined;
  slug: string;
}

export default function ProjectPageClient({ project, slug }: ProjectPageClientProps) {

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

