import Link from 'next/link';
import { getProjectBySlug, projects } from '@/lib/projects';
import ProjectClient from './ProjectClient';
import ProjectPageClient from './ProjectPageClient';

// Generate static params for static export
export function generateStaticParams() {
  try {
    return projects.map((project) => ({
      slug: project.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

interface PageProps {
  params: {
    slug: string;
  };
}

export default function ProjectPage({ params }: PageProps) {
  // For static export, params might not be available at runtime
  // Use client-side component to extract slug from URL
  return <ProjectPageClient serverParams={params} />;
}

