import React from "react";
import { motion } from "framer-motion";

const FramePositions = [
    {
        bottom: "0%",
        left: "0%",
        width: "30%",
        height: "40%"
    },
    {
        bottom: "8%",
        right: "2%",
        width: "18%",
        height: "26%"
    },
    {
        bottom: "8%",
        left: "28%",
        width: "26%",
        height: "28%"
    },
    {
        top: "10%",
        right: "0%",
        width: "28%",
        height: "60%"
    },
    {
        bottom: "4%",
        left: "52%",
        width: "30%",
        height: "36%"
    },
    {
        top: "2%",
        left: "53%",
        width: "26%",
        height: "36%"
    },
    {
        top: "0%",
        left: "6%",
        width: "30%",
        height: "30%"
    },
    {
        top: "26%",
        left: "8%",
        width: "26%",
        height: "44%"
    },
    {
        top: "6%",
        left: "34%",
        width: "22%",
        height: "20%"
    },
    {
        top: "22%",
        left: "32%",
        width: "44%",
        height: "44%"
    }
];

const hobbyInformation = [
    {
        id: 4,
        headline: "Disc golf",
        content: "Some friends recently introduced me to disc golf, and though I still find the sport a bit odd, I find myself playing more and more. I have a small collection of discs, and usually go to the course at least once per week.",
        className: "md:col-span-3",
        thumbnail:
            "https://i.redd.it/mqvsmm8595cz.jpg",
    },
    {
        id: 1,
        headline: "3D-Printing",
        content: "I have been 3D printing for over 5 years now, making everything from small trinkets to large scale projects. I currently own a Bambu lab P1S, and primarily design my own models in SolidWorks.",
        className: "md:col-span-2",
        thumbnail:
            "https://cyetesiooa.cloudimg.io/https://www.fespa.com/getattachment/7280cea0-9f30-471c-9a8d-7590aca555ac/3DPrintingOpportunities.png?width=750",
    },
    {
        id: 3,
        headline: "Board games",
        content: "As electronics are becomming more and more prevalent in our lives, I find that it is nice from time to tome to sit down with friends and play a board game. I only have a small collection of games, but am looking to add more.",
        className: "col-span-2",
        thumbnail:
            "https://larepublica.cronosmedia.glr.pe/migration/images/3WTIP6E2DFHRJKSKUKO2BOPWOQ.jpg",
    },
    {
        id: 2,
        headline: "Video games",
        content: "I have played vairous video games for over 18 years now, and have played all genres across all platforms. I dont have as much time for games as i used to, but play a little FPS when on my PC when i can.",
        className: "col-span-2",
        thumbnail:
            "https://i.pinimg.com/originals/f2/d8/32/f2d8321da9ff317e9d1b9f676ce71e1b.jpg",
    },
    {
        id: 5,
        headline: "Music",
        content: "I first picked up the guitar in the last years of primary school, and have been playing ever since. I have since then also picked up piano and ukulele, and though i am not super skilled, I enjoy playing and singing for myself.",
        className: "md:col-span-3",
        thumbnail:
            "https://images.pexels.com/photos/1751731/pexels-photo-1751731.jpeg",
    },
    {
        id: 6,
        headline: "Food",
        content: "Unfortunatly for my health, I have been a foodie all my life. I find great joy in a good meal, and like to put in the effort when i have the time. I am by no means a michelin chef, but I like to think that I can make a decent meal.",
        className: "col-span-2",
        thumbnail:
            "https://massystoresgy.com/wp-content/uploads/2014/05/PORK-TACOS-WITH-BLACK-BEANS.jpg",
    },
    {
        id: 7,
        headline: "Exercise",
        content: "Being honest, i am not a huge fan of exercise, but find it important for my health to be in a reasonable shape. I usually go to the gym at least once a week, complimented by daily walks or runs.",
        className: "col-span-2",
        thumbnail:
            "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?cs=srgb&dl=pexels-victorfreitas-841130.jpg&fm=jpg",
    },
    {
        id: 8,
        headline: "Chess",
        content: "I am have always enjoyed fantasy as a genre in both games, books and movies. I do, however, think that the absolute best way to emerge yourself in these magical worlds is through a good book. Some of my favorites are the Mistborn and Stormlight Archive series by Brandon Sanderson.",
        className: "md:col-span-2",
        thumbnail:
            "https://miro.medium.com/v2/resize:fit:1400/0*7vjmydZ08olIO1ci",
    },
    {
        id: 9,
        headline: "Poker",
        content: "I am have always enjoyed fantasy as a genre in both games, books and movies. I do, however, think that the absolute best way to emerge yourself in these magical worlds is through a good book. Some of my favorites are the Mistborn and Stormlight Archive series by Brandon Sanderson.",
        className: "md:col-span-2",
        thumbnail:
            "https://www.ziprecruiter.com/svc/fotomat/public-ziprecruiter/uploads/career_advice/interview_questions/casino_revenue_auditor.webp",
    },
    {
        id: 10,
        headline: "Reading",
        content: "I am have always enjoyed fantasy as a genre in both games, books and movies. I do, however, think that the absolute best way to emerge yourself in these magical worlds is through a good book. Some of my favorites are the Mistborn and Stormlight Archive series by Brandon Sanderson.",
        className: "md:col-span-2",
        thumbnail:
            "https://www.tecnicasreunidas.es/wp-content/uploads/2024/02/ai-generated-8479245_1920.jpg",
    }
];


export default function HobbyFrames() {
    const [selectedHobby, setSelectedHobby] = React.useState(null);
    return (
      <div className="w-full h-[700px] relative">
        {hobbyInformation.map((hobby, index) => (
          <motion.div
            key={index}
            className="absolute border-4 border-zinc-300 rounded-xl overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-110 flex justify-center items-center group"
            style={FramePositions[index]}
          >
            <img src={hobby.thumbnail} alt="hobby" className="w-full h-full object-cover" />
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
              <h1 className="relative text-2xl font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                {hobby.headline}
              </h1>
            </div>
          </motion.div>
        ))}
        {selectedHobby && (
            <motion.div>
                
            </motion.div>
            )}
      </div>
    );
  }

