'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from '@/lib/animations';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    subject: '',
    message: '',
  });

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formRef, formInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add API call or email service here
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="pt-20">
      {/* Header Section */}
      <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate={inView ? 'animate' : 'initial'}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-8">
              <motion.div
                variants={slideInRight}
                className="h-px bg-gradient-to-r from-transparent via-gray-600 to-gray-600 flex-1 max-w-32"
              />
              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mx-8"
              >
                Let's Discuss
              </motion.h1>
              <motion.div
                variants={slideInLeft}
                className="h-px bg-gradient-to-l from-transparent via-gray-600 to-gray-600 flex-1 max-w-32"
              />
            </div>
            <motion.h2
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6"
            >
              Your Next Project
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Fill out the form, or call us to set up a free in-home consultation.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
              className="text-base text-gray-400 mt-4"
            >
              Service Areas: EGYPT
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section ref={formRef} className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate={formInView ? 'animate' : 'initial'}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {/* Contact Form */}
            <motion.div variants={fadeInUp}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label htmlFor="firstName" className="block text-white mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all"
                      placeholder="First Name"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label htmlFor="lastName" className="block text-white mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all"
                      placeholder="Last Name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-white mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all"
                    placeholder="Email"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-white mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all"
                    placeholder="Phone"
                  />
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address" className="block text-white mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all"
                    placeholder="Address"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-white mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all"
                    placeholder="Subject"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-white mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all resize-none"
                    placeholder="Message"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-white text-black font-bold text-lg rounded-lg hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Submit
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div variants={fadeInUp} transition={{ delay: 0.2 }} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Branches</h3>
                <div className="space-y-3 text-gray-300">
                  <p>5th Settlement Branch, Cairo</p>
                  <p>Saba basha Branch, Alexandria</p>
                </div>
              </div>

              <div>
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
              </div>

              {/* Google Maps */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Location</h3>
                <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-800 shadow-2xl bg-gray-900">
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
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
