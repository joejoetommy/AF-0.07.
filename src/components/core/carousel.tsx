'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const transition = {
  type: 'spring',
  stiffness: 260,
  damping: 28,
};

// Images must exist in /public
const ITEMS = [
  { label: 'Focused', src: '/image5.jpg' },
  { label: 'Driven',  src: '/image1.jpg' },
  { label: 'Irish',   src: '/image2.jpg' },
  { label: 'Local',   src: '/image3.jpg' },
  { label: 'Skilled',  src: '/image4.jpg' },
];

const ITEM_SIZE = 200; // px
const GAP = 16;        // matches gap-4

export default function LabelIndicatorCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [centerOffset, setCenterOffset] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);

  // Recalculate centering whenever the viewport size changes
  useEffect(() => {
    const recalc = () => {
      const width = viewportRef.current?.offsetWidth ?? 0;
      setCenterOffset((width - ITEM_SIZE) / 2);
    };
    recalc();
    window.addEventListener('resize', recalc);
    return () => window.removeEventListener('resize', recalc);
  }, []);

  return (
    // ⬇️ The CONTAINER: constrains width and prevents layout distortion
    <div className="mx-auto w-full max-w-[720px] px-4 sm:px-6 md:px-8">
    {/* Viewport: clips the sliding track */}
    <div
      ref={viewportRef}
      className="relative h-[200px] w-full overflow-hidden rounded-2xl"
    >
      {/* Sliding track */}
      <motion.div
        initial={false}
        className="absolute left-0 top-0 flex gap-4"
        animate={{ x: centerOffset - currentIndex * (ITEM_SIZE + GAP) }}
        transition={transition}
        style={{ width: ITEMS.length * (ITEM_SIZE + GAP) }}
      >
        {ITEMS.map((item, index) => (
          <motion.div
            key={item.label}
            className="relative h-[200px] w-[200px] overflow-hidden rounded-[12px] bg-stone-200/60 dark:bg-stone-800"
            animate={{ y: currentIndex === index ? 0 : -32 }}
            transition={transition}
            onClick={() => setCurrentIndex(index)}
            role="button"
            aria-label={item.label}
          >
            <Image
              src={item.src}
              alt={item.label}
              fill
              sizes="200px"
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1 text-sm font-medium text-white">
              {item.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>

    {/* Indicators */}
    <div className="mt-6 flex h-8 items-center justify-center gap-2">
      {ITEMS.map((item, index) => (
        <motion.button
          key={item.label}
          initial={false}
          onClick={() => setCurrentIndex(index)}
          className="flex cursor-pointer select-none items-center justify-center overflow-hidden rounded-full bg-black text-white dark:bg-white dark:text-black text-sm"
          animate={{
            width: currentIndex === index ? 68 : 12,
            height: currentIndex === index ? 26 : 12,
          }}
          transition={transition}
          aria-label={`Go to ${item.label}`}
        >
          <motion.span
            initial={false}
            className="block whitespace-nowrap px-3 py-1"
            animate={{
              opacity: currentIndex === index ? 1 : 0,
              scale: currentIndex === index ? 1 : 0,
              filter: currentIndex === index ? "blur(0)" : "blur(4px)",
            }}
            transition={transition}
          >
            {item.label}
          </motion.span>
        </motion.button>
      ))}
    </div>
  </div>
  );
}
