import { PinContainer } from "../components/ui/3d-pin";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { useProjects } from "@/store/projects";

const fadeInAnimation = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1, transition: { duration: 1, delay: 0.3 } },
  };
export default function Projects() {
    const [isClient, setisClient] = useState(false);
  useEffect(() => {
    setisClient(true);
  }, []);

  const projects = useProjects.getState().projects;
  console.log(projects);

  return(
    <div className="w-[68%] h-[68%] flex justify-between flex-wrap mt-10">


    {isClient && projects.map((project) => (

      <motion.div
        variants={fadeInAnimation}
        initial="initial"
        whileInView="whileInView"
        onClick={() => console.log(project)}
      >
        <PinContainer
          key={project.key}
          title={project.title}
          className=""
        >
          <div className="flex basis-full flex-col tracking-tight text-slate-100/50 sm:basis-1/2 w-[22rem] h-[23rem] ">

            <img src={project.fullImagePath[0]} alt="project" className="w-full h-full rounded-2xl object-cover" style={{ bottom: "10px" }} />
          </div>
        </PinContainer>
      </motion.div>
    ))}

  </div>
  )
   
}