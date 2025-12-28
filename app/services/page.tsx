'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from '@/lib/animations';
import { getImagePath } from '@/lib/paths';

const services = [
  {
    title: 'Commercial',
    description: 'Creating inspiring spaces that elevate business performance and customer experience',
    image: '/images/commercial.avif',
  },
  {
    title: 'Villa Exterior',
    description: 'Adding grandeur and sophistication to villas with timeless exterior designs',
    image: '/images/villa exterior.avif',
  },
  {
    title: 'Residential Projects',
    description: 'Delivering complete housing solutions with precision and creativity',
    image: '/images/residential-project.avif',
  },
  {
    title: 'Landscape & Exterior',
    description: 'Shaping outdoor areas into harmonious, inviting environments',
    image: '/images/landscape.avif',
  },
  {
    title: 'Residential',
    description: 'Designing homes that reflect your lifestyle with elegance and comfort',
    image: '/images/residential.avif',
  },
  {
    title: 'Interior Design Art',
    description: 'Blending art and functionality to craft interiors that inspire and endure.',
    image: '/images/interior-art.jpg',
  },
];

export default function ServicesPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [ctaRef, ctaInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="pt-20">
      {/* Our Services Section */}
      <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8">
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
              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mx-8 text-center"
              >
                Our Services
              </motion.h1>
              <motion.div
                variants={slideInLeft}
                className="h-px bg-gradient-to-l from-transparent via-gray-600 to-gray-600 flex-1 max-w-32"
              />
            </div>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              className="text-lg sm:text-xl text-gray-300 text-center max-w-3xl mx-auto mb-12"
            >
              Let us help you make your dreams a reality.
            </motion.p>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="border border-gray-800 rounded-lg bg-gradient-to-br from-gray-900/50 to-black/50 hover:bg-gray-900/70 hover:border-gray-700 transition-all duration-300 overflow-hidden group"
                >
                  {/* Service Image */}
                  <div className="relative w-full h-64 overflow-hidden">
                    <Image
                      src={getImagePath(service.image)}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>
                  
                  {/* Service Content */}
                  <div className="p-8">
                    <h2 className="text-2xl font-bold text-white mb-4">
                      {service.title}
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate={ctaInView ? 'animate' : 'initial'}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Create your dream home.
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              className="text-lg sm:text-xl text-gray-300 mb-8"
            >
              Tell us about your project today.
            </motion.p>
            <motion.div variants={fadeInUp} transition={{ delay: 0.2 }}>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-white text-black font-bold text-lg rounded-lg hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Get A Free Estimate
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
