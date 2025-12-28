'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from '@/lib/animations';

const services = [
  {
    title: 'Interior Design',
    description: 'Complete interior design solutions that transform spaces into elegant, functional environments.',
  },
  {
    title: 'Architecture',
    description: 'Architectural design and planning services for residential and commercial projects.',
  },
  {
    title: 'Exterior Design',
    description: 'Creating stunning exterior designs that enhance the beauty and value of your property.',
  },
  {
    title: 'Project Management',
    description: 'End-to-end project management ensuring quality, safety, and timely completion.',
  },
];

export default function ServicesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section ref={ref} className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
        >
          {/* Section Header */}
          <div className="flex items-center justify-center mb-8">
            <motion.div
              variants={slideInRight}
              className="h-px bg-gradient-to-r from-transparent via-gray-600 to-gray-600 flex-1 max-w-32"
            />
            <motion.h2
              variants={fadeInUp}
              className="text-4xl sm:text-5xl font-bold text-white mx-8 text-center"
            >
              Our Services
            </motion.h2>
            <motion.div
              variants={slideInLeft}
              className="h-px bg-gradient-to-l from-transparent via-gray-600 to-gray-600 flex-1 max-w-32"
            />
          </div>

          {/* Services Grid */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate={inView ? 'animate' : 'initial'}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.03, y: -5 }}
                className="p-6 bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800 rounded-lg hover:border-gray-700 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Know More Button */}
          <motion.div
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
            className="flex justify-center"
          >
            <Link href="/services">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Know More
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

