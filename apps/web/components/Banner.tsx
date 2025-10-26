'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface BannerProps {
  announcement: string;
  className?: string;
}

export const Banner = ({ announcement, className = '' }: BannerProps) => {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={` w-full  bg-[#184623] text-white overflow-hidden ${className}`}
        >
          <div className="flex items-center justify-between px-4 py-2">
            <div className="relative flex-1 overflow-hidden whitespace-nowrap">
              <motion.div
                animate={{ x: [0, -1000] }}
                transition={{ repeat: Infinity, ease: 'linear', duration: 15 }}
                className="inline-block min-w-full text-xs md:text-sm font-medium"
              >
                <span className="pr-12">{announcement}</span>
                <span className="pr-12">{announcement}</span>
                <span className="pr-12">{announcement}</span>
              </motion.div>
            </div>

            <button
              onClick={() => setVisible(false)}
              aria-label="Close banner"
              className="text-white/80 hover:text-white focus:outline-none ml-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
