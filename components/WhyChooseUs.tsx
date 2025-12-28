'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const features = [
  {
    title: 'Extensive Engineering Expertise',
    description: 'With over 15 years of hands-on experience in structural and civil engineering, Mohamed Refaat delivers solutions that are both innovative and reliable.',
  },
  {
    title: 'Commitment to Quality & Precision',
    description: 'Every project is handled with the highest standards of accuracy, safety, and engineering excellence ensuring long-lasting, sustainable results.',
  },
  {
    title: 'Client-Centered Approach',
    description: 'We prioritize our clients\' needs by offering tailored solutions, clear communication, and full transparency throughout the project lifecycle.',
  },
  {
    title: 'Proven Track Record of Success',
    description: 'From residential developments to large-scale infrastructure, our portfolio speaks for itself showcasing a history of successful and timely project completions.',
  },
];

export default function WhyChooseUs() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section ref={ref} className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          variants={fadeInUp}
          className="text-4xl sm:text-5xl font-bold text-white mb-8 text-center"
        >
          Why Choose Us
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -5 }}
              className="p-8 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg hover:border-gray-700 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

