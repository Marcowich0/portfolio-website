import React from "react";
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const FramePositions = [
    {
        top: "60%",
        left: "0%",
        width: "30%",
        height: "40%"
    },
    {
        top: "66%",
        left: "80%",
        width: "18%",
        height: "26%"
    },
    {
        top: "64%",
        left: "28%",
        width: "26%",
        height: "28%"
    },
    {
        top: "10%",
        left: "72%",
        width: "28%",
        height: "60%"
    },
    {
        top: "60%",
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
            "discgolf.jpg",
    },
    {
        id: 1,
        headline: "3D-Printing",
        content: "I have been 3D printing for over 5 years now, making everything from small trinkets to large scale projects. I currently own a Bambu lab P1S, and primarily design my own models in SolidWorks.",
        className: "md:col-span-2",
        thumbnail:
            "3dprint.webp",
    },
    {
        id: 3,
        headline: "Board games",
        content: "As electronics are becomming more and more prevalent in our lives, I find that it is nice from time to tome to sit down with friends and play a board game. I only have a small collection of games, but am looking to add more.",
        className: "col-span-2",
        thumbnail:
            "explodingkittens.jpg",
    },
    {
        id: 2,
        headline: "Video games",
        content: "I have played vairous video games for over 18 years now, and have played all genres across all platforms. I dont have as much time for games as i used to, but play a little FPS when on my PC when i can.",
        className: "col-span-2",
        thumbnail:
            "witcher.jpg",
    },
    {
        id: 5,
        headline: "Music",
        content: "I first picked up the guitar in the last years of primary school, and have been playing ever since. I have since then also picked up piano and ukulele, and though i am not super skilled, I enjoy playing and singing for myself.",
        className: "md:col-span-3",
        thumbnail:
            "guitar.jpeg",
    },
    {
        id: 6,
        headline: "Food",
        content: "Unfortunatly for my health, I have been a foodie all my life. I find great joy in a good meal, and like to put in the effort when i have the time. I am by no means a michelin chef, but I like to think that I can make a decent meal.",
        className: "col-span-2",
        thumbnail:
            "tacos.jpg",
    },
    {
        id: 7,
        headline: "Exercise",
        content: "Being honest, i am not a huge fan of exercise, but find it important for my health to be in a reasonable shape. I usually go to the gym at least once a week, complimented by daily walks or runs.",
        className: "col-span-2",
        thumbnail:
            "deadlift.jpg",
    },
    {
        id: 8,
        headline: "Chess",
        content: "I am have always enjoyed fantasy as a genre in both games, books and movies. I do, however, think that the absolute best way to emerge yourself in these magical worlds is through a good book. Some of my favorites are the Mistborn and Stormlight Archive series by Brandon Sanderson.",
        className: "md:col-span-2",
        thumbnail:
            "chess.jpg",
    },
    {
        id: 9,
        headline: "Poker",
        content: "I am have always enjoyed fantasy as a genre in both games, books and movies. I do, however, think that the absolute best way to emerge yourself in these magical worlds is through a good book. Some of my favorites are the Mistborn and Stormlight Archive series by Brandon Sanderson.",
        className: "md:col-span-2",
        thumbnail:
            "casino.webp",
    },
    {
        id: 10,
        headline: "Reading",
        content: "I am have always enjoyed fantasy as a genre in both games, books and movies. I do, however, think that the absolute best way to emerge yourself in these magical worlds is through a good book. Some of my favorites are the Mistborn and Stormlight Archive series by Brandon Sanderson.",
        className: "md:col-span-2",
        thumbnail:
            "dragon.jpg",
    }
];


export default function HobbyFrames() {
    const [selectedHobby, setSelectedHobby] = React.useState<{
        id: number;
        headline: string;
        content: string;
        className: string;
        thumbnail: string;
    } | null>(null);
    const [selectedHobbyPosition, setSelectedHobbyPosition] = React.useState<{ x: number; y: number, width: number, height: number } | null>(null);

    return (
        <div className="w-full h-full relative">
            <AnimatePresence>
                {hobbyInformation.map((hobby, index) => (
                    <motion.div
                        key={index}
                        className="absolute border-4 border-zinc-300 rounded-xl overflow-hidden cursor-pointer transform transition-transform duration-300  flex justify-center items-center group"
                        style={FramePositions[index]}
                        onClick={() => {
                            setSelectedHobby(hobby)
                            setSelectedHobbyPosition({
                                x: parseFloat(FramePositions[index].left),
                                y: parseFloat(FramePositions[index].top),
                                width: parseFloat(FramePositions[index].width),
                                height: parseFloat(FramePositions[index].height)
                            })
                        }}
                    >
                        <Image src={`/hobbies/${hobby.thumbnail}`} alt="hobby" fill style={{ objectFit: "cover" }} />
                        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                            <h1 className="relative text-2xl font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                {hobby.headline}
                            </h1>
                        </div>
                        <AnimatePresence>
                            {selectedHobby && (
                                <motion.div
                                    className="w-full h-full bg-black absolute"
                                    initial={{ opacity: "0%" }}
                                    animate={{ opacity: "35%" }}
                                    exit={{ opacity: "0%" }}
                                    transition={{ duration: 0.5 }}>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </motion.div>
                ))}

                {selectedHobby && selectedHobbyPosition && (
                    <div>
                        <motion.div
                            className="rounded-2xl overflow-hidden border-4 border-zinc-300 z-[70] absolute"
                            initial={{
                                top: `${selectedHobbyPosition.y}%`,
                                left: `${selectedHobbyPosition.x}%`,
                                width: `${selectedHobbyPosition.width}%`,
                                height: `${selectedHobbyPosition.height}%`
                            }}
                            animate={{
                                top: "50%",
                                left: "50%",
                                width: window.innerWidth > 2400 ? "850px" : "600px",
                                height: window.innerHeight > 1300 ? "450px" : "300px",
                                transform: "translate(-50%, -50%)",
                            }}
                            exit={{
                                top: `${selectedHobbyPosition.y}%`,
                                left: `${selectedHobbyPosition.x}%`,
                                width: `${selectedHobbyPosition.width}%`,
                                height: `${selectedHobbyPosition.height}%`,
                                transform: "translate(0, 0)",
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            <Image src={`/hobbies/${selectedHobby.thumbnail}`} alt="hobby" fill style={{ objectFit: "cover"}} />
                            <motion.div
                                className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-70 text-white w-full"
                                initial={{ opacity:0, transform: "translateY(100%)" }}
                                animate={{ opacity:1, transform: "translateY(0)" }}
                                exit={{ opacity:0, transform: "translateY(100%)" }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="text-2xl font-bold">{selectedHobby.headline}</h2>
                                <p className="mt-2">{selectedHobby.content}</p>
                            </motion.div>
                        </motion.div>
                        <div
                            className="absolute w-screen h-screen bg-black opacity-0 z-[80]"
                            onClick={() => setSelectedHobby(null)}
                            style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                        />
                    </div>
                )}
            </AnimatePresence>
        </div >
    );
}

