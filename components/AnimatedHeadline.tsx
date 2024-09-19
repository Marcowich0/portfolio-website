"use client";
import { motion } from 'framer-motion';

const headlineAnimation = {
  initial: { opacity: 0, y: -50 },
  whileInView: { opacity: 1, y: 0, transition: { type: "spring", duration: 1.25, delay: 0 } },
};

const AnimatedHeadline = ({ title }) => {
  return (
    <motion.div
      //variants={headlineAnimation}
      //initial="initial"
     // whileInView="whileInView"
    >
      <div className="flex w-full h-20 md:h-[120px] md:justify-center mt-24">
        <h1 className="text-5xl 2k:text-7xl font-bold text-black">{title}</h1>
      </div>
      <div className="flex 2xl:justify-center w-full mt">
      </div>
    </motion.div>
  );
};


const AnimatedSmallHeadline = ({ title }) => {
  return (
    <motion.div
      variants={headlineAnimation}
      initial="initial"
      whileInView="whileInView"
    >
      <div className="flex w-full h-20 md:h-[120px] md:justify-center mt-24">
        <h1 className="text-4xl md:text-6xl font-bold  text-black">{title}</h1>
      </div>
      <div className="flex md:justify-center w-full mt">
      </div>
    </motion.div>
  );
};

export default AnimatedHeadline;