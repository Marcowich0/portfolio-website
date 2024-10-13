import React from 'react';
import { useState, useEffect } from 'react';
import AnimatedHeadline from './AnimatedHeadline';
import ContactMe from './ContactMe';

interface BackPageProps {
  elementHeight: number;
}

export default function BackPage({ elementHeight }: BackPageProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="w-screen h-screen bg-slate-500 z-[60] fixed flex justify-center items-center"
      style={{
        top: `${elementHeight - scrollY}px`,
        left: "0px",
        backgroundImage: `url("/mechanical_engineering.jpeg")`,
        backgroundSize: "cover", // Adjust as needed
        backgroundPosition: "center", // Adjust as needed
      }}>

      <div className="bg-white border-[6px] border-zinc-300 rounded-2xl px-16 pb-16">
        <AnimatedHeadline title="Contact me" />
        <div className="w-[1400px] h-[600px]  flex flex-col ">
          <ContactMe />
        </div>
      </div>

    </div>


  )
}