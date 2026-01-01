'use client';

import WorkGallery from './WorkGallery';
import WorkGalleryWithCategories from './WorkGalleryWithCategories';
import { Project } from '@/lib/projectScanner';

interface WorkGalleryClientProps {
  projects: Project[];
  showCategories?: boolean;
  showMoreButton?: boolean;
}

export default function WorkGalleryClient({ 
  projects,
  showCategories = false,
  showMoreButton = false
}: WorkGalleryClientProps) {
  if (showCategories) {
    return <WorkGalleryWithCategories projects={projects} showCategories={true} />;
  }

  // For home page, use the original grid layout
  return <WorkGallery projects={projects} showMoreButton={showMoreButton} />;
}

