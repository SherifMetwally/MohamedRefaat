import { getAllProjects, getHomeProjects, scanProjects, Project } from '@/lib/projectScanner';
import WorkGalleryClient from './WorkGalleryClient';

interface WorkGalleryServerProps {
  source?: 'home' | 'all' | 'our';
  showCategories?: boolean;
}

export default function WorkGalleryServer({ 
  source = 'all', 
  showCategories = false 
}: WorkGalleryServerProps) {
  let projects: Project[] = [];
  
  try {
    if (source === 'home') {
      projects = getHomeProjects();
    } else if (source === 'our') {
      projects = scanProjects('our-projects');
    } else {
      projects = getAllProjects();
    }
  } catch (error) {
    console.error('Error loading projects:', error);
    projects = [];
  }

  return <WorkGalleryClient projects={projects || []} showCategories={showCategories} showMoreButton={source === 'home'} />;
}

