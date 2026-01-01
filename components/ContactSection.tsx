'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export default function ContactSection() {
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
          Contact Us
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Branches */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-4">Our Branches</h3>
            <div className="space-y-3 text-gray-300">
              <p>5th Settlement Branch, Cairo </p>
              <p>Saba basha Branch, Alexandria</p>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-4">Contact</h3>
            <div className="space-y-3 text-gray-300">
              <a
                href="tel:+201019992810"
                className="block hover:text-white transition-colors"
              >
                +201019992810
              </a>
              <a
                href="tel:+201200568885"
                className="block hover:text-white transition-colors"
              >
                +201200568885
              </a>
              <a
                href="mailto:info@mrd-eg.com"
                className="block hover:text-white transition-colors"
              >
                info@mrd-eg.com
              </a>
            </div>
          </motion.div>

          {/* Opening Hours */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-4">Opening Hours</h3>
            <div className="space-y-3 text-gray-300">
              <p>Saturday - Thursday</p>
              <p>by appointment</p>
              <p>11:00 AM - 6:00 PM</p>
              <p>Friday: Closed</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Google Maps */}
        <motion.div
          variants={fadeInUp}
          className="mt-12"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Location</h3>
          <div className="relative w-full h-96 rounded-lg overflow-hidden border border-gray-800 shadow-2xl bg-gray-900">
            <iframe
              src="https://www.google.com/maps?q=31.233963,29.958453&hl=en&z=14&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
              title="Mohamed Refaat Design Location"
            />
          </div>
          <div className="mt-4 text-center space-y-2">
            <p className="text-gray-300 font-medium">
            5th Settlement Branch, Cairo 
            </p>
            <p className="text-gray-300 font-medium">
              Saba basha Branch, Alexandria
            </p>
          </div>
        </motion.div>

        {/* Social Links - Instagram Only */}
        <motion.div
          variants={fadeInUp}
          className="mt-12 flex justify-center"
        >
          <motion.a
            href="https://www.instagram.com/mohamedrefaat.designs"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 text-white hover:text-gray-400 transition-colors group"
            aria-label="Instagram"
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
            <span className="text-lg font-medium">Follow us on Instagram</span>
          </motion.a>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          variants={fadeInUp}
          className="mt-12 flex justify-center"
        >
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Contact Us
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

