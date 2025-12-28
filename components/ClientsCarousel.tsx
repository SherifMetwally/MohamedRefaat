'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fadeInUp } from '@/lib/animations';

const clients = [
  'Orascom',
  'Living Lines',
  'New Giza',
  'OWest',
  'Four Seasons',
  'Palm Hills',
];

export default function ClientsCarousel() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Duplicate clients for seamless loop
  const duplicatedClients = [...clients, ...clients];

  return (
    <section ref={ref} className="py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          variants={fadeInUp}
          className="text-4xl sm:text-5xl font-bold text-white mb-8 text-center"
        >
          OUR CLIENTS
        </motion.h2>

        <motion.div
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          variants={fadeInUp}
          className="relative"
        >
          {/* Moving Text Animation - News Ticker Style */}
          <div className="relative overflow-hidden border-t border-b border-gray-800 py-8 group">
            <div className="flex animate-scroll group-hover:[animation-play-state:paused]">
              {duplicatedClients.map((client, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 mx-12 text-4xl sm:text-5xl md:text-6xl font-bold text-white whitespace-nowrap"
                >
                  {client}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

