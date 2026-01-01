'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fadeInUp, staggerContainer } from '@/lib/animations';

interface CounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

function Counter({ end, duration = 2, prefix = '', suffix = '', label }: CounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
      let startTime: number | null = null;
      const startValue = 0;

      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(startValue + (end - startValue) * easeOutQuart);
        
        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [inView, hasAnimated, end, duration]);

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="initial"
      animate={inView ? 'animate' : 'initial'}
      className="text-center"
    >
      <div className="mb-4">
        <motion.div
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-2"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={inView && hasAnimated ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {prefix}
          {count.toLocaleString()}
          {suffix}
        </motion.div>
        <motion.p
          className="text-lg sm:text-xl text-gray-300 font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={inView && hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {label}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default function StatsCounter() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-gray-900/50 to-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16"
        >
          <Counter
            end={500}
            duration={3.5}
            prefix="+"
            label="Happy Clients"
          />
          <Counter
            end={500}
            duration={4}
            prefix="+"
            label="Completed Projects"
          />
        </motion.div>
      </div>
    </section>
  );
}

