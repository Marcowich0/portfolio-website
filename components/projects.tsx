"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

import { useProjects } from "@/store/projects";
import { ArrowLeft, ArrowRight } from 'tabler-icons-react';
import { v4 as uuidv4 } from 'uuid';


import Image from 'next/image';

interface project {
  key: number,
  title: string,
  monthYear: string,
  imagePath: string,
  image: { path: string, args: string }[],
  description: string[],
  fullImagePath: string[],
}

const cardVariants = {
  normal: {
    rotateX: 0,
    translateY: 0,
    zIndex: 1
  },
  hover: {
    rotateX: 60,
    translateY: 50,
    zIndex: 100,
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const overlayVariants = {
  normal: {
    opacity: 0
  },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.2
    }
  }
};



const RenderProjects = (projects: project[], direction: 'left' | 'right' = 'left', setChosenProject: (project: project) => void) => {

  const [projectWidth, setProjectWidth] = useState(400);

  useEffect(() => {
    // Function to update width based on window size
    const updateWidth = () => {
      // You can add your own logic here, for example:
      if (window.innerWidth < 1400) {
        setProjectWidth(250);
      } else if (window.innerWidth < 1800) {
        setProjectWidth(325);
      } else {
        setProjectWidth(400);
      }
    };

    // Set initial width
    updateWidth();

    // Add event listener
    window.addEventListener('resize', updateWidth);

    // Cleanup event listener
    return () => window.removeEventListener('resize', updateWidth);
  }, []); 

  const margin = 32;
  const width = projects.length * (projectWidth + margin);
  const totalWidth = (width + margin) * 2;
  const duration = width / 20;

  const animateX = direction === 'left' ? [-width, -2 * width] : [-width, 0];

  return (
    <motion.div
      className=" h-full"
      initial={{ x: width }}
      animate={{ x: animateX }}
      transition={{
        duration: duration,
        ease: 'linear',
        repeat: Infinity,
      }}
    >
      <div
        className="flex flex-row items-center h-full space-x-8"
        style={{ width: `${totalWidth}px` }}
      >
        {Array.from({ length: 6 }).map(() =>
          projects.map((project) => (
            <motion.div 
                key={project.key}
                className="h-full w-full"
                initial="normal"
                whileHover="hover"
                animate="normal"
              >
                <motion.div
                  key={uuidv4()}
                  className="flex-shrink-0 rounded-2xl relative"
                  style={{
                    width: `${projectWidth}px`,
                    height: '300px',
                    perspective: '1000px'
                  }}
                >
                  <motion.div
                    className="w-full h-full relative"
                    style={{
                      transformStyle: 'preserve-3d',
                    }}
                    variants={cardVariants}
                  >
                    <div className="absolute inset-0">
                      <Image
                        src={project.fullImagePath[0]}
                        alt={`Skill ${project.key}`}
                        fill 
                        style={{ objectFit: 'cover' }}
                        className="rounded-2xl h-full w-full"
                      />
                    </div>
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg cursor-pointer"
                      variants={overlayVariants}
                      onClick={() => setChosenProject(project)}
                    >
                      <motion.span 
                        className="text-white text-lg font-bold"
                        variants={overlayVariants}
                      >
                        {project.title}
                      </motion.span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};


export default function AnimatedProjects() {
  const projects = useProjects((state) => state.projects);
  const midIndex = Math.ceil(projects.length / 2);
  const firstHalf = projects.slice(0, midIndex);
  const secondHalf = projects.slice(midIndex);

  const [chosenProject, setChosenProject] = useState<project | null>(null);
  const [currentPictureIndex, setCurrentPictureIndex] = useState(0);
  const [numberOfPicturesInProject, setNumberOfPicturesInProject] = useState(0);

  useEffect(() => {
    if (chosenProject) {
      setNumberOfPicturesInProject(chosenProject.fullImagePath.length);
    }
  }, [chosenProject]);

  useEffect(() => {
    const interval = setInterval(() => {
    }, 5000);

    return () => clearInterval(interval);
  }, [chosenProject]);

  return (
    <div className='w-full h-auto relative '>
      <div className='w-full h-full justify-center overflow-hidden'>
        <div className='w-[8000px] flex flex-col space-y-8'>
          {RenderProjects(firstHalf, "right", setChosenProject)}
          {RenderProjects(secondHalf, "left", setChosenProject)}
        </div>

      </div>
      <AnimatePresence>
        {chosenProject !== null && (
          <motion.div
            className="w-[900px] 2k:w-[1200px] min-h-[200px] max-h-[900px] bg-zinc-100 rounded-2xl border-zinc-500 border-4 z-[60] absolute"
            initial={{ left: "50%", top: "50%", transform: "translate(-50%, -50%) scale(0)" }}
            animate={{ left: "50%", top: "50%", transform: "translate(-50%, -50%) scale(1)" }}
            exit={{ left: "50%", top: "50%", transform: "translate(-50%, -50%) scale(0)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-row w-full h-full relative">
              <div className="w-1/2 h-full flex flex-col justify-start">
                <h1 className="text-zinc-800 text-4xl font-bold ps-8 pt-8">{chosenProject.title}</h1>
                <h1 className="text-teal-600 text-2xl font-bold ps-8">{chosenProject.monthYear}</h1>
                <div className="w-full h-full p-8 flex flex-col justify-between relative">
                  <div className="w-1 bg-teal-400 absolute" style={{ top: "52px", left: "40px", bottom: "52px", transform: "translateX(-50%)" }} />
                  {chosenProject.description.map((desc, i) => (
                    <div className="flex flex-row items-center h-14" key={i}>
                      <div className="w-4 h-4 rounded-full bg-teal-400 me-6 flex-shrink-0" />
                      <div className="text-slate-800 text-sm 2k:text-md font-bold">{desc}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-1/2 h-full right-0 p-4 absolute">
                <div className='w-full h-full bg-zinc-800 rounded-2xl relative'>
                  <Image
                    src={chosenProject.fullImagePath[currentPictureIndex]}
                    alt="project"
                    className="rounded-2xl h-full w-full object-contain"
                    style={{ userSelect: 'none', objectFit: 'contain' }}
                    fill
                  />
                  <div className='absolute bottom-8 right-8 h-10 w-10 bg-zinc-400 rounded-full flex items-center justify-center hover:scale-105 transition duration-200 cursor-pointer' style={{ userSelect: 'none' }} onClick={
                    () => {
                      setCurrentPictureIndex(currentPictureIndex < (numberOfPicturesInProject - 1) ? (currentPictureIndex + 1) : 0);
                    }
                  }>
                    <ArrowRight size={24} />
                  </div>
                  <div className='absolute bottom-8 left-8 h-10 w-10 bg-zinc-400 rounded-full flex items-center justify-center hover:scale-105 transition duration-200 cursor-pointer' style={{ userSelect: 'none' }} onClick={
                    () => {
                      setCurrentPictureIndex(currentPictureIndex > 0 ? (currentPictureIndex - 1) : (numberOfPicturesInProject - 1));
                    }
                  }>
                    <ArrowLeft size={24} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {chosenProject !== null && (
        <div
          className="opacity-0 w-screen h-screen bg-purple-500 absolute z-[59]"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          onClick={() => {
            setChosenProject(null);
            setCurrentPictureIndex(0);
          }}
        />
      )}
    </div>
  );
}