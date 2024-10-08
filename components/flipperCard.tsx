import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function FlippingCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipped(prev => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[500px] mt-8 grid grid-cols-3 gap-8 overflow-hidden">
      <motion.div
        className="relative flex justify-center items-center h-full rounded-2xl shadow-md border-[6px] border-zinc-300"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 1 }}
        style={{ perspective: 1000 }}
      >
        <motion.div
          className="absolute h-2/3 w-2/3 flex justify-center items-center"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <img
            src="experienceLogos/dtu.png"
            alt="DTU logo"
            className="h-full w-full object-contain"
          />
        </motion.div>
        <motion.div
          className="absolute h-2/3 w-2/3 flex justify-center items-center"
          style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
        >
          <img
            src="experienceLogos/dtu.png"
            alt="DTU logo"
            className="h-full w-full object-contain"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}