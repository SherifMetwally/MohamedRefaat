'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from '@/lib/animations';
import AboutSection from '@/components/AboutSection';

const processSteps = [
  {
    title: 'Preconstruction Design',
    description: 'We start by shaping your vision into clear concepts and functional layouts, setting the foundation for a successful project.',
    image: '/images/preconstruction design.avif',
  },
  {
    title: 'Design & Construction Estimate',
    description: 'Our team develops detailed plans and transparent cost estimates to ensure your project stays on track and within budget.',
    image: '/images/design estimate.avif',
  },
  {
    title: 'On-Site Consultations',
    description: 'We visit the site to align every detail with the design, ensuring smooth execution and practical solutions.',
    image: '/images/onsite-consultation.avif',
  },
  {
    title: 'The Finishing Touches',
    description: 'Finally, we perfect the smallest details, adding elegance and character that transform your space into a timeless masterpiece.',
    image: '/images/finishing-touches.avif',
  },
];

export default function AboutPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [processRef, processInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [moreRef, moreInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [qualityRef, qualityInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="pt-20">
      {/* About Section */}
      <AboutSection showKnowMoreButton={false} />

      {/* Our Process Section */}
      <section ref={processRef} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate={processInView ? 'animate' : 'initial'}
          >
            {/* Section Header */}
            <div className="flex items-center justify-center mb-12">
              <motion.div
                variants={slideInRight}
                className="h-px bg-gradient-to-r from-transparent via-gray-600 to-gray-600 flex-1 max-w-32"
              />
              <motion.h2
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mx-8 text-center"
              >
                Our Process
              </motion.h2>
              <motion.div
                variants={slideInLeft}
                className="h-px bg-gradient-to-l from-transparent via-gray-600 to-gray-600 flex-1 max-w-32"
              />
            </div>

            {/* Process Description */}
            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16"
            >
              Our process is simple yet meticulous. We begin by understanding your vision, then craft a tailored design that balances beauty and function. Finally, we bring it to life with flawless execution—delivering timeless spaces that inspire.
            </motion.p>

            {/* Process Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="border border-gray-800 rounded-lg bg-gray-900/30 hover:bg-gray-900/50 hover:border-gray-700 transition-all duration-300 overflow-hidden group"
                >
                  {/* Image */}
                  <div className="relative w-full h-64 overflow-hidden">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>
                  
                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* More Section - Content from More page */}
      <section ref={moreRef} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate={moreInView ? 'animate' : 'initial'}
            className="text-center"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8"
            >
              More About Us
            </motion.h2>
            <motion.div
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-300 space-y-6 text-left"
            >
              <p>
                Welcome to Mohamed Refaat Design. We are dedicated to creating
                exceptional interior and architectural designs that reflect elegance,
                functionality, and innovation.
              </p>
              <p>
                Our team combines years of experience with a passion for design,
                ensuring every project meets the highest standards of quality and
                exceeds client expectations.
              </p>
              <p>
                For more information about our services, portfolio, or to discuss
                your project, please contact us through our contact page.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Quality Guarantee Section */}
      <section ref={qualityRef} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate={qualityInView ? 'animate' : 'initial'}
            className="text-center"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8"
            >
              Our Quality Guarantee
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              className="text-lg sm:text-xl text-gray-300 leading-relaxed"
            >
              We are committed to delivering excellence in every detail. From the initial concept to the final finishing touches, our work is guided by precision, creativity, and reliability. With a passion for design and a dedication to quality, we guarantee spaces that not only meet expectations but exceed them—crafted to last and inspire for years to come.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate={inView ? 'animate' : 'initial'}
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
