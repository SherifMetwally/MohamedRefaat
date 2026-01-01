'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { Project } from '@/lib/projectScanner';
import { getImagePath } from '@/lib/paths';

interface ProjectClientProps {
  project: Project;
}

export default function ProjectClient({ project }: ProjectClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Get all images including categories
  const getAllImages = () => {
    const allImages: Array<{ src: string; category?: string; index: number }> = [];
    
    // Add main project images
    project.images.forEach((src, index) => {
      allImages.push({ src, index });
    });
    
    // Add category images
    project.categories?.forEach((category) => {
      category.images.forEach((src, index) => {
        allImages.push({ src, category: category.name, index });
      });
    });
    
    return allImages;
  };

  const allImages = getAllImages();

  // Keyboard navigation
  useEffect(() => {
    if (selectedImageIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) => {
          if (prev === null) return null;
          return prev > 0 ? prev - 1 : allImages.length - 1;
        });
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIndex((prev) => {
          if (prev === null) return null;
          return prev < allImages.length - 1 ? prev + 1 : 0;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, allImages.length]);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = 'unset';
  };

  const handleCloseClick = () => {
    closeLightbox();
  };

  const goToPrevious = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : allImages.length - 1);
    }
  };

  const goToNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex < allImages.length - 1 ? selectedImageIndex + 1 : 0);
    }
  };

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
  };

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          href="/work"
          className="inline-flex items-center text-white hover:text-gray-300 transition-colors mb-8 group"
        >
          <svg
            className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Projects
        </Link>

        {/* Project Title */}
        <motion.h1
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          variants={fadeInUp}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-12"
        >
          {project.title}
        </motion.h1>

        {/* Project Images - Stacked with original aspect ratios */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          className="space-y-6 flex flex-col items-center"
        >
          {/* Main Project Images */}
          {project.images.length > 0 && (
            <div className="w-full space-y-6">
              {project.images.map((imageSrc, imageIndex) => {
                const globalIndex = imageIndex;
                return (
                  <motion.div
                    key={`main-${imageIndex}`}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => openLightbox(globalIndex)}
                    className="relative w-full max-w-4xl overflow-hidden rounded-lg border border-gray-800 group cursor-pointer bg-gray-900"
                  >
                    <div className="relative w-full">
                      <Image
                        src={getImagePath(imageSrc)}
                        alt={`${project.title} - Image ${imageIndex + 1}`}
                        width={1920}
                        height={1080}
                        className="w-full h-auto object-contain group-hover:opacity-90 transition-opacity duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (!target.src.includes('hero-image')) {
                            target.src = getImagePath('/images/hero-image.jpg');
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Category Sections */}
          {project.categories && project.categories.length > 0 && (
            <div className="w-full space-y-6">
              {project.categories.map((category, categoryIndex) => {
                const isExpanded = expandedCategories.has(category.name);
                // Calculate the starting index for this category
                let categoryStartIndex = project.images.length;
                for (let i = 0; i < categoryIndex; i++) {
                  categoryStartIndex += project.categories![i].images.length;
                }
                
                return (
                  <motion.div
                    key={category.name}
                    variants={fadeInUp}
                    className="border border-gray-800 rounded-lg bg-gray-900/30 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleCategory(category.name)}
                      className="w-full px-6 py-4 flex items-center justify-between bg-gray-900/50 hover:bg-gray-900/70 transition-colors text-left"
                    >
                      <span className="text-white text-xl font-semibold">{category.name}</span>
                      <motion.svg
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-6 h-6 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </button>
                    
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 space-y-6">
                            {category.images.map((imageSrc, imgIndex) => {
                              const globalIndex = categoryStartIndex + imgIndex;
                              return (
                                <motion.div
                                  key={`${category.name}-${imgIndex}`}
                                  variants={fadeInUp}
                                  whileHover={{ scale: 1.01 }}
                                  transition={{ duration: 0.3 }}
                                  onClick={() => openLightbox(globalIndex)}
                                  className="relative w-full max-w-4xl overflow-hidden rounded-lg border border-gray-800 group cursor-pointer bg-gray-900"
                                >
                                  <div className="relative w-full">
                                    <Image
                                      src={getImagePath(imageSrc)}
                                      alt={`${category.name} - Image ${imgIndex + 1}`}
                                      width={1920}
                                      height={1080}
                                      className="w-full h-auto object-contain group-hover:opacity-90 transition-opacity duration-300"
                                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        if (!target.src.includes('hero-image')) {
                                          target.src = getImagePath('/images/hero-image.jpg');
                                        }
                                      }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImageIndex !== null && (
            <>
              {/* Background overlay - darker */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeLightbox}
                className="fixed inset-0 z-[100] bg-black cursor-pointer"
              />
              
              {/* Controls layer - above background but below image */}
              <div className="fixed inset-0 z-[101] pointer-events-none pt-20">
                {/* Close Button */}
                <motion.button
                  onClick={handleCloseClick}
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-24 right-4 text-white hover:text-gray-300 transition-colors p-3 cursor-pointer bg-black/80 rounded-full hover:bg-black border border-white/20 pointer-events-auto"
                  aria-label="Close"
                  type="button"
                  style={{ zIndex: 200, position: 'fixed' }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>

                {/* Previous Button */}
                {allImages.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPrevious();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-3 bg-black/80 rounded-full hover:bg-black border border-white/20 pointer-events-auto z-[200]"
                    aria-label="Previous image"
                    type="button"
                    style={{ zIndex: 200 }}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                )}

                {/* Next Button */}
                {allImages.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNext();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-3 bg-black/80 rounded-full hover:bg-black border border-white/20 pointer-events-auto z-[200]"
                    aria-label="Next image"
                    type="button"
                    style={{ zIndex: 200 }}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full pointer-events-none">
                  {selectedImageIndex + 1} / {allImages.length}
                </div>
              </div>

              {/* Image Container - separate layer with navbar spacing */}
              <div className="fixed inset-0 z-[102] flex items-center justify-center p-4 pt-24 pointer-events-none">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-w-7xl max-h-[85vh] flex items-center justify-center pointer-events-auto"
                >
                  <Image
                    src={getImagePath(allImages[selectedImageIndex]?.src || project.thumbnail)}
                    alt={`${project.title} - Image ${selectedImageIndex + 1}`}
                    width={1920}
                    height={1080}
                    className="object-contain max-w-full max-h-[90vh] rounded-lg"
                    priority
                    quality={95}
                  />
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

