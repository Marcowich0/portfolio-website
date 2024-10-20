"use client";
import { motion } from 'framer-motion';

interface headlineProps {
  title: string;
}

const Headline = ({ title }: headlineProps) => {
  return (
    <motion.div>
      <div className="flex w-full h-20 md:h-[120px] md:justify-center mt-24">
        <h1 className="text-5xl 2k:text-7xl font-bold text-black">{title}</h1>
      </div>
      <div className="flex 2xl:justify-center w-full mt">
      </div>
    </motion.div>
  );
};

export default Headline;