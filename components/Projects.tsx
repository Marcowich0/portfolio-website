import { PinContainer } from "../components/ui/3d-pin";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { useProjects } from "@/store/projects";

interface project {
  key: number,
  title: string,
  monthYear: string,
  imagePath: string,
  image: string[],
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

  const projects = useProjects.getState().projects;
  console.log(projects);

  return (
    <div className="w-[68%] h-[68%] flex justify-between flex-wrap mt-10 relative">
      {isClient && projects.map((project) => (
        <motion.div
          key={project.key}
          variants={fadeInAnimation}
          initial="initial"
          whileInView="whileInView"
          onClick={() => {
            console.log(project);
            setChosenProject(project);
          }}
        >
          <PinContainer
            title={project.title}
            className=""
          >
            <div className={`flex basis-full flex-col tracking-tight text-slate-100/50 sm:basis-1/2 w-[22rem] h-[23rem] ${chosenProject === project ? 'opacity-30' : ''}`}>
              <img src={project.fullImagePath[0]} alt="project" className="w-full h-full rounded-2xl object-cover" style={{ bottom: "10px" }} />
            </div>
          </PinContainer>

          {chosenProject !== null && (
            <motion.div
              className="w-[1400px] h-[700px] bg-zinc-800 rounded-2xl border-zinc-500 border-4 absolute z-[60]"
              style={{ top: "47%", left: "50%", transform: "translate(-50%, -50%)" }}
            >
              <div className="flex flex-row items-end w-full h-full">

                <div className="w-1/2 h-full flex flex-col justify-between">
                  <h1 className="text-slate-200 text-4xl font-bold p-8">{chosenProject.title}</h1>
                  <div className="w-full h-full p-8 flex flex-col justify-between">
                    {chosenProject.description.map((desc, i) => (
                      <div className="flex flex-row items-center">
                        <div key={i} className="w-4 h-4 rounded-full bg-green-400 me-6 flex-shrink-0" />
                        <div key={i} className="text-slate-200 text-md font-bold">{desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-1/2 h-full flex flex-col justify-between">
                  <img src={chosenProject.fullImagePath[0]} alt="project" className="w-full h-full rounded-2xl object-cover" />
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>


      ))}

      {chosenProject !== null && (
        <div
          className="opacity-0 w-screen h-screen bg-purple-500 absolute z-[100]"
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