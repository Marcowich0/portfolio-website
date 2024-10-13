import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  imgSrc: string;
  delay: number;
  onClick: () => void;
}

interface Education {
  key: number;
  img: string;
  title: string;
  subtitle: string;
  year: string;
  location?: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ imgSrc, delay, onClick }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipped(prev => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[400px] overflow-hidden" onClick={onClick}>
      <motion.div
        className="relative flex justify-center items-center h-full rounded-2xl shadow-md border-[6px] border-zinc-300 cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 2, delay: delay }}
        style={{ perspective: 1000 }}
      >
        <motion.div
          className="absolute h-2/3 w-2/3 flex justify-center items-center"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 2, delay: delay }}
          style={{ perspective: 1000 }}
        >
          <img
            src={imgSrc}
            alt="DTU logo"
            className="h-full w-full object-contain"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function FlippingCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [chosenEducation, setChosenEducation] = useState<Education | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipped(prev => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const delay_time = 0.4;

  return (
    <div className='w-full h-full grid grid-cols-3 gap-8 relative'>
      <Card imgSrc="experienceLogos/htxlogo.png" delay={isFlipped ? delay_time : delay_time * 3} onClick={() => { setChosenEducation(education_data[0]) }} />
      <Card imgSrc="experienceLogos/dtu.png" delay={isFlipped ? delay_time * 2 : delay_time * 2} onClick={() => { setChosenEducation(education_data[1]) }} />
      <Card imgSrc="experienceLogos/dtu.png" delay={isFlipped ? delay_time * 3 : delay_time} onClick={() => { setChosenEducation(education_data[2]) }} />

      {chosenEducation && (
        <motion.div
          className="w-4/5 h-[400px] bg-zinc-100 rounded-2xl border-zinc-500 border-4 absolute z-[60] cursor-pointer flex flex-row justify-between"
          style={{ top: "50%", left: "50%" }}
          initial={{ opacity: 0, scale: 0, x: '-50%', y: "-50%" }}
          animate={{ opacity: 1, scale: 1, x: '-50%', y: "-50%", transition: { duration: 0.2 } }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={() => setChosenEducation(null)}
        >
          <div className="p-8 flex flex-row justify-between w-full">
            <div className='flex flex-col items-start'>
              <h1 className='text-black font-bold text-4xl'>{chosenEducation.title}</h1>
              <h2 className='text-red-600 font-bold text-2xl opacity-80 mt-2'>{chosenEducation.subtitle}</h2>
            </div>
            <div className='flex flex-col items-end'>
              <h1 className='text-black font-bold text-4xl opacity-80'>{chosenEducation.year}</h1>
              <h2 className='text-black font-bold text-2xl opacity-60 mt-2'>{chosenEducation.location}</h2>
            </div>
          </div>
          <div className="w-1/3 h-full p-8">
            <img src={chosenEducation.img} alt="education" className="w-full h-full object-contain" />
          </div>

          <div className='w-screen h-screen z-[70] opacity-0 absolute cursor-default' 
           style={{ top: "50%", left: "50%", transform:"translate(-50%,-50%)" }}
           onClick={() => setChosenEducation(null)}>
          </div>
        </motion.div>
      )}
    </div>
  );
}


const education_data = [
  {
    key: 0,
    img: "experienceLogos/htxlogo.png",
    title: "HTX -> Roskilde",
    subtitle: "Gymnasium - Math/Physics",
    year: "2016-2019",
    location: "Roskilde",
    description: "After primary school, i attended Roskilde Tekniske Gymnasium, on the math/physics line. Here i learned the basics of physics and math, and got a good foundation for my further studies in mechanical engineering",
  },
  {
    key: 1,
    img: "experienceLogos/dtu.png",
    title: "Technical University of Denmark",
    subtitle: "B.Sc. Mechanical Engineering",
    year: "2019-2022",
    location: "Kongens Lyngby",
    description: "After high school, i started studying mechanical engineering at the Technical University of Denmark. Here i learned the basics of mechanical engineering, and got a good foundation for my further studies in mechanical engineering",
  },
  {
    key: 2,
    img: "experienceLogos/dtu.png",
    title: "Technical University of Denmark",
    subtitle: "M.Sc. Mechanical Engineering",
    year: "2022-2025",
    location: "Kongens Lyngby",
    description: "After high school, i started studying mechanical engineering at the Technical University of Denmark. Here i learned the basics of mechanical engineering, and got a good foundation for my further studies in mechanical engineering",
  },
]