import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

interface CardProps {
  imgSrc: string;
  delay: number;
  onClick: (position: { x: number; y: number; width: number; height: number }) => void;
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
          className="absolute h-2/3 w-2/3 flex justify-center items-center"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 2, delay: delay }}
          style={{ perspective: 1000 }}
        >
          <Image
            src={imgSrc}
            alt="DTU logo"
            fill style={{ objectFit: 'contain' }}
          />
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
        imgSrc="/experienceLogos/htxlogo.png"
        delay={isFlipped ? delay_time : delay_time * 3}
        onClick={(position) => handleCardClick(education_data[0], position)}
      />
      <Card
        imgSrc="/experienceLogos/dtu.png"
        delay={isFlipped ? delay_time * 2 : delay_time * 2}
        onClick={(position) => handleCardClick(education_data[1], position)}
      />
      <Card
        imgSrc="/experienceLogos/dtu.png"
        delay={isFlipped ? delay_time * 3 : delay_time}
        onClick={(position) => handleCardClick(education_data[2], position)}
      />

      <AnimatePresence>
        {chosenEducation && popupPosition && (
          <motion.div
            className="bg-zinc-50 rounded-2xl border-zinc-500 border-4 absolute z-[60] cursor-pointer flex flex-col"
            initial={{ x: popupPosition.x, y: popupPosition.y, width: popupPosition.width, height: popupPosition.height, opacity: 0 }}
            animate={{ width: '900px', height: '500px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', opacity: 1 }}
            exit={{ x: popupPosition.x, y: popupPosition.y, width: popupPosition.width, height: popupPosition.height, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setChosenEducation(null)}
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

            <div className='w-full h-full flex flex-row p-4'>

              <div className='w-full h-full'>

              </div>

              <div className='w-[350px] h-full rounded-xl flex justify-center items-center p-4 ms-4 bg-white border-4 border-zinc-300'>
                <div className='relative w-full h-full'>
                  <Image src={`/experienceLogos/${chosenEducation.img}`} alt="education" fill style={{ objectFit: "contain" }} />
                </div>
              </div>

            </div>



            <div className='w-screen h-screen z-[70] opacity-0 absolute cursor-default'
              style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
              onClick={() => setChosenEducation(null)}>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const education_data = [
  {
    key: 0,
    img: "htxlogo.png",
    title: "HTX -> Roskilde",
    subtitle: "Gymnasium - Math/Physics",
    year: "2016-2019",
    location: "Roskilde",
    description: "After primary school, i attended Roskilde Tekniske Gymnasium, on the math/physics line. Here i learned the basics of physics and math, and got a good foundation for my further studies in mechanical engineering",
  },
  {
    key: 1,
    img: "dtu.png",
    title: "Technical University of Denmark",
    subtitle: "B.Sc. Mechanical Engineering",
    year: "2019-2022",
    location: "Kongens Lyngby",
    description: "After high school, i started studying mechanical engineering at the Technical University of Denmark. Here i learned the basics of mechanical engineering, and got a good foundation for my further studies in mechanical engineering",
  },
  {
    key: 2,
    img: "dtu.png",
    title: "Technical University of Denmark",
    subtitle: "M.Sc. Mechanical Engineering",
    year: "2022-2025",
    location: "Kongens Lyngby",
    description: "After high school, i started studying mechanical engineering at the Technical University of Denmark. Here i learned the basics of mechanical engineering, and got a good foundation for my further studies in mechanical engineering",
  },
];