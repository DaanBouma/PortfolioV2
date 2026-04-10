// @ts-nocheck
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const AnimatedBlock = ({
  children,
  delay = 0,
  duration = 0.4,
  className = '',
  once = true
}) => {
  const ref = useRef(null);
  const [disableAnimation, setDisableAnimation] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    setDisableAnimation(prefersReducedMotion || isTouchDevice);
  }, []);

  const isInView = useInView(ref, {
    once: once,
    threshold: 0.1,
    margin: "-20px 0px -20px 0px"
  });

  const variants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 120,
        duration: duration,
        delay: delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial={disableAnimation ? false : "hidden"}
      animate={disableAnimation || isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedBlock;
