'use client';

import React, { use, useState, useEffect, useRef } from "react";
/* ------------ Import aceternity components ------------- */

import FrontPage from "@/components/frontPage";
import AnimatedHeadline from "@/components/AnimatedHeadline";
import SkillCategory from "@/components/SkillCategory";
import WorkExperience from "@/components/workExperience";
import Navbar from "@/components/navbar";
import HobbyFrames from "@/components/hobbyFrames";
import AnimatedProjects from "@/components/animatedProjects";
import FlippingCard from "@/components/education";

import BackPage from "@/components/backPage";

import { motion } from 'framer-motion';

export default function Home() {

  const smallHeadLineClassName = "text-black opacity-80 text-lg font-bold -mt-6 w-[80%] text-center";

  const elementRef = useRef<HTMLDivElement>(null);
  const [mainPageHeight, setMainPageHeight] = useState(0);
  const [frontPagelag, setFrontPagelag] = useState(0);
  const frontPagelagRef = useRef(frontPagelag);
  const [isSticky, setIsSticky] = useState(false);
  const [fixedPosition, setFixedPosition] = useState("0px");
  const [totalHeight, setTotalHeight] = useState(0);
  const [animateWorkExperience, setAnimateWorkExperience] = useState(false);

  const lag = 200;

  useEffect(() => {
    // Set the initial values for frontPagelag and mainPageHeight
    setFrontPagelag(window.innerHeight + lag);
    setMainPageHeight(elementRef.current ? elementRef.current.getBoundingClientRect().height : 0);

    // Reset scroll position to top on page refresh
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const updateHeights = () => {
      frontPagelagRef.current = frontPagelag;
      setTotalHeight(mainPageHeight + frontPagelag + window.innerHeight + lag);
    };

    // Initial update
    updateHeights();

    // Add event listener for resize
    window.addEventListener('resize', updateHeights);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', updateHeights);
  }, [frontPagelag, mainPageHeight, lag]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setAnimateWorkExperience(true);
      }
      if (window.scrollY < frontPagelagRef.current) {
        setIsSticky(true);
        setFixedPosition("0px");
      } else if (window.scrollY > frontPagelagRef.current && window.scrollY < mainPageHeight + lag) {
        setIsSticky(false);
        setFixedPosition(`${frontPagelagRef.current}px`);
      }
      else if (window.scrollY > mainPageHeight + lag) {
        setIsSticky(true);
        setFixedPosition(`${-mainPageHeight + window.innerHeight}px`);
      }
    };



    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSticky, fixedPosition, mainPageHeight]);



  return (
    <main className="flex flex-col items-center overflow-hidden scroll-smooth bg-white" style={{ background: '#FBFBFB' }}>
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

          <motion.div className="mb-12 flex justify-center">
            <h4 className={smallHeadLineClassName}> I have been working since my early teens, here is a quick overview of the companies i have contribuated to</h4>
          </motion.div>

          <WorkExperience animate={animateWorkExperience}/>

        </motion.div>


        {/* --------------------- Education -------------------- */}

        <div id="education"></div>

        <motion.div
          className="snap-start flex flex-col items-center w-full h-full overflow-visible mt-24"
        >
          <AnimatedHeadline title="Education" />

          <motion.div className="mb-12 flex justify-center">
            <h4 className={smallHeadLineClassName}> I have a masters degree in mechanical engineering, here is an overview of my education earning that title</h4>
          </motion.div>

          <FlippingCard />

        </motion.div>




        {/* --------------------- Projects -------------------- */}



        <div id="projects"></div>
        <div
          className="snap-start flex flex-col items-center w-full h-full mt-24"
        >
          <AnimatedHeadline title="Projects" />
          <motion.div className=" flex justify-center">
            <h4 className={smallHeadLineClassName}> I do personal projects all the time, here is a few notable ones, as long with some from my studies</h4>
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

          <motion.div className="flex justify-center">
            <h4 className={smallHeadLineClassName}> Through Work, School and spare time projects, i have gained experience in a veriety of applications and programming languages. Here is a quick categorized overview of my skilllevel</h4>
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

          <motion.div className=" flex justify-center">
            <h4 className={smallHeadLineClassName}> Here is a quick overview of what I like to do in my spare time</h4>
          </motion.div>

          <motion.div className="w-full h-[500px] 2k:h-[700px] mt-16 mb-48">
            <HobbyFrames />
          </motion.div>

        </div>


      </div>

    </main>
  );
}
