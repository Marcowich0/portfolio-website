"use client";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { useProjects } from "@/store/projects";
import { ArrowLeft, ArrowRight } from 'tabler-icons-react';

interface project {
  key: number,
  title: string,
  monthYear: string,
  imagePath: string,
  image: { path: string, args: string }[],
  description: string[],
  fullImagePath: string[],
}

const fadeInAnimation = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1, transition: { duration: 1, delay: 0.3 } },
};


export default function Projects() {
  const [isClient, setisClient] = useState(false);
  useEffect(() => {
    setisClient(true);
  }, []);

  const [chosenProject, setChosenProject] = useState<project | null>(null);
  const [currentPictureIndex, setCurrentPictureIndex] = useState(0);
  const [numberOfPicturesInProject, setNumberOfPicturesInProject] = useState(0);

  const projects = useProjects.getState().projects;
  console.log(projects);

  return (
    <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-4  relative">
      {isClient && projects.map((project) => (
        <motion.div
          key={project.key}
          //variants={fadeInAnimation}
          initial="initial"
          whileInView="whileInView"
          onClick={() => {
            console.log(project);
            if (!chosenProject) {
              setChosenProject(project);
              setCurrentPictureIndex(0);
              setNumberOfPicturesInProject(project.fullImagePath.length);
            }
          }}
        >
          <div className={`w-full h-full ${chosenProject === project ? 'opacity-30' : ''} transform transition-transform duration-200 hover:scale-105 cursor-pointer`}>
            <img src={project.fullImagePath[0]} alt="project" className="w-full h-full rounded-2xl object-cover" />
            <div className="absolute bottom-2 left-2 bg-zinc-800 flex items-center justify-center p-2 rounded-lg">
              <h1 className="text-zinc-200 text-md font-bold">{project.title}</h1>
            </div>
          </div>

          {chosenProject !== null && (
            <motion.div
            className="w-[1200px] min-h-[200px] max-h-[900px] bg-zinc-100 rounded-2xl border-zinc-500 border-4 absolute z-[60]"
            style={{ top: "50%", left: "50%" }}
            initial={{ opacity: 0, scale: 0, x: '-50%', y: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: "-50%", transition: { duration: 0.2 } }}
            exit={{ opacity: 0, scale: 0 }}
        >
            <div className="flex flex-row w-full h-full relative">
                <div className="w-1/2 h-full flex flex-col justify-start">
                    <h1 className="text-slate-800 text-4xl font-bold ps-8 pt-8">{chosenProject.title}</h1>
                    <h1 className="text-teal-600 text-2xl font-bold ps-8">{chosenProject.monthYear}</h1>
                    <div className="w-full h-full p-8 flex flex-col justify-between relative">
                        <div className="w-1 bg-teal-400 absolute" style={{ top: "50px", left: "40px", bottom: "50px", transform: "translateX(-50%)" }} />
                        {chosenProject.description.map((desc, i) => (
                            <div className="flex flex-row items-center h-12" key={i}>
                                <div className="w-4 h-4 rounded-full bg-teal-400 me-6 flex-shrink-0" />
                                <div className="text-slate-800 text-md font-bold">{desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-1/2 h-full right-0 p-4 absolute">
                    <div className='w-full h-full bg-zinc-800 rounded-2xl'>
                        <img
                            src={chosenProject.fullImagePath[currentPictureIndex]}
                            alt="project"
                            className="rounded-2xl h-full w-full object-contain"
                            style={{ userSelect: 'none' }}
                        />
                        <div className='absolute bottom-8 right-8 h-10 w-10 bg-zinc-400 rounded-full flex items-center justify-center hover:scale-105 transition duration-200 cursor-pointer' style={{ userSelect: 'none' }} onClick={
                            () => {
                                console.log('clicked');
                                setCurrentPictureIndex(currentPictureIndex < (numberOfPicturesInProject - 1) ? (currentPictureIndex + 1) : 0);
                            }
                        }>
                            <ArrowRight size={24} />
                        </div>
                        <div className='absolute bottom-8 left-8 h-10 w-10 bg-zinc-400 rounded-full flex items-center justify-center hover:scale-105 transition duration-200 cursor-pointer' style={{ userSelect: 'none' }} onClick={
                            () => {
                                console.log('clicked');
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
        </motion.div>


      ))}

      {chosenProject !== null && (
        <div
          className="opacity-0 w-screen h-screen bg-purple-500 absolute z-[59]"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          onClick={() => {
            console.log('cleared selection');
            setChosenProject(null);
          }}
        />
      )}
    </div>
  );

}