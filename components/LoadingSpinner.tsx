'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { getImagePath } from '@/lib/paths';

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-6">
        {/* Logo Emblem with Rotation Animation */}
        <motion.div
          className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: {
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            },
            scale: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <Image
            src={getImagePath('/images/logo emblem.avif')}
            alt="Loading..."
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Loading Text */}
        <motion.div
          className="flex items-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.span
            className="text-white text-lg sm:text-xl font-medium"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Loading
          </motion.span>
          <motion.div
            className="flex space-x-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[0, 1, 2].map((index) => (
              <motion.span
                key={index}
                className="text-white text-xl"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut"
                }}
              >
                .
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Pulsing Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="absolute border-2 border-white/20 rounded-full"
              style={{
                width: 200 + index * 60,
                height: 200 + index * 60,
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.4,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

