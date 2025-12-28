'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { projects } from '@/lib/projects';
import { getImagePath } from '@/lib/paths';

export default function WorkGallery() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // State to track current image index for each project
  const [currentImageIndices, setCurrentImageIndices] = useState<Record<string, number>>({});
  // State to track which projects are being hovered
  const [hoveredProjects, setHoveredProjects] = useState<Set<string>>(new Set());

  // Initialize indices when component mounts
  useEffect(() => {
    const initialIndices: Record<string, number> = {};
    projects.forEach((project) => {
      initialIndices[project.id] = 0;
    });
    setCurrentImageIndices(initialIndices);
  }, []);

  // Preload all project images when component comes into view
  useEffect(() => {
    if (!inView) return;

    // Preload all images for all projects
    projects.forEach((project) => {
      project.images.forEach((imageSrc) => {
        const img = new window.Image();
        img.src = getImagePath(imageSrc);
      });
    });
  }, [inView]);

  // Set up intervals for hovered projects to cycle through images
  useEffect(() => {
    if (!inView || hoveredProjects.size === 0) return;

    const intervals: NodeJS.Timeout[] = [];
    const timeouts: NodeJS.Timeout[] = [];

    hoveredProjects.forEach((projectId) => {
      const project = projects.find((p) => p.id === projectId);
      if (project && project.images.length > 1) {
        // First transition after 1 second
        const firstTimeout = setTimeout(() => {
          setCurrentImageIndices((prev) => {
            const currentIndex = prev[projectId] || 0;
            const nextIndex = (currentIndex + 1) % project.images.length;
            return {
              ...prev,
              [projectId]: nextIndex,
            };
          });

          // Then set up interval for every 2 seconds
          const interval = setInterval(() => {
            setCurrentImageIndices((prev) => {
              const currentIndex = prev[projectId] || 0;
              const nextIndex = (currentIndex + 1) % project.images.length;
              return {
                ...prev,
                [projectId]: nextIndex,
              };
            });
          }, 2000); // Change image every 2 seconds after first transition

          intervals.push(interval);
        }, 1000); // First transition after 1 second

        timeouts.push(firstTimeout);
      }
    });

    return () => {
      intervals.forEach((interval) => clearInterval(interval));
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [inView, hoveredProjects]);

  // Handle hover start
  const handleMouseEnter = (projectId: string) => {
    setHoveredProjects((prev) => new Set(prev).add(projectId));
    
    // Preload all images for this project when hover starts (as backup)
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      project.images.forEach((imageSrc) => {
        const img = new window.Image();
        img.src = getImagePath(imageSrc);
      });
    }
  };

  // Handle hover end - reset to first image
  const handleMouseLeave = (projectId: string) => {
    setHoveredProjects((prev) => {
      const newSet = new Set(prev);
      newSet.delete(projectId);
      return newSet;
    });
    // Reset to first image when hover ends
    setCurrentImageIndices((prev) => ({
      ...prev,
      [projectId]: 0,
    }));
  };

  return (
    <section ref={ref} className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          variants={fadeInUp}
          className="text-4xl sm:text-5xl font-bold text-white mb-8 text-center"
        >
          Our Work
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, projectIndex) => {
            const currentIndex = currentImageIndices[project.id] || 0;
            const currentImage = getImagePath(project.images[currentIndex] || project.thumbnail);

            return (
              <Link
                key={project.id}
                href={`/work/${project.slug}`}
                className="block"
              >
                <motion.div
                  variants={fadeInUp}
                  whileHover={{ scale: 1.03, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-[4/3] overflow-hidden rounded-lg border border-gray-800 group cursor-pointer bg-gray-900"
                  onMouseEnter={() => handleMouseEnter(project.id)}
                  onMouseLeave={() => handleMouseLeave(project.id)}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  
                  {/* Image container with slide animation */}
                  <div className="absolute inset-0 overflow-hidden">
                    <AnimatePresence mode="sync">
                      <motion.div
                        key={`${project.id}-${currentIndex}`}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={currentImage}
                          alt={`${project.title} - Image ${currentIndex + 1}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          priority={currentIndex === 0}
                          loading={currentIndex === 0 ? 'eager' : 'eager'}
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
                </motion.div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

