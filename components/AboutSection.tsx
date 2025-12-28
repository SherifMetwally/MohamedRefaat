'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from '@/lib/animations';

interface AboutSectionProps {
  showKnowMoreButton?: boolean;
}

export default function AboutSection({ showKnowMoreButton = true }: AboutSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const paragraphs = [
    "Eng. Mohamed Refaat began his professional journey as an architect in 2010.",
    "However, it wasn't long before he discovered his true passion in the world of interior design.",
    "With a unique creative vision and meticulous attention to detail, his work quickly captured the attention of prestigious international clients and influential leaders within Egypt's design community.",
    "Today, he stands out as a respected name in the field, known for transforming spaces into stunning, functional works of art.",
    "His designs don't just decorate spaces they tell stories, inspire emotions, and reflect a refined sense of elegance.",
  ];

  return (
    <section ref={ref} className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(45deg, transparent 1px, rgba(255,255,255,0.05) 1px),
            linear-gradient(-45deg, transparent 1px, rgba(255,255,255,0.05) 1px)
          `,
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 0 0, 30px 30px, 30px 30px'
        }} />
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 1px, transparent 1px),
              radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px, 150px 150px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
        >
          {/* Title with decorative line */}
          <div className="flex items-center justify-center mb-12">
            <motion.div
              variants={slideInRight}
              className="h-px bg-gradient-to-r from-transparent via-gray-600 to-gray-600 flex-1 max-w-32"
            />
            <motion.h2
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mx-8 text-center"
            >
              About Us
            </motion.h2>
            <motion.div
              variants={slideInLeft}
              className="h-px bg-gradient-to-l from-transparent via-gray-600 to-gray-600 flex-1 max-w-32"
            />
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Main Text */}
            <motion.div
              variants={fadeInUp}
              className="space-y-6"
            >
              {paragraphs.slice(0, 3).map((text, index) => (
                <motion.p
                  key={index}
                  variants={fadeInUp}
                  className="text-lg sm:text-xl text-gray-300 leading-relaxed"
                >
                  {text}
                </motion.p>
              ))}
            </motion.div>

            {/* Right Column - Remaining Text */}
            <motion.div
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {paragraphs.slice(3).map((text, index) => (
                <motion.p
                  key={index + 3}
                  variants={fadeInUp}
                  className={`text-lg sm:text-xl leading-relaxed ${
                    index === 1 ? 'text-white font-semibold text-xl sm:text-2xl' : 'text-gray-300'
                  }`}
                >
                  {text}
                </motion.p>
              ))}

              {/* Know More Button - Only show on home page */}
              {showKnowMoreButton && (
                <motion.div
                  variants={fadeInUp}
                  transition={{ delay: 0.4 }}
                  className="mt-8"
                >
                  <Link href="/about">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Know More
                    </motion.button>
                  </Link>
                </motion.div>
              )}

              {/* Social Link with enhanced styling */}
              <motion.div
                variants={fadeInUp}
                transition={{ delay: 0.5 }}
                className="mt-8 pt-8 border-t border-gray-800"
              >
                <motion.a
                  href="https://www.instagram.com/mohamedrefaat.mr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 text-white hover:text-gray-300 transition-colors group"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center p-2 group-hover:shadow-lg group-hover:shadow-pink-500/50"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.204-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </motion.div>
                  <span className="text-lg font-medium">Follow on Instagram</span>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <motion.div
            variants={fadeInUp}
            transition={{ delay: 0.6 }}
            className="mt-16 flex justify-center gap-4"
          >
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                className="w-2 h-2 rounded-full bg-gray-600"
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

