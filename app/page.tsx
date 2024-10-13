'use client';

import React, { use, useState, useEffect, useRef } from "react";
/* ------------ Import aceternity components ------------- */

import FrontPage from "@/components/frontPage";
import AnimatedHeadline from "@/components/AnimatedHeadline";
import SkillCategory from "@/components/SkillCategory";
import WorkExperience from "@/components/workExperience";
import Navbar from "@/components/navbar";
import HobbyTiles from "@/components/Hobbies";
import AnimatedProjects from "@/components/animatedProjects";
import ContactMe from "@/components/ContactMe";
import FlippingCard from "@/components/flipperCard";

import BackPage from "@/components/backPage";

import { motion } from 'framer-motion';

export default function Home() {

  const smallHeadLineClassName = "text-black opacity-80 text-lg font-bold -mt-6"

  const elementRef = useRef<HTMLDivElement>(null);
  const [mainPageHeight, setMainPageHeight] = useState(0);
  const [frontPagelag, setFrontPagelag] = useState(0);
  const frontPagelagRef = useRef(frontPagelag);
  const [isSticky, setIsSticky] = useState(false);
  const [fixedPosition, setFixedPosition] = useState("0px");
  const [totalHeight, setTotalHeight] = useState(0);

  useEffect(() => {
    // Set the initial values for frontPagelag and mainPageHeight
    setFrontPagelag(window.innerHeight + 200);
    setMainPageHeight(elementRef.current ? elementRef.current.getBoundingClientRect().height : 0);
    
    // Reset scroll position to top on page refresh
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Update the ref whenever frontPagelag changes
    frontPagelagRef.current = frontPagelag;
    setTotalHeight(mainPageHeight + frontPagelag + window.innerHeight + 200);
  }, [frontPagelag]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < frontPagelagRef.current) {
        setIsSticky(true);
        setFixedPosition("0px");
      } else if (window.scrollY > frontPagelagRef.current && window.scrollY < mainPageHeight + 200) {
        setIsSticky(false);
        setFixedPosition(`${frontPagelagRef.current}px`);
      }
      else if (window.scrollY > mainPageHeight + 200) {
        setIsSticky(true);
        setFixedPosition(`${-mainPageHeight + window.innerHeight}px`);
      }
      console.log("logs")
      console.log("scrollY", window.scrollY)
      console.log("frontPagelag", frontPagelag)
      console.log("mainPageHeight", mainPageHeight)
      console.log("isSticky", isSticky)
      console.log("fixedPosition", fixedPosition)
      };

      

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSticky, fixedPosition, mainPageHeight]);

  

  return (
    <main className="flex flex-col items-center overflow-hidden scroll-smooth bg-white" style={{ background: '#FBFBFB', scrollBehavior: "smooth" }}>

      {/* --------------------- Landing page -------------------- */}
      <div id="home"></div>
      <FrontPage />
      <BackPage elementHeight={mainPageHeight + frontPagelag + 200} />

      {/* --------------------- Contact me -------------------- */}



      {/* --------------------- layout of scrollable section -------------------- */}
      <div style={{
        height: `${totalHeight}px`,
        opacity: 0,
      }} />

      <div className="overflow-x-visible w-[60%]" style={{
        scrollBehavior: "smooth",
        position: isSticky ? "fixed" : "absolute",
        top: fixedPosition,
      }}
        ref={elementRef}>
        <Navbar />

        {/* --------------------- Experience -------------------- */}

        <div id="experience"></div>

        <motion.div
          className="snap-start flex flex-col items-center w-full h-full overflow-visible mt-24"
        >
          <AnimatedHeadline title="Work Experience" />

          <motion.div className="mb-4">
            <h4 className={smallHeadLineClassName}> I have been working since my early teens, here is a quick overview of the companies i have contribuated to</h4>
          </motion.div>

          <div className="w-full h-[500px] mt-8 p-16 border-[6px] rounded-2xl border-zinc-300 overflow-visible ">
            <WorkExperience />
          </div>

        </motion.div>


        {/* --------------------- Education -------------------- */}

        <div id="education"></div>

        <motion.div
          className="snap-start flex flex-col items-center w-full h-full overflow-visible mt-24"
        >
          <AnimatedHeadline title="Education" />

          <motion.div className="mb-4">
            <h4 className={smallHeadLineClassName}> I have been working since my early teens, here is a quick overview of the companies i have contribuated to</h4>
          </motion.div>

          <FlippingCard />

        </motion.div>




        {/* --------------------- Projects -------------------- */}



        <div id="projects"></div>
        <div
          className="snap-start flex flex-col items-center w-full h-full mt-24"
        >
          <AnimatedHeadline title="Projects" />
          <motion.div >
            <h4 className={smallHeadLineClassName}> I do personal projects all the time, here is a few notable ones as long with some from my studies</h4>
          </motion.div>

          <div className="w-full h-full mt-12">
            <AnimatedProjects />
          </div>

        </div>


        {/* --------------------- Skills -------------------- */}

        <div id="skills"></div>
        <div
          className="snap-start flex flex-col items-center w-full h-full mt-24"
        >
          <AnimatedHeadline title="Skills" />

          <motion.div >
            <h4 className={smallHeadLineClassName}> Through Work, School and spare time projects, i gained experience in a veriety of programs and languages. Here is a quick categorized overview</h4>
          </motion.div>

          <div className="w-full h-full mt-12">
            <SkillCategory />
          </div>


        </div>




        {/* --------------------- Hobbies -------------------- */}

        <div id="hobies"></div>
        <div
          className="snap-start flex flex-col items-center w-full h-full mt-24"
        >
          <AnimatedHeadline title="Hobbies" />

          <motion.div >
            <h4 className={smallHeadLineClassName}> Here is a quick overview of how i spend my spare time, click the images for more information!</h4>
          </motion.div>

          <motion.div className="w-full h-[800px] mt-8 mb-48">
            <HobbyTiles />
          </motion.div>

        </div>


      </div>

    </main>
  );
}
