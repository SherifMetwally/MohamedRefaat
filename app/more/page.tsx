'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fadeInUp } from '@/lib/animations';

export default function MorePage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div className="pt-20 min-h-screen bg-black">
      <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial="initial"
            animate={inView ? 'animate' : 'initial'}
            variants={fadeInUp}
            className="text-5xl sm:text-6xl font-bold text-white mb-12 text-center"
          >
            More
          </motion.h1>
          <motion.div
            initial="initial"
            animate={inView ? 'animate' : 'initial'}
            variants={fadeInUp}
            className="text-lg text-gray-300 space-y-6"
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
        </div>
      </section>
    </div>
  );
}

