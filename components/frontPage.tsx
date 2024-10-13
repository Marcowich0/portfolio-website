import React from 'react';
import { useState, useEffect } from 'react';

export default function FrontPage() {
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
        <div className="w-screen h-screen bg-slate-500 z-[60] fixed"
        style={{
            bottom: `${scrollY}px`,
            left: "0px",
          backgroundImage: `url("/mechanical_engineering.jpeg")`,
          backgroundSize: "cover", // Adjust as needed
          backgroundPosition: "center", // Adjust as needed
        }}>

        <div className="bottom-0 left-0 absolute p-12 flex flex-col">
          <h1 className="text-white font-bold -my-4 -ms-2 text-[120px] 2xl:text-[180px]" >Marc Clausen</h1>
          <h1 className="text-white font-bold -my-4 text-[50px] 2xl:text-[70px]">Mechanical Engineer</h1>
        </div>

      </div>

        
    )
}