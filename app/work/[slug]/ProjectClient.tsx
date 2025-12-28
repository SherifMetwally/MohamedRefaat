'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { Project } from '@/lib/projects';

interface ProjectClientProps {
  project: Project;
}

export default function ProjectClient({ project }: ProjectClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Keyboard navigation
  useEffect(() => {
    if (selectedImageIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) => {
          if (prev === null) return null;
          return prev > 0 ? prev - 1 : project.images.length - 1;
        });
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIndex((prev) => {
          if (prev === null) return null;
          return prev < project.images.length - 1 ? prev + 1 : 0;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, project]);

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
      setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : project.images.length - 1);
    }
  };

  const goToNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex < project.images.length - 1 ? selectedImageIndex + 1 : 0);
    }
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

        {/* Project Images Grid */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {project.images.map((imageSrc, imageIndex) => (
            <motion.div
              key={imageIndex}
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
              onClick={() => openLightbox(imageIndex)}
              className="relative aspect-square overflow-hidden rounded-lg border border-gray-800 group cursor-pointer bg-gray-900"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
              <Image
                src={imageSrc}
                alt={`${project.title} - Image ${imageIndex + 1}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes('hero-image')) {
                    target.src = '/images/hero-image.jpg';
                  }
                }}
              />
            </motion.div>
          ))}
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
                {project.images.length > 1 && (
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
                {project.images.length > 1 && (
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
                  {selectedImageIndex + 1} / {project.images.length}
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
                    src={project.images[selectedImageIndex]}
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

