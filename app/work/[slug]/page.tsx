import ProjectPageClient from './ProjectPageClient';
import { getAllProjects, getProjectBySlug } from '@/lib/projectScanner';

// Generate static params for static export
export function generateStaticParams() {
  try {
    const projects = getAllProjects();
    return projects.map((project) => ({
      slug: project.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  
  return <ProjectPageClient project={project} slug={slug} />;
}

