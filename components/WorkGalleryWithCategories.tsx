'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { getImagePath } from '@/lib/paths';
import { Project, ProjectCategory } from '@/lib/projectScanner';

interface WorkGalleryWithCategoriesProps {
  projects: Project[];
  showCategories?: boolean;
}

export default function WorkGalleryWithCategories({ 
  projects = [], 
  showCategories = false 
}: WorkGalleryWithCategoriesProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.01,
  });

  const [currentImageIndices, setCurrentImageIndices] = useState<Record<string, number>>({});
  const [hoveredProjects, setHoveredProjects] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, Set<string>>>({});
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

    projects.forEach((project) => {
      // Preload main images
      project.images.forEach((imageSrc) => {
        const img = new window.Image();
        img.src = getImagePath(imageSrc);
      });
      
      // Preload category images if they exist
      project.categories?.forEach((category) => {
        category.images.forEach((imageSrc) => {
          const img = new window.Image();
          img.src = getImagePath(imageSrc);
        });
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

        // Set up interval to continue cycling through all images
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

  const handleMouseEnter = (projectId: string) => {
    setHoveredProjects((prev) => {
      if (prev.includes(projectId)) return prev;
      return [...prev, projectId];
    });
    
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

  const handleMouseLeave = (projectId: string) => {
    setHoveredProjects((prev) => prev.filter(id => id !== projectId));
    setCurrentImageIndices((prev) => ({
      ...prev,
      [projectId]: 0,
    }));
  };

  const toggleCategory = (projectId: string, categoryName: string) => {
    setExpandedCategories((prev) => {
      const projectCategories = prev[projectId] || new Set();
      const newSet = new Set(projectCategories);
      
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      
      return {
        ...prev,
        [projectId]: newSet,
      };
    });
  };

  const getProjectDisplayImage = (project: Project): string => {
    const allImages = [
      ...project.images,
      ...(project.categories?.flatMap(cat => cat.images) || [])
    ];
    
    // Use preview image if available, otherwise use cycling images on hover
    const currentIndex = currentImageIndices[project.id] ?? 0;
    
    if (hoveredProjects.includes(project.id) && allImages.length > 0) {
      // When hovering, cycle through images
      return allImages[currentIndex % allImages.length];
    } else {
      // Use the stable preview image
      return previewImages[project.id] || project.thumbnail;
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8 text-center">
          Our Work
        </h2>

        <div className="space-y-8">
          {projects.map((project, projectIndex) => {
            const imageSrc = getProjectDisplayImage(project);
            const currentImage = imageSrc ? getImagePath(imageSrc) : getImagePath('/images/hero-image.jpg');
            const currentIndex = currentImageIndices[project.id] ?? 0;
            const isExpanded = expandedCategories[project.id]?.size > 0;

            // Skip if no images at all
            if (!imageSrc && !project.thumbnail) {
              return null;
            }

            return (
              <div
                key={project.id}
                className="border border-gray-800 rounded-lg bg-gray-900/30 overflow-hidden"
              >
                {/* Main Project Card */}
                <Link href={`/work/${project.slug}`} className="block">
                  <div
                    className="relative aspect-[4/3] overflow-hidden group cursor-pointer bg-gray-900 hover:scale-[1.01] transition-transform duration-300"
                    onMouseEnter={() => handleMouseEnter(project.id)}
                    onMouseLeave={() => handleMouseLeave(project.id)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
                    
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
                            priority={projectIndex < 3}
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

                {/* Categories Accordion - Only show on individual project pages, not in listing */}
                {false && showCategories && project.categories && project.categories.length > 0 && (
                  <div className="p-4 border-t border-gray-800">
                    <div className="space-y-2">
                      {project.categories.map((category) => {
                        const isCategoryExpanded = expandedCategories[project.id]?.has(category.name);
                        
                        return (
                          <div key={category.name} className="border border-gray-800 rounded-lg overflow-hidden">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleCategory(project.id, category.name);
                              }}
                              className="w-full px-4 py-3 flex items-center justify-between bg-gray-900/50 hover:bg-gray-900/70 transition-colors text-left"
                            >
                              <span className="text-white font-semibold">{category.name}</span>
                              <motion.svg
                                animate={{ rotate: isCategoryExpanded ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </motion.svg>
                            </button>
                            
                            <AnimatePresence>
                              {isCategoryExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {category.images.map((imageSrc, imgIndex) => (
                                      <Link
                                        key={imgIndex}
                                        href={`/work/${project.slug}?category=${encodeURIComponent(category.name)}&image=${imgIndex}`}
                                        className="relative aspect-square overflow-hidden rounded-lg border border-gray-800 hover:border-gray-600 transition-colors group"
                                      >
                                        <Image
                                          src={getImagePath(imageSrc)}
                                          alt={`${category.name} - ${imgIndex + 1}`}
                                          fill
                                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

