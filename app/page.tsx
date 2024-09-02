'use client';

import React, { use, useState, useEffect } from "react";
/* ------------ Import aceternity components ------------- */
import { Vortex } from "../components/ui/vortex";
import { BackgroundGradient } from "../components/ui/background-gradient";
import { PinContainer } from "../components/ui/3d-pin";

import MainHeadline from "@/components/MainHeadline";
import AnimatedHeadline from "@/components/AnimatedHeadline";
import SkillCategory from "@/components/SkillCategory";
import WorkExperience from "@/components/workExperience";
import Navbar from "@/components/navbar";
import HobbyTiles from "@/components/Hobbies";
import Projects from "@/components/Projects";



import { delay, motion } from 'framer-motion';

const fadeInAnimation = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1, transition: { duration: 1, delay: 0.3 } },
};

const headlineAnimation = {
  initial: { opacity: 0, y: -50 },
  whileInView: { opacity: 1, y: 0, transition: { type: "spring", duration: 1.25, delay: 0.5 } },
};

export default function Home() {

  const smallHeadLineClassName = "text-slate-100/50 text-lg font-bold -mt-6"

  return (
    <main className="flex flex-col items-center" style={{ background: 'rgb(0, 0, 0)' }}>


      <div className="w-screen h-screen overflow-y-scroll scroll-smooth snap-y snap-proximity">

        <Navbar />

        {/* --------------------- Landing page -------------------- */}

        <div id="home"></div>
        <Vortex
          className="snap-start flex flex-col items-center w-full h-full "
        >
          <div className="flex w-[68%] h-screen justify-between flex-row items-center">
            <MainHeadline />

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}>
              <div className=" flex justify-center items-center w-full h-2/5">
                <img src="/DSE 2022.jpg" alt="hero" className=" h-96 w-96 object-cover rounded-full border-spacing-2 border-white border-8 " />
              </div>
            </motion.div>
          </div>




        </Vortex>


        {/* --------------------- Experience -------------------- */}

        <div id="experience"></div>

        <motion.div
          className="snap-start flex flex-col items-center w-full h-full "
        >
          <AnimatedHeadline title="Work Experience" />

          <motion.div variants={headlineAnimation} initial="initial" whileInView="whileInView">
            <h4 className={smallHeadLineClassName}> I have been working since my early teens, here is a quick overview of the companies i have contribuated to</h4>
          </motion.div>

          <div className="w-[67%] h-[64%] mt-8">
            <BackgroundGradient className="rounded-[22px] p-30 sm:p-10 bg-white dark:bg-gray-950 w-full h-full" containerClassName="w-full h-full">
              <WorkExperience />
            </BackgroundGradient>
          </div>

        </motion.div>




        {/* --------------------- Projects -------------------- */}



        <div id="projects"></div>
        <div
          className="snap-start flex flex-col items-center w-full h-full "
        >
          <AnimatedHeadline title="Projects" />
          <motion.div variants={headlineAnimation} initial="initial" whileInView="whileInView">
            <h4 className={smallHeadLineClassName}> I do personal projects all the time, here is a few notable ones as long with some from my studies</h4>
          </motion.div>


          <Projects />

        </div>


        {/* --------------------- Skills -------------------- */}

        <div id="skills"></div>
        <div
          className="snap-start flex flex-col items-center w-full h-full "
        >
          <AnimatedHeadline title="Skills" />

          <motion.div variants={headlineAnimation} initial="initial" whileInView="whileInView">
            <h4 className={smallHeadLineClassName}> Through Work, School and spare time projects, i gained experience in a veriety of programs and languages. Here is a quick categorized overview</h4>
          </motion.div>

          <div className="w-[68%] h-[76%]">
            <SkillCategory />
          </div>

        </div>




        {/* --------------------- Hobies -------------------- */}

        <div id="hobies"></div>
        <div
          className="snap-start flex flex-col items-center w-full h-full "
        >
          <AnimatedHeadline title="Hobies" />

          <motion.div variants={headlineAnimation} initial="initial" whileInView="whileInView">
            <h4 className={smallHeadLineClassName}> Here is a quick overview of how i spend my spare time, click the images for more information!</h4>
          </motion.div>

          <motion.div variants={fadeInAnimation} initial="initial" whileInView="whileInView" className="w-[68%] h-[65%] mt-8">
            <HobbyTiles />
          </motion.div>

        </div>
      </div>

    </main>
  );
}
