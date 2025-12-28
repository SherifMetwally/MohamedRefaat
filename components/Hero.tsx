'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { fadeInUp, fadeIn, staggerContainer } from '@/lib/animations';

const services = ['Interior', 'Exterior', 'Architecture', 'Services'];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text Content - Left Side */}
          <div className="lg:col-span-7 text-center lg:text-left relative z-10">
            <motion.h1
              {...fadeInUp}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white mb-2 leading-tight"
            >
              Mohamed Refaat
            </motion.h1>
            <motion.h2
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={{ ...fadeInUp.transition, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white mb-8"
            >
              Designs
            </motion.h2>

            {/* Services List */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
            >
              {services.map((service, index) => (
                <motion.div
                  key={service}
                  variants={fadeInUp}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-6 py-3 border border-gray-700 rounded-lg bg-gray-900/50 backdrop-blur-sm hover:border-gray-500 hover:bg-gray-800/50 transition-all duration-300 cursor-default"
                >
                  <span className="text-lg sm:text-xl font-medium text-white">
                    {service}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <motion.p
              {...fadeIn}
              transition={{ delay: 0.6 }}
              className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0"
            >
              Transforming spaces into stunning, functional works of art
            </motion.p>
          </div>

          {/* Architect Image - Right Side with Cool Positioning */}
          <motion.div
            initial={{ 
              opacity: 0, 
              x: 200, 
              scale: 0.8,
              rotateY: -15
            }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              scale: 1,
              rotateY: 0
            }}
            transition={{ 
              duration: 1.2, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.4,
              type: "spring",
              stiffness: 50,
              damping: 15
            }}
            className="lg:col-span-5 relative"
          >
            {/* Decorative Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute -top-8 -right-8 w-64 h-64 bg-gradient-to-br from-gray-800/20 to-transparent rounded-full blur-3xl -z-10"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute -bottom-8 -left-8 w-48 h-48 bg-gradient-to-tr from-gray-800/20 to-transparent rounded-full blur-3xl -z-10"
            />
            
            {/* Main Image Container */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              whileHover={{ 
                scale: 1.03, 
                rotateY: 5,
                rotateX: 2,
                transition: { duration: 0.3 }
              }}
              className="relative w-full max-w-sm mx-auto aspect-[3/4]"
            >
              {/* Logo Emblem Background - Large and Overlay */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute inset-0 flex items-center justify-start"
                style={{ zIndex: 1, pointerEvents: 'none', left: '-100%' }}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="relative" style={{ width: '120%', height: '150%' }}>
                    <Image
                      src="/images/logo emblem.avif"
                      alt="MRD Logo Emblem"
                      fill
                      className="object-contain"
                      priority
                      style={{ 
                        opacity: 0.15,
                        filter: 'brightness(2) drop-shadow(0 0 20px rgba(255,255,255,0.3))'
                      }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Glow Effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-2xl blur-xl"
                style={{ zIndex: 10 }}
              />
              
              {/* Image with Cool Border */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
                className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-gray-700 shadow-2xl"
                style={{ zIndex: 20, position: 'relative' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/30 to-transparent z-10 pointer-events-none" />
                <Image
                  src="/images/hero-image.jpg"
                  alt="Eng. Mohamed Refaat - Architect and Interior Designer"
                  fill
                  className="object-cover transition-transform duration-700"
                  priority
                  quality={90}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </motion.div>

              {/* Floating Decorative Elements */}
              <motion.div
                initial={{ opacity: 0, x: 20, rotate: 0 }}
                animate={{ 
                  opacity: 0.3, 
                  x: 0,
                  y: [0, -10, 0],
                  rotate: 12
                }}
                transition={{ 
                  opacity: { delay: 1.2, duration: 0.6 },
                  x: { delay: 1.2, duration: 0.6 },
                  y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                  rotate: { delay: 1.2, duration: 0.6 }
                }}
                className="absolute -top-4 -right-4 w-20 h-20 border-2 border-gray-700 rounded-lg"
              />
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: 0.3,
                  x: 0,
                  y: [0, 10, 0]
                }}
                transition={{ 
                  opacity: { delay: 1.4, duration: 0.6 },
                  x: { delay: 1.4, duration: 0.6 },
                  y: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }
                }}
                className="absolute -bottom-4 -left-4 w-16 h-16 border-2 border-gray-700 rounded-full"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, repeat: Infinity, repeatType: 'reverse', duration: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}

