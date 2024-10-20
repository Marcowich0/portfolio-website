import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

interface Education {
  key: number;
  img: string;
  title: string;
  subtitle: string;
  year: string;
  location?: string;
  description: string;
  GPA: string;
}

interface CardProps {
  education: Education;
  delay: number;
  onClick: (position: { x: number; y: number; width: number; height: number }) => void;
}


const Card: React.FC<CardProps> = ({ education, delay, onClick }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipped(prev => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const parentRect = cardRef.current.parentElement?.getBoundingClientRect();
      if (parentRect) {
        onClick({
          x: rect.left - parentRect.left,
          y: rect.top - parentRect.top,
          width: rect.width,
          height: rect.height,
        });
      }
    }
  };

  return (
    <div className="w-full h-[400px] overflow-hidden transform transition-transform duration-200 hover:scale-105" ref={cardRef} onClick={handleClick}>
      <motion.div
        className="relative flex justify-center items-center h-full rounded-2xl shadow-md border-[6px] border-zinc-300 cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 2, delay: delay }}
        style={{ perspective: 1000 }}
      >
        <motion.div
          className="absolute h-full w-full flex flex-col justify-center items-center"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 2, delay: delay }}
          style={{ perspective: 1000 }}
        >
          <div className='h-[60%] w-[80%] relative mb-8'>
            <Image
              src={`/experienceLogos/${education.img}`}
              alt="DTU logo"
              fill style={{ objectFit: 'contain' }}
            />
          </div>

          <h1 className='absolute bottom-8 text-zinc-700 font-bold text-xl text-center'>{education.subtitle}</h1>

        </motion.div>
      </motion.div>
    </div>
  );
}

export default function FlippingCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [chosenEducation, setChosenEducation] = useState<Education | null>(null);
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipped(prev => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const delay_time = 0.4;

  const handleCardClick = (education: Education, position: { x: number; y: number; width: number; height: number }) => {
    setChosenEducation(education);
    setPopupPosition(position);
  };

  return (
    <div className='w-full h-full grid grid-cols-3 gap-8 relative'>
      <Card
        education={education_data[0]}
        delay={isFlipped ? delay_time : delay_time * 3}
        onClick={(position) => handleCardClick(education_data[0], position)}
      />
      <Card
        education={education_data[1]}
        delay={isFlipped ? delay_time * 2 : delay_time * 2}
        onClick={(position) => handleCardClick(education_data[1], position)}
      />
      <Card
        education={education_data[2]}
        delay={isFlipped ? delay_time * 3 : delay_time}
        onClick={(position) => handleCardClick(education_data[2], position)}
      />

      <AnimatePresence>
        {chosenEducation && popupPosition && (
          <motion.div
            className="bg-zinc-50 rounded-2xl border-zinc-500 border-4 overflow-hidden absolute"
            initial={{ left: popupPosition.x, top: popupPosition.y, width: popupPosition.width, height: popupPosition.height }}
            animate={{ width: '900px', height: '500px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
            exit={{ left: popupPosition.x, top: popupPosition.y, width: popupPosition.width, height: popupPosition.height, transform: 'translate(0%, 0%)' }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-full h-full absolute z-50 flex flex-col"
              initial={{ opacity: 0, scale: 0.7, }}
              animate={{ opacity: 1, scale: 1, }}
              exit={{ opacity: 0, scale: 0.7, }}
              transition={{ duration: 0.3 }}
            >

              <div className="p-8 flex flex-row w-full">
                <div className='flex flex-col items-start w-2/3'>
                  <h1 className='text-black font-bold text-3xl'>{chosenEducation.title}</h1>
                  <h2 className='text-red-600 font-bold text-xl opacity-80 mt-2'>{chosenEducation.subtitle}</h2>
                </div>
                <div className='flex flex-col w-1/3 items-end'>
                  <h1 className='text-black font-bold text-3xl opacity-80'>{chosenEducation.year}</h1>
                  <h2 className='text-black font-bold text-xl opacity-60 mt-2'>{chosenEducation.location}</h2>
                </div>
              </div>

              <div className='w-full h-full flex flex-row px-8 pb-8'>

                <div className='w-full h-full relative'>
                  <p className='text-zinc-800 font-bold text-lg'>{chosenEducation.description}</p>

                  <div className='absolute bottom-0 left-0 flex flex-row space-x-4'>
                    <button className='w-36 h-12 bg-red-600 flex justify-center items-center rounded-lg shadow-md hover:bg-red-700 active:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out'>
                      <p className='text-white font-bold text-lg'>Diploma</p>
                    </button>
                    {/* <button className='w-36 h-12 bg-red-600 flex justify-center items-center rounded-lg shadow-md hover:bg-red-700 active:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out'>
                    <p className='text-white font-bold text-lg'>Grades</p>
                    </button> */}
                  </div>

                  <p className='text-zinc-800 font-bold text-lg absolute bottom-0 right-0'>GPA: {chosenEducation.GPA}</p>
                </div>

                <div className='w-[350px] h-full rounded-xl flex justify-center items-center p-6 ms-8 bg-white border-4 border-zinc-300'>
                  <div className='relative w-full h-full'>
                    <Image src={`/experienceLogos/${chosenEducation.img}`} alt="education" fill style={{ objectFit: "contain" }} />
                  </div>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {chosenEducation && popupPosition && (
          <div className='w-screen h-screen z-40 opacity-0 bg-purple-200 absolute cursor-default'
            style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
            onClick={() => setChosenEducation(null)}>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const education_data = [
  {
    key: 0,
    img: "htx.webp",
    title: "HTX Roskilde",
    subtitle: "HTX - Math/Physics",
    year: "2016-2019",
    location: "Roskilde, Denmark",
    description: "After primary school, i attended Roskilde Tekniske Gymnasium, on the math/physics line. Here i learned the basics of physics and math, and got a good foundation for my further studies in mechanical engineering",
    GPA: "11.0",
  },
  {
    key: 1,
    img: "dtu.png",
    title: "Technical University of Denmark",
    subtitle: "B.Sc. Mechanical Engineering",
    year: "2019-2022",
    location: "Kongens Lyngby, Denmark",
    description: "For my bachelors degree i studied mechanical engineering at the Technical University of Denmark. Here i mostly took introductory courses to get a good foundations for my further studies. This included Math, Physics, Chemistry, Programming, Material science, Thermodynamics, Fluid dynamics, Strength of materials, and many more. For my thesis i investigated the posibility of using neural networks to analyze and optimize turbine wakes in large wind farms.",
    GPA: "10.1",
  },
  {
    key: 2,
    img: "dtu.png",
    title: "Technical University of Denmark",
    subtitle: "M.Sc. Mechanical Engineering",
    year: "2022-2025",
    location: "Kongens Lyngby, Denmark",
    description: "For my masters degree I continued my studies at the Technical University of Denmark. Here i began to specialize in programming, computational fluid dynamics and robotics. I also decided to prolong my studies by half a year, as this allowed me to get experience in the industy.",
    GPA: "10.0",
  },
];