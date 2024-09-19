'use client';

import React, { use, useState, useEffect } from "react";
/* ------------ Import aceternity components ------------- */

import AnimatedHeadline from "@/components/AnimatedHeadline";
import SkillCategory from "@/components/SkillCategory";
import WorkExperience from "@/components/workExperience";
import Navbar from "@/components/navbar";
import HobbyTiles from "@/components/Hobbies";
import Projects from "@/components/Projects";
import ContactMe from "@/components/ContactMe";


import { delay, motion } from 'framer-motion';

const fadeInAnimation = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1, transition: { duration: 1, delay: 0.3 } },
};


export default function Home() {

  const smallHeadLineClassName = "text-black opacity-80 text-lg font-bold -mt-6"

  return (
    <main className="flex flex-col items-center overflow-hidden" style={{ background: '#FBFBFB' }}>

      {/* --------------------- Landing page -------------------- */}

      <div id="home"></div>
      <div className="w-screen h-screen bg-slate-500 z-[60]"
        style={{
          backgroundImage: `url("/mechanical_engineering.jpeg")`,
          backgroundSize: "cover", // Adjust as needed
          backgroundPosition: "center", // Adjust as needed
        }}>

        <div className="bottom-0 left-0 absolute p-12 flex flex-col">
          <h1 className="text-white font-bold -my-4 -ms-2 text-[120px] 2xl:text-[180px]" >Marc Clausen</h1>
          <h1 className="text-white font-bold -my-4 text-[50px] 2xl:text-[70px]">Mechanical Engineer</h1>
        </div>

      </div>

      <div className="overflow-x-visible w-[60%] " style={{
        scrollBehavior: "smooth",
      }}>

        <Navbar />


        {/* --------------------- Experience -------------------- */}

        <div id="experience"></div>

        <motion.div
          className="snap-start flex flex-col items-center w-full h-full overflow-visible"
        >
          <AnimatedHeadline title="Work Experience" />

          <motion.div >
            <h4 className={smallHeadLineClassName}> I have been working since my early teens, here is a quick overview of the companies i have contribuated to</h4>
          </motion.div>

          <div className="w-full h-[500px] mt-8 p-16 border-[6px] rounded-2xl border-zinc-300 overflow-visible mb-12">
            <WorkExperience />
          </div>

        </motion.div>




        {/* --------------------- Projects -------------------- */}



        <div id="projects"></div>
        <div
          className="snap-start flex flex-col items-center w-full h-full "
        >
          <AnimatedHeadline title="Projects" />
          <motion.div >
            <h4 className={smallHeadLineClassName}> I do personal projects all the time, here is a few notable ones as long with some from my studies</h4>
          </motion.div>

          <div className="w-full h-[800px] mt-12 mb-12">
            <Projects />
          </div>

        </div>


        {/* --------------------- Skills -------------------- */}

        <div id="skills"></div>
        <div
          className="snap-start flex flex-col items-center w-full h-full "
        >
          <AnimatedHeadline title="Skills" />

          <motion.div >
            <h4 className={smallHeadLineClassName}> Through Work, School and spare time projects, i gained experience in a veriety of programs and languages. Here is a quick categorized overview</h4>
          </motion.div>

          <div className="w-full h-full mt-8 mb-12">
          <SkillCategory />
          </div>
          

        </div>




        {/* --------------------- Hobies -------------------- */}

        <div id="hobies"></div>
        <div
          className="snap-start flex flex-col items-center w-full h-full "
        >
          <AnimatedHeadline title="Hobies" />

          <motion.div >
            <h4 className={smallHeadLineClassName}> Here is a quick overview of how i spend my spare time, click the images for more information!</h4>
          </motion.div>

          <motion.div className="w-full h-[800px] mt-8 mb-12">
            <HobbyTiles />
          </motion.div>

        </div>



        <div id="contact"></div>
        <AnimatedHeadline title="Contact me" />
        <div className="w-full h-[600px] mb-36 flex flex-col">
           <ContactMe />
        </div>
        
      </div>

    </main>
  );
}
