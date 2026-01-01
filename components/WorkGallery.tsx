'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { getImagePath } from '@/lib/paths';
import { Project } from '@/lib/projectScanner';

interface WorkGalleryProps {
  projects: Project[];
  showMoreButton?: boolean;
}

export default function WorkGallery({ projects = [], showMoreButton = false }: WorkGalleryProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.01,
  });

  // State to track current image index for each project
  const [currentImageIndices, setCurrentImageIndices] = useState<Record<string, number>>({});
  // State to track which projects are being hovered (using array for React reactivity)
  const [hoveredProjects, setHoveredProjects] = useState<string[]>([]);
  // State to store random preview images for each project
  const [previewImages, setPreviewImages] = useState<Record<string, string>>({});

  // Initialize indices and pick random preview images when component mounts
  useEffect(() => {
    const initialIndices: Record<string, number> = {};
    const initialPreviews: Record<string, string> = {};
    
    projects.forEach((project) => {
      initialIndices[project.id] = 0;
      
      // Pick a random image from all available images (including categories)
      const allImages = [
        ...project.images,
        ...(project.categories?.flatMap(cat => cat.images) || [])
      ];
      
      if (allImages.length > 0) {
        // Use project ID as seed for consistent random selection
        const seed = project.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const randomIndex = seed % allImages.length;
        initialPreviews[project.id] = allImages[randomIndex];
      } else {
        initialPreviews[project.id] = project.thumbnail;
      }
    });
    
    setCurrentImageIndices(initialIndices);
    setPreviewImages(initialPreviews);
  }, [projects]);

  // Preload all project images when component comes into view
  useEffect(() => {
    if (!inView) return;

    // Preload all images for all projects
    projects.forEach((project) => {
      const allImages = [
        ...project.images,
        ...(project.categories?.flatMap(cat => cat.images) || [])
      ];
      allImages.forEach((imageSrc) => {
        const img = new window.Image();
        img.src = getImagePath(imageSrc);
      });
    });
  }, [inView, projects]);

  // Set up intervals for hovered projects to cycle through images
  useEffect(() => {
    if (hoveredProjects.length === 0) {
      return;
    }

    const intervals: NodeJS.Timeout[] = [];
    const timeouts: NodeJS.Timeout[] = [];

    hoveredProjects.forEach((projectId) => {
      const project = projects.find((p) => p.id === projectId);
      if (!project) return;
      
      const allImages = [
        ...project.images,
        ...(project.categories?.flatMap(cat => cat.images) || [])
      ];
      
      if (allImages.length === 0) return;
      
      // First transition after 1 second
      const firstTimeout = setTimeout(() => {
        setCurrentImageIndices((prev) => {
          const currentIndex = prev[projectId] ?? 0;
          const nextIndex = (currentIndex + 1) % allImages.length;
          return {
            ...prev,
            [projectId]: nextIndex,
          };
        });

        // Then set up interval for every 2 seconds to continue cycling
        const interval = setInterval(() => {
          setCurrentImageIndices((prev) => {
            const currentIndex = prev[projectId] ?? 0;
            const nextIndex = (currentIndex + 1) % allImages.length;
            return {
              ...prev,
              [projectId]: nextIndex,
            };
          });
        }, 2000); // Change image every 2 seconds after first transition

        intervals.push(interval);
      }, 1000); // First transition after 1 second

      timeouts.push(firstTimeout);
    });

    return () => {
      intervals.forEach((interval) => clearInterval(interval));
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [hoveredProjects, projects]);

  // Handle hover start
  const handleMouseEnter = (projectId: string) => {
    setHoveredProjects((prev) => {
      if (prev.includes(projectId)) return prev;
      return [...prev, projectId];
    });
    
    // Preload all images for this project when hover starts (as backup)
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      const allImages = [
        ...project.images,
        ...(project.categories?.flatMap(cat => cat.images) || [])
      ];
      
      // Find the index of the current preview image and set it
      setCurrentImageIndices((prev) => {
        const currentPreview = previewImages[projectId];
        if (currentPreview && allImages.length > 0) {
          const previewIndex = allImages.findIndex(img => img === currentPreview);
          if (previewIndex !== -1) {
            return {
              ...prev,
              [projectId]: previewIndex,
            };
          }
        }
        return prev;
      });
      
      allImages.forEach((imageSrc) => {
        const img = new window.Image();
        img.src = getImagePath(imageSrc);
      });
    }
  };

  // Handle hover end - reset to first image
  const handleMouseLeave = (projectId: string) => {
    setHoveredProjects((prev) => prev.filter(id => id !== projectId));
    // Reset to first image when hover ends
    setCurrentImageIndices((prev) => ({
      ...prev,
      [projectId]: 0,
    }));
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8 text-center">
          Our Work
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, projectIndex) => {
            // Get all available images including from categories
            const allImages = [
              ...project.images,
              ...(project.categories?.flatMap(cat => cat.images) || [])
            ];
            
            // Use preview image if available, otherwise use cycling images on hover
            const currentIndex = currentImageIndices[project.id] ?? 0;
            let imageSrc: string;
            
            if (hoveredProjects.includes(project.id) && allImages.length > 0) {
              // When hovering, cycle through images
              imageSrc = allImages[currentIndex % allImages.length];
            } else {
              // Use the stable preview image
              imageSrc = previewImages[project.id] || project.thumbnail;
            }
            
            const currentImage = imageSrc ? getImagePath(imageSrc) : getImagePath('/images/hero-image.jpg');

            // Skip if no images at all
            if (!imageSrc && !project.thumbnail) {
              return null;
            }

            return (
              <Link
                key={project.id}
                href={`/work/${project.slug}`}
                className="block"
              >
                <div
                  className="relative aspect-[4/3] overflow-hidden rounded-lg border border-gray-800 group cursor-pointer bg-gray-900 hover:scale-105 transition-transform duration-300"
                  onMouseEnter={() => handleMouseEnter(project.id)}
                  onMouseLeave={() => handleMouseLeave(project.id)}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
                  
                  {/* Image container */}
                  <div className="absolute inset-0 overflow-hidden">
                    <AnimatePresence>
                      <motion.div
                        key={`${project.id}-${currentIndex}-${imageSrc}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={currentImage}
                          alt={`${project.title} - Image ${currentIndex + 1}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          priority={projectIndex < 6}
                          loading={projectIndex < 6 ? 'eager' : 'lazy'}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (!target.src.includes('hero-image')) {
                              target.src = getImagePath('/images/hero-image.jpg');
                            }
                          }}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="absolute inset-0 flex items-end p-6 z-20">
                    <div className="w-full">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-gray-200 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        View Project →
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* More Projects Button - Only show on home page */}
        {showMoreButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 flex justify-center"
          >
            <Link href="/work">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                More Projects
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

